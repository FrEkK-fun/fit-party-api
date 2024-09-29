const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	players: [],
	isAdmin: {
		type: Boolean,
		default: false,
	},
});

// Static signup method
userSchema.statics.signup = async function (email, password) {
	// Validation
	if (!email || !password) {
		throw new Error("Email and password required");
	}
	if (!validator.isEmail(email)) {
		throw new Error("Email not valid");
	}
	if (!validator.isStrongPassword(password)) {
		throw new Error(
			"Password not strong enough\n(Needs 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 symbol)"
		);
	}

	// Check if user already exists
	const exists = await this.findOne({ email });

	if (exists) {
		throw new Error("Email already registered");
	}

	// Generate salt
	const salt = await bcrypt.genSalt(10);

	// Hash password
	const hash = await bcrypt.hash(password, salt);

	// Create new user
	const user = await this.create({ email, password: hash });

	return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {
	// Validation
	if (!email || !password) {
		throw new Error("Email and password required");
	}

	// Check if user exists
	const user = await this.findOne({ email });

	if (!user) {
		throw new Error("Email not registered");
	}

	// Check if password is correct
	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error("Password incorrect");
	}

	return user;
};

module.exports = mongoose.model("User", userSchema);
