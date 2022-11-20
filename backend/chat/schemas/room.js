const mongoose = require('mongoose');

const { Schema } = mongoose;
const roomSchema = new Schema({
	ownerIdx: {
		// 채팅건 사람 ID
		type: Number,
		required: true,
	},
	opponentIdx: {
		// 채팅 상대방 ID (게시글작성자)
		type: Number,
		required: true,
	},
	postIdx: {
		// 게시글 번호
		type: Number,
		required: true,
	},
	createdAt: {
		// 생성 시간
		type: Date,
		default: Date.now,
	},
	complete: {
		// 산책 확정 여부
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Room', roomSchema);
