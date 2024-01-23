const {
	Client: Client
} = require("discord.js"), client = new Client;
client.once("ready", (() => {
	client.user.setStatus("invisible"), console.log("Bot is ready!")
})), client.login(process.env.token);
