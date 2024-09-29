const Team = require("../models/teamModel");
const mongoose = require("mongoose");

// GET all teams
const getTeams = async (req, res) => {
	const teams = await Team.find({}).sort({ name: 1 });
	res.status(200).json(teams);
};

// GET team by ID
const getTeam = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "Invalid ID" });
	}

	const team = await Team.findById(id);
	if (!team) {
		return res.status(404).json({ error: "Could not find team" });
	}
	res.status(200).json(team);
};

// POST Create team
const createTeam = async (req, res) => {
	const {
		name,
		icon,
		teamLeader,
		properties,
		inventory,
		character,
		weekly,
		sessions,
	} = req.body;

	// add to db
	try {
		const team = await Team.create({
			name,
			icon,
			teamLeader,
			properties,
			inventory,
			character,
			weekly,
			sessions,
		});
		res.status(200).json(team);
	} catch (error) {
		console.error("Error inserting team:", error);
		res.status(400).json({ error: "Could not insert team (" + error + ")" });
	}
};

// PATCH Update team by ID
const updateTeam = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "Invalid ID" });
	}

	const team = await Team.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		}
	);

	if (!team) {
		return res.status(404).json({ error: "Could not find team" });
	}

	res.status(200).json(team);
};

// DELETE team by ID
const deleteTeam = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "Invalid ID" });
	}

	const team = await Team.findOneAndDelete({ _id: id });
	if (!team) {
		return res.status(404).json({ error: "Could not find team" });
	}

	res.status(200).json(team);
};

module.exports = {
	getTeams,
	getTeam,
	createTeam,
	updateTeam,
	deleteTeam,
};
