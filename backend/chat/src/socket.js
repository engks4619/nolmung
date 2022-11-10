const SocketIO = require('socket.io');

const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

module.exports = (server, app) => {
	const io = SocketIO(server, { path: '/socket.io' }); // Socket.IO 서버랑 Express 서버 연결
	console.log('socket.io 요청을 받아들일 준비가 되었습니다.');

	// app.set('io', io);
	const room = io.of('/room');
	const chat = io.of('/chat');

	var login_ids = {}; // 로그인 id 매핑 (로그인 ID -> 소켓 ID)

	io.on('connection', (socket) => {
		// 웹소켓 연결 성공 시
		// socket 변수에는 실행 시점에 연결한 상대와 연결된 소켓의 객체가 들어있다.
		const req = socket.request; // 소켓 안에 요청에 대한 정보를 꺼냄.
		const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // 요청에서 ip찾기
		console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);

		// 'login' 이벤트를 받았을 때의 처리
		socket.on('login', function (login) {
			// 기존 클라이언트 ID가 없으면 클라이언트 ID를 맵에 추가
			console.log('접속한 소켓의 ID : ' + socket.id);
			login_ids[login.id] = socket.id;
			socket.login_id = login.id;

			console.log(
				'접속한 클라이언트 ID 갯수 : %d',
				Object.keys(login_ids).length
			);

			// 응답 메시지 전송
			// sendResponse(socket, 'login', '200', '로그인되었습니다.');
		});

		socket.on('disconnect', () => {
			// 연결 종료 시
			console.log('클라이언트 접속 해제', ip, socket.id);
			clearInterval(socket.interval);
		});

		socket.on('error', (error) => {
			// 에러 시
			console.error(error);
		});

		socket.on('reply', (msg) => {
			// 클라이언트로부터 메시지
			console.log(msg);
			io.to(socket.id).emit('message', msg);
		});

		socket.on('chatting', (data) => {
			io.emit('chatting', data); // 서버에서 클라에게 되돌려주기, 즉 보내주는 내용이 되겠음.
		}); //받아줄 서버 준비

		socket.on('gps', (gps) => {
			// gps 정보
			console.log(gps);
			io.to(socket.id).emit('message', msg);
		});
	});

	room.on('connection', (socket) => {
		console.log('room 네임스페이스에 접속');

		const req = socket.request;

		socket.on('newRoom', async (data) => {
			console.log('newRoom 이벤트 발생');

			try {
				const newRoom = await Room.create({
					ownerIdx: data.ownerIdx,
					postIdx: data.postIdx,
				});
				console.log('DB 저장 완료');
				console.log('newRoom 아이디 : ' + newRoom._id);
				socket.emit('newRoomId', newRoom._id);
				console.log('채팅방 생성되었습니다.');
				// sendResponse(socket, 'newRoom', '200', '채팅방 생성되었습니다.');
			} catch (error) {
				console.error(error);
				//next(error);
			}
		});

		socket.on('disconnect', () => {
			console.log('room 네임스페이스 접속 해제');
		});
	});

	chat.on('connection', (socket) => {
		console.log('chat 네임스페이스에 접속');
		const req = socket.request;

		socket.on('join', (data) => {
			socket.join(data);

			console.log(data + ' 채팅방에 입장했습니다.');
		});

		socket.on('messageS', (data) => {
			// 클라이언트로부터 메시지 수신

			console.log('roomId: ' + data.roomId);
			console.log(data.message);
			console.log('클라이언트로부터 message 이벤트를 받았습니다.');

			chat.to(data.roomId).emit('messageC', data);
		});
	});
};
