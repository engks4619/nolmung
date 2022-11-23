const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const chatSchema = new Schema({
	roomId: {
		type: String,
		required: true,
		ref: 'Room',
	},
	sender: {
		type: Number,
		required: true,
	},
	chat: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Chat', chatSchema);
