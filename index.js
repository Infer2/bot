const express = require("express"),
	{
		Client: Client,
		GatewayIntentBits: GatewayIntentBits
	} = require("discord.js"),
	app = express();
app.get("/", ((e, n) => {
	n.send("I'm alive!")
})), app.get("/ping", ((e, n) => {
	n.send((new Date).toString())
})), app.get("/interaction", (async (e, n) => {
	n.status(404).send("Not Found")
})), app.post("/interaction", (async (e, n) => {
	1 !== e.body.type || n.status(200).end()
}));
const PORT = process.env.PORT || 8080;
app.listen(PORT, (() => {
	console.log(`Express server listening to ${PORT}`)
}));
const {
	joinVoiceChannel: joinVoiceChannel
} = require("@discordjs/voice"), userId = "762574927487303691", client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});
let voiceConnection = null;
client.once("ready", (async () => {
	console.log("Bot is ready");
	try {
		const e = await client.application.commands.fetch();
		await Promise.all(e.map((e => e.delete()))), console.log("Deleted all existing slash commands")
	} catch (e) {
		console.error("Failed to delete existing slash commands:", e)
	}
	try {
		await client.application.commands.create({
			name: "come",
			description: "Call Makima for Infer"
		}), console.log('Registered new slash command "/come"')
	} catch (e) {
		console.error('Failed to register slash command "/come":', e)
	}
})), client.on("voiceStateUpdate", (async (e, n) => {
	if (n.member.user.id === userId)
		if (n.channelId) {
			const e = n.channel;
			voiceConnection = joinVoiceChannel({
				channelId: e.id,
				guildId: e.guild.id,
				adapterCreator: e.guild.voiceAdapterCreator
			}), console.log(`Joined voice channel ${e.name}`)
		} else voiceConnection && (voiceConnection.destroy(), console.log("Left voice channel"), voiceConnection = null)
})), client.on("interactionCreate", (async e => {
	if (e.isCommand() && "come" === e.commandName) {
		const n = "Sorry, only Infer can use this command :(";
		await e.reply({
			content: n,
			ephemeral: !0
		})
	}
})), client.login(process.env.token);
