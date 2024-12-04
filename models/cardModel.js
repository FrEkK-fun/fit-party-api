const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Card", cardSchema);
