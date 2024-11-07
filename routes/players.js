const express = require("express");
const {
	createPlayer,
	getPlayers,
	getPlayer,
	updatePlayer,
	updatePlayerGoal,
	updatePlayerClass,
	deletePlayer,
} = require("../controllers/playerController");

const router = express.Router();

// GET all players
router.get("/", getPlayers);

// GET player by ID
router.get("/:id", getPlayer);

// POST Create player
router.post("/", createPlayer);

// PATCH Update player by ID
router.patch("/:id", updatePlayer);

// PATCH Update player goal by ID
router.patch("/:id/goal", updatePlayerGoal);

// PATCH Update player class by ID
router.patch("/:id/class", updatePlayerClass);

// DELETE player by ID
router.delete("/:id", deletePlayer);

module.exports = router;
