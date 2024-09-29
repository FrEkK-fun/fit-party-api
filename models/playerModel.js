const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			required: false,
		},
		team: {
			type: Object,
			required: true,
		},
		properties: {
			type: Object,
			required: true,
		},
		weekly: {
			type: Object,
			required: true,
		},
		sessions: {
			type: Array,
			default: [],
		},
		userId: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

playerSchema.pre("save", function (next) {
	this.sessions = this.sessions.filter(
		(session) => Object.keys(session).length !== 0
	);
	next();
});

module.exports = mongoose.model("Player", playerSchema);
