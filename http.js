const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

const client = new Discord.Client();
const app = express();
const PORT = 8080;

// Discord.js event: bot is ready
client.once('ready', () => {
  console.log('Bot is ready!');
});

// Express route for handling HTTP requests
app.get('/api', (req, res) => {
  res.json({ status: 'success', message: 'Hello from the HTTP server!' });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`HTTP server is running on port ${PORT}`);
});

// Login to Discord
client.login(process.env.token);
