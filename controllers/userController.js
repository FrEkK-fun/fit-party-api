const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Login user
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.login(email, password);

		// Create token
		const token = createToken(user._id);
		const players = user.players;
		const isAdmin = user.isAdmin;
		const userId = user._id;

		res.status(201).json({ email, token, players, isAdmin, userId });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Signup user
const signupUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.signup(email, password);

		// Create token
		const token = createToken(user._id);

		res.status(201).json({ email, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Update user players array
const updateUserPlayers = async (req, res) => {
	const { playerId, token } = req.body;

	// Decode the token to get the user id
	const decodedToken = jwt.decode(token);
	const userId = decodedToken._id;

	try {
		// Use playerId to create an array of player IDs
		const players = [playerId];

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ $push: { players: { $each: players } } },
			{ new: true }
		);

		res.status(200).json(updatedUser);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

module.exports = { signupUser, loginUser, updateUserPlayers };
