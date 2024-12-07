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
			isTeamLeader: {
				type: Boolean,
				default: false,
			},
			teamIdMongo: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Team",
			},
		},
		properties: {
			type: Object,
			required: true,
		},
		weekly: {
			xp: { type: Number, default: 0 },
			level: { type: Number, default: 1 },
			goal: {
				description: { type: String },
				done: { type: Boolean, default: false },
			},
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
