const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const armorsSchema = new mongoose.Schema({
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
	baseDefense: {
		type: Number,
	},
});

module.exports = mongoose.model("Armor", armorsSchema);
