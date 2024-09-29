const express = require("express");
const {
	createSession,
	getSessions,
	getSession,
	updateSession,
	deleteSession,
} = require("../controllers/sessionController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// GET all sessions
router.get("/players/:playerId/sessions", getSessions);

// GET session by ID
router.get("/players/:playerId/sessions/:sessionId", getSession);

// Require authentication for all remaining session routes
router.use(requireAuth);

// POST Create session
router.route("/players/:playerId/sessions").post(createSession);

// PATCH Update session by ID
router.patch("/players/:playerId/sessions/:sessionId", updateSession);

// DELETE session by ID
router.delete("/players/:playerId/sessions/:sessionId", deleteSession);

module.exports = router;
