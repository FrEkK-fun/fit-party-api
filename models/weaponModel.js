const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weaponSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	icon: {
		type: String,
	},
	title: {
		type: String,
	},
	cost: {
		type: Number,
	},
	baseAttack: {
		type: Number,
	},
});

module.exports = mongoose.model("Weapon", weaponSchema);
