const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			required: false,
		},
		teamPower: {
			type: Number,
			required: true,
		},
		inventory: {
			type: Object,
			required: true,
		},
		character: {
			type: Object,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
