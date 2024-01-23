// Import the discord.js library with intents
const { Client, Intents } = require('discord.js');

// Create a new Discord client with intents
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Set the bot's status to invisible
client.once('ready', () => {
  client.user.setPresence({ status: 'invisible' });
  console.log('Bot is ready!');
});

// Login to Discord with your bot token
client.login(process.env.token);
