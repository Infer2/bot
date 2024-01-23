const express = require("express"),
	{
		Client: Client,
		GatewayIntentBits: GatewayIntentBits
	} = require("discord.js"),
	app = express(),
	client = new Client({
		intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
	});
client.on("ready", (async () => {
	console.log("ready")
})), app.get("/ping", ((e, t) => {
	t.send(new Date)
}));
const PORT = process.env.PORT || 8080;
app.listen(PORT, (() => {
	console.log(`Listening to ${PORT}`)
})), client.login(process.env.token);
