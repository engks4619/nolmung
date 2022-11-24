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
const {response} = require('express');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://nolmung-44638.firebaseio.com',
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
var locationLogin_ids = {};

// 소켓 연결 및 이벤트
io.on('connection', socket => {
  console.log('소켓 연결 완료! socket 아이디 : ', socket.id);

  // 'login' 이벤트를 받았을 때의 처리
  socket.on('login', async login => {
    // 기존 클라이언트 ID가 없으면 클라이언트 ID를 맵에 추가
    console.log('접속한 소켓의 ID : ' + socket.id);
    login_ids[login.id] = socket.id;
    socket.loginId = login.id;
    console.log('로그인 소켓: ', login_ids[login.id]);

    io.to(socket.id).emit('replyLogin', '로그인 성공');

    try {
      // 채팅 목록 조회
      console.log('채팅 목록 조회 시작');
      const rooms = await Room.find({
        $or: [{ownerIdx: login.id}, {opponentIdx: login.id}],
      }).sort('-createdAt');
      console.log('채팅 목록: ', rooms);

      const roomIds = [];
      for (var i in rooms) {
        roomIds.push({
          roomId: rooms[i]._id,
        });
      }

      io.to(socket.id).emit('rooms', roomIds);
    } catch (error) {
      console.log(error);
    }
  });

  // 채팅방 생성 후 join
  socket.on('newRoom', async data => {
    console.log('newRoom 이벤트 발생');

    try {
      const room = await Room.findOne({
        ownerIdx: data.ownerIdx,
        postIdx: data.postIdx,
      });

      if (room === null) {
        console.log('해당 방이 없습니다. ');
        const newRoom = await Room.create({
          opponentIdx: data.opponentIdx,
          ownerIdx: data.ownerIdx,
          postIdx: data.postIdx,
          thumbnailUrl: data.thumbnailUrl,
          ownerImgUrl: data.ownerImgUrl,
          opponentImgUrl: data.opponentImgUrl,
          pay: data.pay,
          subject: data.subject,
          ownerNickname: data.ownerNickname,
          opponentNickname: data.opponentNickname,
        });

        socket.join(newRoom._id);
        console.log('상대방 소켓 아이디: ', login_ids[newRoom.opponentIdx]);
        console.log(
          '내 소켓 아이디',
          socket.id,
          ' ',
          login_ids[newRoom.ownerIdx],
        );
        io.to(login_ids[newRoom.opponentIdx]).emit('joinRoom', newRoom._id); // 채팅 상대방에게 join 이벤트 요청

        console.log('room socket 아이디 : ', socket.id);

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
    // 연결 종료 시
    console.log('클라이언트 접속 해제', socket.id);
    clearInterval(socket.interval);
  });
});

chat.on('connection', socket => {
  console.log('chat 네임스페이스에 접속');

  // 채팅방 입장
  socket.on('join', async roomId => {
    socket.join(roomId);
    console.log(roomId + ' 채팅방에 입장했습니다.');

    // 산책 확정 여부 전달
    const roomInfo = await Room.findOne({_id: roomId});
    socket.emit('completed', roomInfo.complete);

    try {
      const chats = await Chat.find({roomId: roomId}).sort('-createdAt');
      const chatInfo = [];
      for (var i in chats) {
        chatInfo.push({
          chat: chats[i].chat,
          createdAt: chats[i].createdAt,
          roomId: chats[i].roomId,
          sender: chats[i].sender,
          senderNickname: chats[i].senderNickname,
        });
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
        roomId: data.roomId,
        sender: data.sender,
        chat: data.chat,
        senderNickname: data.senderNickname,
      });

      console.log('클라이언트로부터 message 이벤트를 받았습니다.');

      const room = await Room.updateOne(
        {_id: ObjectId(data.roomId)},
        {$set: {createdAt: chatInfo.createdAt}},
      );

      chat.to(data.roomId).emit('messageC', {
        chat: chatInfo.chat,
        createdAt: chatInfo.createdAt,
        roomId: chatInfo.roomId,
        sender: chatInfo.sender,
        senderNickname: chatInfo.senderNickname,
      }); // 클라이언트에 메시지 전달
    } catch (error) {
      console.error(error);
    }
  });

  // 산책 확정
  socket.on('complete', async roomId => {
    console.log('complete 이벤트');

    const room = await Room.findOneAndUpdate(
      {_id: ObjectId(roomId)},
      {$set: {complete: true}},
    );
    console.log('room의 complete : ', room.complete);
    chat.to(roomId).emit('completed', true); // 산책 확정 완료
    chat.to(roomId).emit('alarmCompleted', '산책이 확정되었습니다.');
  });
});

// 산책 시작
location.on('connection', socket => {
  console.log('location 네임스페이스에 접속');

  // 'locationLogin' 이벤트를 받았을 때의 처리
  socket.on('locationLogin', async login => {
    // 기존 클라이언트 ID가 없으면 클라이언트 ID를 맵에 추가
    console.log('location에 접속한 소켓의 ID : ' + socket.id);
    locationLogin_ids[login.id] = socket.id;
    socket.loginId = login.id;
    console.log('로그인 소켓: ', locationLogin_ids[login.id]);

    socket.join(login.roomId);

    io.of('/location')
      .to(socket.id)
      .emit('replyLocationLogin', 'location 로그인 성공');
  });

  socket.on('startWalk', async data => {
    // 산책 시작
    console.log('startWalk 이벤트');
    try {
      const gps = await Location.findOne({roomId: data.roomId});
      console.log("gps: ", gps);
      if (gps === null) {
        const gpsInfo = await Location.create({
          roomId: data.roomId,
          ownerIdx: data.ownerIdx,
          walking: true,
        });
        console.log("gpsInfo: ", gpsInfo);
        console.log('산책이 시작되었습니다.');

        console.log("replyStartWalk 이벤트 보내기");
        location.to(roomId).emit('replyStartWalk', '산책이 시작되었습니다.');
        console.log("replyStartWalk 이벤트 보내기 완료");
      } else {

        console.log("이미 산책이 시작되었습니다.");
        location.to(roomId).emit('replyStartWalk', '이미 산책이 시작되었습니다.');
      }
        
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('gps', async data => {
    // 위치 저장 이벤트
    console.log('gps 이벤트');
    try {
      const gpsData = await Location.findOne({
        roomId: data.roomId,
      });
      console.log('gps: ', gpsData);
      if (gpsData === null) {
        socket.emit('replyGps', '산책을 시작하세요.');
      } else {
        // gps 위치 추가
        const updatedGps = await Location.updateMany(
          {_id: gpsData._id},
          {
            $push: {
              gps: {latitude: data.gps.latitude, longitude: data.gps.longitude},
              distance: data.distance,
            },
          },
        );
        console.log('gps 저장 완료');
        location.to(roomId).emit('replyGps', 'gps 저장 완료');

        const gpsList = [];
        for (var i in updatedGps.gps) {
          gpsList.push({
            latitude: updatedGps.gps[i].latitude,
            longitude: updatedGps.gps[i].longitude,
          });
        }

        io.of('/location')
          .to(locationLogin_ids[updatedGps.ownerIdx])
          .emit('gpsInfo', {
            roomId: updatedGps.roomId,
            ownerIdx: updatedGps.ownerIdx,
            gps: gpsList,
            distance: updatedGps.distance,
          });
      
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('endWalk', async roomId => {
    // 산책 종료 이벤트
    console.log('endWalk 이벤트');

    try {
      const gpsData = await Location.findOne({roomId: roomId});
      console.log('walking: ', gpsData.walking);

      if (gpsData === null || !gpsData.walking) {
        // 산책 시작 전이거나 이미 종료된 경우

        location.to(roomId).emit('replyEndWalk', (response.statusCode = 400));
      } else {
        const gpsInfo = await Location.updateMany(
          {roomId: roomId},
          {$set: {walking: false}},
        );
        console.log('산책 종료', gpsInfo.walking);
        location.to(roomId).emit('replyEndWalk', '산책이 종료되었습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('getGps', async roomId => {
    // 위치 보기 이벤트 (산책 종료 후)
    console.log('getGps 이벤트');
    try {
      const gpsInfo = await Location.findOne({roomId: roomId});
      console.log(socket.id);

      console.log('gpsInfo: ', gpsInfo);

      if (gpsInfo === null) {
        // 산책 기록(위치정보) 없는 경우
        location.to(roomId).emit('gpsInfo', (response.statusCode = 400));
        console.log('산책 기록 없음.');
      } else if (!gpsInfo.walking) {
        // 산책 중이 아닌 경우
        location.to(roomId).emit('gpsInfo', (response.statusCode = 403));
        console.log('산책 중 아님.');
      } else {
        console.log('gps 목록 조회');
        const gpsList = [];
        for (var i in gpsInfo.gps) {
          gpsList.push({
            latitude: gpsInfo.gps[i].latitude,
            longitude: gpsInfo.gps[i].longitude,
          });
        }

        console.log("gpsInfo: ", gpsInfo);
        console.log("gpsInfo 이벤트 보내기");
        location.to(roomId).emit('gpsInfo', {
          roomId: gpsInfo.roomId,
          ownerIdx: gpsInfo.ownerIdx,
          gps: gpsList,
        });
        console.log("gpsInfo 이벤트 보내기 완료");
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
