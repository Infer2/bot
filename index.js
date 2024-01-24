const express = require("express"),
	{
		Client: Client,
		Intents: Intents
	} = require("discord.js"),
	app = express(),
	client = new Client({
		intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]
	});
client.once("ready", (() => {
	console.log(`Logged in as ${client.user.tag}`)
})), app.get("/", ((e, n) => {
	n.send("I'm alive!")
})), app.get("/ping", ((e, n) => {
	n.send(new Date)
}));
const PORT = process.env.PORT || 8080;
app.listen(PORT, (() => {
	console.log(`Listening to ${PORT}`)
})), client.login(process.env.token);
