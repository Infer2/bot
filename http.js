const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const app = express();
const PORT = 8080;

// Express route for handling HTTP requests
app.get('/api', (req, res) => {
  res.json({ status: 'success', message: 'Hello from the HTTP server!' });
});

// Route for the root of the server
app.get('/', (req, res) => {
  res.send('Hello from the root!');
});

// Discord.js event: bot is ready
client.once('ready', () => {
  console.log('Bot is ready!');
  
  // Set the bot's presence to an empty status
  client.user.setPresence({ activities: [] });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`HTTP server is running on port ${PORT}`);
});

// Login to Discord
client.login(process.env.token);
