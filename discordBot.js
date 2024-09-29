// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const { Client, GatewayIntentBits } = require("discord.js");

// Create a new Discord client
const { DISCORD_TOKEN, DISCORD_CHANNEL_ID } = process.env;

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// Log in to Discord
client.login(DISCORD_TOKEN);
// Notify Discord when a workout session is logged
function notifyDiscord(playerName, teamName, workoutIntensity, workoutDetails) {
	const channel = client.channels.cache.get(DISCORD_CHANNEL_ID);

	if (channel) {
		channel.send(
			`🏋️‍♂️ **${playerName}** from team **${teamName.toLowerCase()}** just logged a **${workoutIntensity.toLowerCase()}** ${
				workoutDetails ? workoutDetails.toLowerCase() : "workout"
			}!`
		);
	}
}

module.exports = { notifyDiscord };
