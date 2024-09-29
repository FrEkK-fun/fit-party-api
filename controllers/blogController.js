const Blog = require("../models/blogModel");
const mongoose = require("mongoose");

// GET all blogs
const getBlogs = async (req, res) => {
	const blogs = await Blog.find({}).sort({ createdAt: -1 });
	res.status(200).json(blogs);
};

// POST Create blog
const createBlog = async (req, res) => {
	// add to db
	try {
		const blog = await Blog.create({
			...req.body,
		});
		res.status(200).json(blog);
	} catch (error) {
		console.error("Error inserting blog:", error);
		res.status(400).json({ error: "Could not insert blog (" + error + ")" });
	}
};

// PATCH Update blog by ID
const updateBlog = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "Invalid ID" });
	}

	const blog = await Blog.findOneAndUpdate(
		{ _id: id },
		{ ...req.body },
		{ new: true } // This tells Mongoose to return the updated document
	);

	if (!blog) {
		return res.status(404).json({ error: "Could not find blog" });
	}

	res.status(200).json(blog);
};

// DELETE blog by ID
const deleteBlog = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "Invalid ID" });
	}

	const blog = await Blog.findOneAndDelete({ _id: id });
	if (!blog) {
		return res.status(404).json({ error: "Could not find blog" });
	}

	res.status(200).json(blog);
};

module.exports = {
	getBlogs,
	createBlog,
	updateBlog,
	deleteBlog,
};
