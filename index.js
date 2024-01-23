// Import the discord.js library
const { Client, GatewayIntentBits } = require('discord.js');

// Create a new Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Set the bot's status to invisible
client.once('ready', () => {
  client.user.setPresence({ status: 'invisible' });
  console.log('Bot is ready!');
});

// Login to Discord with your bot token
client.login(process.env.token);
