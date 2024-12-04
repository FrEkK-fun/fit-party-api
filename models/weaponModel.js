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
});

module.exports = mongoose.model("Weapon", weaponSchema);