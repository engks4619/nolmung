const express = require('express');
const http = require('http');
const cors = require('cors');
const SocketIO = require('socket.io');
// const WebSocket = require('ws');

const indexRouter = require('../routes');
const connect = require('../schemas');

const app = express();
const httpServer = http.createServer(app); // express http 서버 생성
const io = SocketIO(httpServer, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});
// const wss = new WebSocket.Server({ server });

app.use(cors()); // cors를 미들웨어로 사용하도록 등록
app.use(indexRouter);
const PORT = process.env.PORT || 5000;

connect();

// wss.on('connection', (ws, req) => { // 웹소켓 연결 시
// 	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
// 	console.log('새로운 클라이언트 접속', ip);

// 	ws.on('welcome', (msg) => {
// 		console.log(msg);
// 		ws.emit('reply', '서버에서 응답');
// 	});

// 	ws.on('message', (message) => { // 클라이언트로부터 메시지
// 		console.log(message.toString());
// 	});
// 	ws.on('error', (error) => { // 에러 시
// 		console.error(error);
// 	});
// 	ws.on('close', () => { // 연결 종료 시
// 		console.log('클라이언트 접속 해제', ip);
// 		clearInterval(ws.interval);
// 	});

// });

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

httpServer.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});

// webSocket(server, app);
