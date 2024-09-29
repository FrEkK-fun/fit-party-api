const express = require("express");
const {
	createTeam,
	getTeams,
	getTeam,
	updateTeam,
	deleteTeam,
} = require("../controllers/teamController");

const router = express.Router();

// GET all teams
router.get("/", getTeams);

// GET team by ID
router.get("/:id", getTeam);

// POST Create team
router.post("/", createTeam);

// PATCH Update team by ID
router.patch("/:id", updateTeam);

// DELETE team by ID
router.delete("/:id", deleteTeam);

module.exports = router;
