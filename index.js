const { Client } = require('discord.js');

// Create a new Discord client
const client = new Client();

// Set the bot's status to invisible
client.once('ready', () => {
client.user.setPresence({ status: 'invisible' });
console.log('Bot is ready!');
});
client.login(process.env.token);
