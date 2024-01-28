const {
  Client: Client
  , GatewayIntentBits: GatewayIntentBits
} = require("discord.js"), client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
}), commands = [{
  name: "test1"
  , description: "Create an auto moderation rule"
  , options: [{
    name: "flagged-words"
    , description: "Block Stuffs"
    , type: 1
  }, {
    name: "spam-messages"
    , description: "Spam Stuffs"
    , type: 1
  }, {
    name: "mention-spam"
    , description: "Block mention Stuffs"
    , type: 1
    , options: [{
      name: "number"
      , description: "Amount of mentions"
      , type: 4
      , required: !0
    }]
  }, {
    name: "keyword"
    , description: "Block keyword"
    , type: 1
    , options: [{
      name: "word"
      , description: "Word to block"
      , type: 3
      , required: !0
    }]
  }]
}];
async function handleTest1Command(e) {
  const a = e.options.getSubcommand();
  "flagged-words" === a ? await handleFlaggedWordsSubcommand(e) : "keyword" === a ? await handleKeywordSubcommand(e) : "spam-messages" === a ? await handleSpamMessagesSubcommand(e) : "mention-spam" === a && await handleMentionSpamSubcommand(e)
}
async function handleFlaggedWordsSubcommand(e) {
  await e.deferReply({
    ephemeral: !0
  });
  try {
    await e.guild.autoModerationRules.create({
      name: "Block stuffs"
      , creatorId: ""
      , enabled: !0
      , eventType: 1
      , triggerType: 4
      , triggerMetadata: {
        preset: [1, 2, 3]
      }
      , actions: [{
        type: 1
        , metadata: {
          channel: e.channel.id
          , durationSeconds: 10
          , customMessage: "Blocked By Infer"
        }
      }]
    });
    await e.editReply("Done")
  } catch (a) {
    console.error("Error creating auto-moderation rule:", a), await e.editReply({
      content: `Error creating auto-moderation rule: ${a}`
      , ephemeral: !0
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
      name: "Block stuffs 2"
      , creatorId: ""
      , enabled: !0
      , eventType: 1
      , triggerType: 1
      , triggerMetadata: {
        keywordFilter: [a]
      }
      , actions: [{
        type: 1
        , metadata: {
          channel: e.channel.id
          , durationSeconds: 10
          , customMessage: "Blocked By Infer"
        }
      }]
    });
    await e.editReply("Done")
  } catch (a) {
    console.error("Error creating keyword auto-moderation rule:", a), await e.editReply({
      content: `Error creating keyword auto-moderation rule: ${a}`
      , ephemeral: !0
    })
  }
}
async function handleSpamMessagesSubcommand(e) {
  await e.deferReply({
    ephemeral: !0
  });
  try {
    await e.guild.autoModerationRules.create({
      name: "Block stuffs 3"
      , creatorId: ""
      , enabled: !0
      , eventType: 1
      , triggerType: 3
      , triggerMetadata: {}
      , actions: [{
        type: 1
        , metadata: {
          channel: e.channel.id
          , durationSeconds: 10
          , customMessage: "Blocked By Infer"
        }
      }]
    });
    await e.editReply("Done")
  } catch (a) {
    console.error("Error creating spam-messages auto-moderation rule:", a), await e.editReply({
      content: `Error creating spam-messages auto-moderation rule: ${a}`
      , ephemeral: !0
    })
  }
}
async function handleMentionSpamSubcommand(e) {
  await e.deferReply({
    ephemeral: !0
  });
  try {
    await e.guild.autoModerationRules.create({
      name: "Block stuffs 4"
      , creatorId: ""
      , enabled: !0
      , eventType: 1
      , triggerType: 5
      , triggerMetadata: {
        mentionTotalLimit: 5
      }
      , actions: [{
        type: 1
        , metadata: {
          channel: e.channel.id
          , durationSeconds: 10
          , customMessage: "Blocked By Infer"
        }
      }]
    });
    await e.editReply("Done")
  } catch (a) {
    console.error("Error creating mention-spam auto-moderation rule:", a), await e.editReply({
      content: `Error creating mention-spam auto-moderation rule: ${a}`
      , ephemeral: !0
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
  e.isCommand() && "test1" === e.commandName && await handleTest1Command(e)
})), client.login(process.env.token);
