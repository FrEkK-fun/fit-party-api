const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
	intensity: {
		type: Number,
		required: true,
	},
	timestamp: {
		type: Date,
		required: true,
	},
	title: {
		type: String,
	},
	isSynced: {
		type: Boolean,
		default: false,
	},
	syncTimestamp: {
		type: Date,
		default: null,
	},
});

module.exports = mongoose.model("Session", sessionSchema);
