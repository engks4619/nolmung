const express = require('express');
const http = require('http');
const cors = require('cors');
const SocketIO = require('socket.io');

// const indexRouter = require('../routes');
const connect = require('../schemas');
const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

const app = express();
const httpServer = http.createServer(app); // express http 서버 생성
const io = SocketIO(httpServer, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

app.use(cors()); // cors를 미들웨어로 사용하도록 등록
// app.use(indexRouter);
const PORT = process.env.PORT || 5000;

connect();

const room = io.of('/room');
const chat = io.of('/chat');

// 소켓 연결 및 이벤트
io.on('connection', (socket) => {
	console.log('소켓 연결 완료! socket 아이디 : ', socket.id);

	socket.on('welcome', (msg) => {
		console.log(msg);
		socket.emit('reply', '서버에서 응답');
	});

	socket.on('disconnect', () => {
		// 연결 종료 시
		console.log('클라이언트 접속 해제', socket.id);
		clearInterval(socket.interval);
	});
});

room.on('connection', (socket) => {
    console.log('room 네임스페이스에 접속');

    const req = socket.request;

	// 채팅방 생성 후 join
    socket.on('newRoom', async(data) => {
      console.log('newRoom 이벤트 발생');

      try {
        const newRoom = await Room.create({
          ownerIdx: data.ownerIdx,
          postIdx: data.postIdx,
        });

        console.log("DB 저장 완료");
		console.log('채팅방 생성되었습니다.');
        console.log("newRoom 아이디 : " + newRoom._id);  

		socket.join(newRoom._id);

        socket.emit('newRoomId', newRoom._id);  
        
      } catch (error) {
        console.error(error);
      }
    })

	socket.on('disconnect', () => {
		console.log('room 네임스페이스 접속 해제');
	});
});

httpServer.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
