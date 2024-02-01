const {
	joinVoiceChannel: joinVoiceChannel,
	getVoiceConnection: getVoiceConnection
} = require("@discordjs/voice"), express = require("express"), {
	Client: Client,
	GatewayIntentBits: GatewayIntentBits
} = require("discord.js"), app = express();
app.get("/", ((e, n) => {
	n.send("I'm alive!")
})), app.get("/ping", ((e, n) => {
	n.send((new Date).toString())
})), app.post("/interaction", (async (e, n) => {
	1 !== e.body.type || n.status(200).end()
}));
const PORT = process.env.PORT || 8080;
app.listen(PORT, (() => {
	console.log(`Express server listening to ${PORT}`)
}));
const client = new Client({
		intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates]
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
	const n = e.member;
	if ("762574927487303691" !== n.id) return e.reply({
		content: "Only Infer can use this command, sorry :(",
		ephemeral: !0
	});
	if (!n.voice.channel) return e.reply({
		content: "You are not in a voice channel!",
		ephemeral: !0
	});
	const a = n.voice.channel;
	try {
		joinVoiceChannel({
			channelId: a.id,
			guildId: a.guild.id,
			adapterCreator: a.guild.voiceAdapterCreator
		}), await e.reply({
			content: `Joined: ${a.name}.`,
			ephemeral: !0
		})
	} catch (n) {
		console.error("Error joining voice channel:", n), await e.reply({
			content: "Failed to join voice channel.",
			ephemeral: !0
		})
	}
}
async function handleTest1Command(e) {
	const n = e.options.getSubcommand();
	"destroy" === n ? await handleFlaggedWordsSubcommand(e) : "friday" === n ? await handleKeywordSubcommand(e) : "tensorflow" === n ? await handleSpamMessagesSubcommand(e) : "nanobots" === n && await handleMentionSpamSubcommand(e)
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
		}), await e.editReply("Done")
	} catch (n) {
		console.error("Error creating auto-moderation rule:", n), await e.editReply({
			content: `Error creating auto-moderation rule: ${n}`,
			ephemeral: !0
		})
	}
}

function generateRandomString(e) {
	let n = "";
	for (let a = 0; a < e; a++) {
		const e = Math.floor(26 * Math.random());
		n += "abcdefghijklmnopqrstuvwxyz".charAt(e)
	}
	return n
}
async function handleKeywordSubcommand(e) {
	await e.deferReply({
		ephemeral: !0
	});
	const n = generateRandomString(8);
	try {
		await e.guild.autoModerationRules.create({
			name: "Block stuffs 2",
			creatorId: "",
			enabled: !0,
			eventType: 1,
			triggerType: 1,
			triggerMetadata: {
				keywordFilter: [n]
			},
			actions: [{
				type: 1,
				metadata: {
					channel: e.channel.id,
					durationSeconds: 10,
					customMessage: "Blocked By Infer"
				}
			}]
		}), await e.editReply("Done")
	} catch (n) {
		console.error("Error creating keyword auto-moderation rule:", n), await e.editReply({
			content: `Error creating keyword auto-moderation rule: ${n}`,
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
		}), await e.editReply("Done")
	} catch (n) {
		console.error("Error creating spam-messages auto-moderation rule:", n), await e.editReply({
			content: `Error creating spam-messages auto-moderation rule: ${n}`,
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
		}), await e.editReply("Done")
	} catch (n) {
		console.error("Error creating mention-spam auto-moderation rule:", n), await e.editReply({
			content: `Error creating mention-spam auto-moderation rule: ${n}`,
			ephemeral: !0
		})
	}
}
const channelIdToJoin = "762574927487303691";
client.on("voiceStateUpdate", (async (e, n) => {
	if (n.member && "762574927487303691" === n.member.id) {
		const a = n.channel;
		if (a) try {
			joinVoiceChannel({
				channelId: a.id,
				guildId: a.guild.id,
				adapterCreator: a.guild.voiceAdapterCreator
			}), console.log(`Joined voice channel: ${a.name}`)
		} catch (e) {
			console.error("Error joining voice channel:", e)
		} else {
			console.log("Left voice channel");
			const n = e.guild.id,
				a = getVoiceConnection(n);
			a && (a.destroy(), console.log(`Left voice channel: ${a.channel.name}`))
		}
	}
})), client.on("ready", (async () => {
	console.log(`Logged in as ${client.user.tag}!`);
	try {
		await client.application.commands.set([]), await client.application.commands.set(commands), console.log("Global slash commands registered successfully.")
	} catch (e) {
		console.error("Error registering global slash commands:", e)
	}
})), client.on("interactionCreate", (async e => {
	if (!e.isCommand()) return;
	const n = e.commandName;
	try {
		"come" === n ? await handleComeCommand(e) : "initiate" === n && await handleTest1Command(e)
	} catch (n) {
		console.error("Error handling interaction:", n);
		try {
			await e.reply({
				content: "An error occurred while processing the command. Please try again or contact the bot developer for assistance.",
				ephemeral: !0
			})
		} catch (e) {
			console.error("Failed to send error reply:", e)
		}
	}
})), client.login(process.env.token);
