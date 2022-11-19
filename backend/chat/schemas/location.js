const mongoose = require('mongoose');

const { Schema } = mongoose;
const locationSchema = new Schema({
	roomId: {
		type: String
	},
	ownerIdx: {
		// 견주 아이디
		type: Number,
		required: true,
	},
	gps: [
		{
			latitude: {
				// 위도
				type: Number,
				required: true,
			},
			longitude: {
				// 경도
				type: Number,
				required: true,
			},
			time: {
				// 시간
				type: Date,
				default: Date.now,
			}
		}
	]
});

module.exports = mongoose.model('Location', locationSchema);
