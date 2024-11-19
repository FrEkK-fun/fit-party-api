const mongoose = require("mongoose");

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
					type: ObjectId,
				},
				weaponIdUnity: {
					type: String,
				},
				weaponName: {
					type: String,
				},
				ownerIdMongo: {
					type: ObjectId,
				},
				ownerIdUnity: {
					type: String,
				},
			},
			armor: {
				armorIdMongo: {
					type: ObjectId,
				},
				armorIdUnity: {
					type: String,
				},
				armorName: {
					type: String,
				},
				ownerIdMongo: {
					type: ObjectId,
				},
				ownerIdUnity: {
					type: String,
				},
			},
			cards: {
				cardIdMongo: {
					type: ObjectId,
				},
				cardIdUnity: {
					type: String,
				},
				cardName: {
					type: String,
				},
			},
		},
		players: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
