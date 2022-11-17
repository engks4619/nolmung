const express = require('express');
const http = require('http');
const cors = require('cors');
const SocketIO = require('socket.io');

const connect = require('../schemas');
const indexRouter = require('../routes');
const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

const eurekaHelper = require('./eureka-helper');

const app = express();
const httpServer = http.createServer(app); // express http 서버 생성
const io = SocketIO(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors()); // cors를 미들웨어로 사용하도록 등록

const PORT = process.env.PORT || 5000;

app.use('/', indexRouter);

connect();

const room = io.of('/room');
const chat = io.of('/chat');

var login_ids = {}; // 로그인 id 매핑 (로그인 ID -> 소켓 ID)
var roomId = '';

// 소켓 연결 및 이벤트
io.on('connection', socket => {
  console.log('소켓 연결 완료! socket 아이디 : ', socket.id);

  // 'login' 이벤트를 받았을 때의 처리
  socket.on('login', function (login) {
    // 기존 클라이언트 ID가 없으면 클라이언트 ID를 맵에 추가
    console.log('접속한 소켓의 ID : ' + socket.id);
    login_ids[login.id] = socket.id;
    socket.login_id = login.id;

    console.log(
      '접속한 클라이언트 ID 갯수 : %d',
      Object.keys(login_ids).length,
    );
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
          postIdx: data.postIdx,
        });

        roomId = newRoom._id;

        socket.join(newRoom._id);
        room.to(login_ids[newRoom.opponentIdx]).emit('join', newRoom._id); // 채팅 상대방에게 join 이벤트 요청

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

    try {
      const chats = await Chat.find({room: roomId}).sort('createdAt');
      socket.emit('chats', chats); // 클라이언트에 채팅내역 전달
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

      console.log(data.chat);
      console.log('클라이언트로부터 message 이벤트를 받았습니다.');

      chat.to(data.roomId).emit('messageC', data); // 클라이언트에 메시지 전달
    } catch (error) {
      console.error(error);
    }
  });

  // 산책 확정
  socket.on('decide', roomId => {
    console.log('산책 확정');
    chat.to(roomId).emit('decided', '산책이 확정되었습니다.');

    // 커뮤니티 서버에 산책 확정 보내기
  });
});

httpServer.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});

eurekaHelper.registerWithEureka('chat', PORT);
