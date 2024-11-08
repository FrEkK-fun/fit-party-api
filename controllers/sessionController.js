const { notifyDiscord } = require("../discordBot");
const Player = require("../models/playerModel");
const mongoose = require("mongoose");
const { calcXpViewValue } = require("../utils/xpCalculator");

// POST Create session
const createSession = async (req, res) => {
	const { playerId } = req.params;
	const { intensity, title, timestamp } = req.body;

	try {
		const player = await Player.findById(playerId);
		if (!player) {
			return res.status(404).json({ error: "Could not find player" });
		}

		const sessionTimestamp = new Date(timestamp);

		// Create a new session object with MongoDB-generated _id and timestamp
		const newSession = {
			_id: new mongoose.Types.ObjectId(),
			intensity: intensity,
			title: title,
			isSynced: false,
			syncTimestamp: null,
			timestamp: sessionTimestamp,
		};

		// Add the session to the player's sessions array
		player.sessions.push(newSession);

		// Update the player's weekly XP
		player.weekly.xp = calcXpViewValue(player.sessions);

		// Save the updated player document
		await player.save();

		// Notify Discord about the new session
		// notifyDiscord(player.name, player.team.teamName, intensity, title);

		// Send the newly created session data in the response
		res.status(201).json(newSession);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// GET all sessions for a player
const getSessions = async (req, res) => {
	const { playerId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(playerId)) {
		return res.status(404).json({ error: "Invalid ID" });
	}

	const player = await Player.findById(playerId);
	if (!player) {
		return res.status(404).json({ error: "Could not find player" });
	}
	res.status(200).json(player.sessions);
};

// GET session by ID
const getSession = async (req, res) => {
	const { playerId, sessionId } = req.params;

	try {
		const player = await Player.findById(playerId);
		if (!player) {
			return res.status(404).json({ error: "Could not find player" });
		}

		const session = player.sessions.find(
			(session) => session._id.toString() === sessionId
		);
		if (!session) {
			return res.status(404).json({ error: "Could not find session" });
		}

		res.status(200).json(session);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// PATCH Update session by ID
const updateSession = async (req, res) => {
	const { playerId, sessionId } = req.params;
	const { intensity } = req.body;

	try {
		const filter = {
			_id: playerId,
			"sessions._id": sessionId,
		};

		const sessionTimestamp = new Date(timestamp);

		const update = {
			$set: {
				"sessions.$.intensity": intensity,
				"sessions.$.timestamp": sessionTimestamp,
			},
		};
		const result = await Player.updateOne(filter, update);

		if (result.nModified === 0) {
			return res.status(404).json({ error: "Player or session not found" });
		}

		res.status(200).json({
			message: "Session updated successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// DELETE session by ID
const deleteSession = async (req, res) => {
	const { playerId, sessionId } = req.params;

	if (
		!mongoose.Types.ObjectId.isValid(playerId) ||
		!mongoose.Types.ObjectId.isValid(sessionId)
	) {
		return res.status(404).json({ error: "Invalid ID" });
	}

	try {
		const player = await Player.findById(playerId);
		if (!player) {
			return res.status(404).json({ error: "Could not find player" });
		}

		const sessionIndex = player.sessions.findIndex(
			(session) => session._id.toString() === sessionId
		);

		if (sessionIndex === -1) {
			return res.status(404).json({ error: "Could not find session" });
		}

		// Save the deleted session data before removing it from the array
		const deletedSession = player.sessions[sessionIndex];

		// Remove the session from the array
		player.sessions.splice(sessionIndex, 1);

		// Save the updated player
		await player.save();

		res.status(200).json(deletedSession);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	getSessions,
	getSession,
	createSession,
	updateSession,
	deleteSession,
};
