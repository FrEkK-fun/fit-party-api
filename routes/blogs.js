const express = require("express");
const {
	createBlog,
	getBlogs,
	updateBlog,
	deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

// GET all blogs
router.get("/", getBlogs);

// POST Create player
router.post("/", createBlog);

// PATCH Update player by ID
router.patch("/:id", updateBlog);

// DELETE player by ID
router.delete("/:id", deleteBlog);

module.exports = router;
