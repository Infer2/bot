const {
	Client: Client,
	GatewayIntentBits: GatewayIntentBits
} = require("discord.js"), client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});
client.once("ready", (() => {
	client.user.setStatus("invisible"), console.log("Bot is ready!")
})), client.login(process.env.token);
