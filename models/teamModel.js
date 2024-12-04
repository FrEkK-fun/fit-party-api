const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
		},
		teamName: {
			type: String,
			required: true,
		},
		teamIdUnity: {
			type: String,
		},
		icon: {
			type: String,
			required: false,
		},
		inventory: {
			stars: {
				type: { type: Number, default: 0 },
			},
			gold: {
				type: { type: Number, default: 0 },
			},
			minerals: {
				type: { type: Number, default: 0 },
			},
			wood: {
				type: { type: Number, default: 0 },
			},
			weapons: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Weapon",
				},
			],
			armor: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Armor",
				},
			],
			cards: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Card",
				},
			],
		},
		players: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Player",
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
