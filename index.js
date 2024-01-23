const express = require('express');
const { Client, Intents } = require('discord.js');
const app = express();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});
app.get('/ping', (req, res) => {
  res.send(new Date);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

client.login(process.env.token);
