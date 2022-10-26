const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.set('port', process.env.PORT || 5000);

io.on('connection', (socket) => {
	console.log(`user connected ${socket.id}`);
});

app.listen(app.get('port'), () => {
	console.log(`server is running on port ${app.get('port')}`);
});
