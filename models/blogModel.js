const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		videoLink: {
			type: String,
			required: false,
		},
		body: {
			type: String,
			required: true,
		},
		gameId: {
			type: String,
			required: false,
		},
		author: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
