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
			weapons: {
				weaponIdMongo: {
					type: Schema.Types.ObjectId,
				},
				weaponIdUnity: {
					type: String,
				},
				weaponName: {
					type: String,
				},
				ownerIdMongo: {
					type: Schema.Types.ObjectId,
				},
				ownerIdUnity: {
					type: String,
				},
			},
			armor: {
				armorIdMongo: {
					type: Schema.Types.ObjectId,
				},
				armorIdUnity: {
					type: String,
				},
				armorName: {
					type: String,
				},
				ownerIdMongo: {
					type: Schema.Types.ObjectId,
				},
				ownerIdUnity: {
					type: String,
				},
			},
			cards: {
				cardIdMongo: {
					type: Schema.Types.ObjectId,
				},
				cardIdUnity: {
					type: String,
				},
				cardName: {
					type: String,
				},
			},
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
