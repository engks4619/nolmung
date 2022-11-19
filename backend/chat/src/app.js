const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const SocketIO = require('socket.io');
var ObjectId = require('mongodb').ObjectId;

dotenv.config();
const connect = require('../schemas');
const indexRouter = require('../routes');
const Room = require('../schemas/room');
const Chat = require('../schemas/chat');
const Location = require('../schemas/location');

const eurekaHelper = require('./eureka-helper');
const { response } = require("express");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://nolmung-44638.firebaseio.com",
});

const app = express();
const httpServer = http.createServer(app); // express http 서버 생성
const io = SocketIO(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors()); // cors를 미들웨어로 사용하도록 등록

const PORT = process.env.PORT;

app.use('/', indexRouter);

connect();

const room = io.of('/room');
const chat = io.of('/chat');
const location = io.of('/location');

var login_ids = {}; // 로그인 id 매핑 (로그인 ID -> 소켓 ID)
var roomLogin_ids = {};

// 소켓 연결 및 이벤트
io.on('connection', socket => {
  console.log('소켓 연결 완료! socket 아이디 : ', socket.id);

  // 'login' 이벤트를 받았을 때의 처리
  socket.on('login', async login => {
    // 기존 클라이언트 ID가 없으면 클라이언트 ID를 맵에 추가
    console.log('접속한 소켓의 ID : ' + socket.id);
    login_ids[login.id] = socket.id;
    socket.login_id = login.id;

    try {
      // 채팅 목록 조회
      const rooms = await Room.find({
        $or: [{ownerIdx: socket.login_id}, {opponentIdx: socket.login_id}],
      }).sort('-createdAt');

      const roomInfo = []
      for (var i in rooms) {
        roomInfo.push({ roomId: rooms[i]._id, ownerIdx: rooms[i].ownerIdx, opponentIdx: rooms[i].opponentIdx, postIdx: rooms[i].postIdx, createdAt: rooms[i].createdAt });
      }

      io.to(socket.id).emit('rooms', roomInfo);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('disconnect', () => {
    // 연결 종료 시
    console.log('클라이언트 접속 해제', socket.id);
    clearInterval(socket.interval);
  });
});

room.on('connection', socket => {
  console.log('room 네임스페이스에 접속');

  const req = socket.request;

  socket.on('roomLogin', async loginId => {
    console.log('접속한 소켓의 ID : ' + socket.id);
    roomLogin_ids[loginId] = socket.id;
    socket.roomLogin_id = loginId;
  });
  
  // 채팅방 생성 후 join
  socket.on('newRoom', async data => {
    console.log('newRoom 이벤트 발생');

    try {
      const room = await Room.findOne({
        ownerIdx: data.ownerIdx,
        postIdx: data.postIdx,
      });

      if (room == null) {
        console.log('해당 방이 없습니다. ');
        const newRoom = await Room.create({
          opponentIdx: data.opponentIdx,
          ownerIdx: data.ownerIdx,
          postIdx: data.postIdx
        });

        socket.join(newRoom._id);
        console.log("상대방 소켓 아이디: ", roomLogin_ids[newRoom.opponentIdx]);  
        room.to(roomLogin_ids[newRoom.opponentIdx]).emit('join', newRoom._id); // 채팅 상대방에게 join 이벤트 요청

        socket.emit('newRoomId', newRoom._id);
      } else {
        console.log('해당 채팅방이 이미 존재합니다. roomId: ', room._id);
        socket.emit('newRoomId', room._id);
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('disconnect', () => {
    console.log('room 네임스페이스 접속 해제');
  });
});

chat.on('connection', socket => {
  console.log('chat 네임스페이스에 접속');

  // 채팅방 입장
  socket.on('join', async roomId => {
    socket.join(roomId);
    console.log(roomId + ' 채팅방에 입장했습니다.');

    // 산책 확정 여부 전달
    const room = await Chat.find({ room: roomId });
    if (room.complete) {
      socket.emit('completed', '산책 확정');
    } else {
      socket.emit('completed', '산책 미확정');
    }

    try {
      const chats = await Chat.find({ room: roomId }).sort('-createdAt');
      const chatInfo = []
      for (var i in chats) {
        chatInfo.push({ chat: chats[i].chat, createdAt: chats[i].createdAt, roomId: chats[i].room, sender: chats[i].user });
      }

      socket.emit('chats', chatInfo); // 클라이언트에 채팅내역 전달
    } catch (error) {
      console.log(error);
    }
  });

  // 채팅 DB 저장 후 방에 뿌려줌.
  socket.on('messageS', async data => {
    // 클라이언트로부터 메시지 수신

    try {
      const chatInfo = await Chat.create({
        room: data.roomId,
        user: data.sender,
        chat: data.chat,
      });

      console.log('클라이언트로부터 message 이벤트를 받았습니다.');

      const room = await Room.updateOne({ _id: ObjectId(data.roomId) }, { $set: { createdAt: chatInfo.createdAt } }); 

      chat.to(data.roomId).emit('messageC', { chat: chatInfo.chat, createdAt: chatInfo.createdAt, roomId: chatInfo.room, sender: chatInfo.user }); // 클라이언트에 메시지 전달

    } catch (error) {
      console.error(error);
    }
  });

  // 산책 확정
  socket.on('complete', async roomId => {
    console.log('산책 확정');

    const room = await Room.updateOne({ _id: ObjectId(roomId) }, { $set: { complete: true } });
    chat.to(roomId).emit('completed', '산책이 확정되었습니다.');

  });

});

// 산책 시작
location.on('connection', socket => {
  console.log('location 네임스페이스에 접속');

  socket.on('gps', async data => {    // 위치 저장 이벤트

    try {
      const gps = await Location.findOne({
        roomId: data.roomId,
      });

      if (gps == null) {
        const gpsInfo = await Location.create({
          roomId: data.roomId,
          ownerIdx: data.ownerIdx,
          gps: {
            latitude: data.gps[0].latitude,
            longitude: data.gps[0].longitude
          }
        });
        response.send('위치 저장 완료되었습니다.');
      } else {
        
        const gpsInfo = await Location.updateMany({ _id: gps._id }, { $push: { gps: { latitude: data.gps[0].latitude, longitude: data.gps[0].longitude } } })
        console.log("gps 저장 완료");
        response.send('위치 저장 완료되었습니다.');
      }

    } catch (error) {
      console.error(error);
    }
  });

  socket.on('getGps', async roomId => {   // 위치 보기 이벤트
    try {
      const gpsInfo = await Location.find({ roomId: roomId });
      console.log(socket.id)

      if (gpsInfo.length == 0) {
        socket.emit('gpsInfo', response.statusCode=403);
      } else {
        socket.emit('gpsInfo', gpsInfo);
      }
      
    } catch (error) {
      console.error(error);
    }
  });

});

httpServer.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});

eurekaHelper.registerWithEureka('chat', PORT);
