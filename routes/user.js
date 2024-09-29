const express = require("express");

// Controller functions
const {
	signupUser,
	loginUser,
	updateUserPlayers,
} = require("../controllers/userController");

const router = express.Router();

// Login route
router.post("/login", loginUser);

// Signup route
router.post("/signup", signupUser);

// Update User Players route
router.patch("/updateUserPlayers", updateUserPlayers);

module.exports = router;
