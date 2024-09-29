// Requirements
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const playersRoutes = require("./routes/players");
const teamsRoutes = require("./routes/teams");
const sessionsRoutes = require("./routes/sessions");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blogs");

// Init app & middleware
const app = express();
app.use(express.json());
app.use(cors());

// Log requests
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
});

// Connect to database
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		// Start server
		const port = process.env.PORT || 4000;
		app.listen(port, () => {
			console.log(`Connected to DB & listening on port ${port}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});

// Routes
app.get("/", (req, res) => {
	res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});

// Mount user routes
app.use("/api/user", userRoutes);

// Mount players routes
app.use("/api/players", playersRoutes);

// Mount teams routes
app.use("/api/teams", teamsRoutes);

// Mount sessions routes
app.use("/api/sessions", sessionsRoutes);

// Mount blog routes
app.use("/api/blogs", blogRoutes);

// Serve the frontend static files in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/build")));

	// Handle React routing, return all requests to React app
	app.get("*", function (req, res) {
		res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
	});
}
