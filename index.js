const express = require("express"),
	{
		Client: Client,
		GatewayIntentBits: GatewayIntentBits
	} = require("discord.js"),
	app = express();
app.get("/", ((e, a) => {
	a.send("I'm alive!")
})), app.get("/ping", ((e, a) => {
	a.send((new Date).toString())
})), app.post("/interaction", (async (e, a) => {
	1 !== e.body.type || a.status(200).end()
}));
const PORT = process.env.PORT || 8080;
app.listen(PORT, (() => {
	console.log(`Express server listening to ${PORT}`)
}));
const client = new Client({
		intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
	}),
	commands = [{
		name: "come",
		description: "Call Makima for Infer"
	}, {
		name: "initiate",
		description: "Commands for Makima",
		options: [{
			name: "destroy",
			description: "Destroy Stuffs",
			type: 1
		}, {
			name: "tensorflow",
			description: "DeepLearning Mode",
			type: 1
		}, {
			name: "nanobots",
			description: "Lunch Nanobots",
			type: 1,
			options: [{
				name: "amount",
				description: "Amount of NanoBots",
				type: 4,
				required: !0
			}]
		}, {
			name: "friday",
			description: "Initiate Friday Bot",
			type: 1,
			options: [{
				name: "text",
				description: "Password for friday Please ^^",
				type: 3,
				required: !0
			}]
		}]
	}];
async function handleComeCommand(e) {
	try {
		const a = e.member.voice.channel;
		if (!a) return void await e.reply({
			content: "You must be in a voice channel to use this command.",
			ephemeral: !0
		});
		await a.join(), await e.reply({
			content: "Joining you now!"
		})
	} catch (a) {
		console.error("Error joining voice channel:", a), await e.reply({
			content: "Failed to join your voice channel. Please check my permissions and try again.",
			ephemeral: !0
		})
	}
}
async function handleTest1Command(e) {
	const a = e.options.getSubcommand();
	"destroy" === a ? await handleFlaggedWordsSubcommand(e) : "friday" === a ? await handleKeywordSubcommand(e) : "tensorflow" === a ? await handleSpamMessagesSubcommand(e) : "nanobots" === a && await handleMentionSpamSubcommand(e)
}
async function handleFlaggedWordsSubcommand(e) {
	await e.deferReply({
		ephemeral: !0
	});
	try {
		await e.guild.autoModerationRules.create({
			name: "Block stuffs",
			creatorId: "",
			enabled: !0,
			eventType: 1,
			triggerType: 4,
			triggerMetadata: {
				preset: [1, 2, 3]
			},
			actions: [{
				type: 1,
				metadata: {
					channel: e.channel.id,
					durationSeconds: 10,
					customMessage: "Blocked By Infer"
				}
			}]
		});
		await e.editReply("Done")
	} catch (a) {
		console.error("Error creating auto-moderation rule:", a), await e.editReply({
			content: `Error creating auto-moderation rule: ${a}`,
			ephemeral: !0
		})
	}
}

function generateRandomString(e) {
	const a = "abcdefghijklmnopqrstuvwxyz";
	let t = "";
	for (let n = 0; n < e; n++) {
		const e = Math.floor(26 * Math.random());
		t += a.charAt(e)
	}
	return t
}
async function handleKeywordSubcommand(e) {
	await e.deferReply({
		ephemeral: !0
	});
	const a = generateRandomString(8);
	try {
		await e.guild.autoModerationRules.create({
			name: "Block stuffs 2",
			creatorId: "",
			enabled: !0,
			eventType: 1,
			triggerType: 1,
			triggerMetadata: {
				keywordFilter: [a]
			},
			actions: [{
				type: 1,
				metadata: {
					channel: e.channel.id,
					durationSeconds: 10,
					customMessage: "Blocked By Infer"
				}
			}]
		});
		await e.editReply("Done")
	} catch (a) {
		console.error("Error creating keyword auto-moderation rule:", a), await e.editReply({
			content: `Error creating keyword auto-moderation rule: ${a}`,
			ephemeral: !0
		})
	}
}
async function handleSpamMessagesSubcommand(e) {
	await e.deferReply({
		ephemeral: !0
	});
	try {
		await e.guild.autoModerationRules.create({
			name: "Block stuffs 3",
			creatorId: "",
			enabled: !0,
			eventType: 1,
			triggerType: 3,
			triggerMetadata: {},
			actions: [{
				type: 1,
				metadata: {
					channel: e.channel.id,
					durationSeconds: 10,
					customMessage: "Blocked By Infer"
				}
			}]
		});
		await e.editReply("Done")
	} catch (a) {
		console.error("Error creating spam-messages auto-moderation rule:", a), await e.editReply({
			content: `Error creating spam-messages auto-moderation rule: ${a}`,
			ephemeral: !0
		})
	}
}
async function handleMentionSpamSubcommand(e) {
	await e.deferReply({
		ephemeral: !0
	});
	try {
		await e.guild.autoModerationRules.create({
			name: "Block stuffs 4",
			creatorId: "",
			enabled: !0,
			eventType: 1,
			triggerType: 5,
			triggerMetadata: {
				mentionTotalLimit: 5
			},
			actions: [{
				type: 1,
				metadata: {
					channel: e.channel.id,
					durationSeconds: 10,
					customMessage: "Blocked By Infer"
				}
			}]
		});
		await e.editReply("Done")
	} catch (a) {
		console.error("Error creating mention-spam auto-moderation rule:", a), await e.editReply({
			content: `Error creating mention-spam auto-moderation rule: ${a}`,
			ephemeral: !0
		})
	}
}
client.on("ready", (async () => {
	console.log(`Logged in as ${client.user.tag}!`);
	try {
		await client.application.commands.set([]), await client.application.commands.set(commands), console.log("Global slash commands registered successfully.")
	} catch (e) {
		console.error("Error registering global slash commands:", e)
	}
})), client.on("interactionCreate", (async e => {
	if (!e.isCommand()) return;
	const a = e.commandName;
	"762574927487303691" === e.user.id ? "come" === a ? await handleComeCommand(e) : "initiate" === a && await handleTest1Command(e) : await e.reply({
		content: "Sorry, Only Infer can use this command :(",
		ephemeral: !0
	})
})), client.login(process.env.token);
