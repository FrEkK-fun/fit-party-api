const mongoose = require("mongoose");
const Player = require("../models/playerModel");
const { fitBotGoalUpdate } = require("../discordBot");

// GET all players
const getPlayers = async (req, res) => {
	const players = await Player.find({}).sort({ createdAt: -1 });
	res.status(200).json(players);
};

// GET player by ID
const getPlayer = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "Invalid ID" });
	}

	const player = await Player.findById(id).populate({
		path: "team.teamIdMongo",
		model: "Team",
	});
	if (!player) {
		return res.status(404).json({ error: "Could not find player" });
	}
	res.status(200).json(player);
};

// POST Create player
const createPlayer = async (req, res) => {
	const { name, userId, icon, team, properties, character, weekly, sessions } =
		req.body;

	// add to db
	try {
		const player = await Player.create({
			name,
			userId,
			icon,
			team,
			properties,
			character,
			weekly,
			sessions,
		});
		res.status(200).json(player);
	} catch (error) {
		console.error("Error inserting player:", error);
		res.status(400).json({ error: "Could not insert player (" + error + ")" });
	}
};

// PATCH Update player by ID
const updatePlayer = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "Invalid ID" });
	}

	const player = await Player.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		}
	);

	if (!player) {
		return res.status(404).json({ error: "Could not find player" });
	}

	res.status(200).json(player);
};

// PATCH Update player's weekly goal
const updatePlayerGoal = async (req, res) => {
	const { id } = req.params;
	const { goalObj } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "Invalid ID" });
	}

	const player = await Player.findOneAndUpdate(
		{ _id: id },
		{
			"weekly.goal": goalObj,
		},
		{ new: true } // return the updated player
	);

	// Notify Discord about the goal update
	fitBotGoalUpdate(player, goalObj);

	if (!player) {
		return res.status(404).json({ error: "Could not find player" });
	}

	res.status(200).json(player);
};

// PATCH Update player's class
const updatePlayerClass = async (req, res) => {
	const { id } = req.params;
	const { classStr } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "Invalid ID" });
	}

	const player = await Player.findOneAndUpdate(
		{ _id: id },
		{
			"properties.class": classStr,
		},
		{ new: true } // return the updated player
	);

	if (!player) {
		return res.status(404).json({ error: "Could not find player" });
	}

	res.status(200).json(player);
};

// DELETE player by ID
const deletePlayer = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "Invalid ID" });
	}

	const player = await Player.findOneAndDelete({ _id: id });
	if (!player) {
		return res.status(404).json({ error: "Could not find player" });
	}

	res.status(200).json(player);
};

module.exports = {
	getPlayers,
	getPlayer,
	createPlayer,
	updatePlayer,
	updatePlayerGoal,
	updatePlayerClass,
	deletePlayer,
};
