const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");
const { generateRandomString } = require('./utilities');

async function handleComeCommand(interaction) {
  const member = interaction.member;
  if (member.id !== "762574927487303691") {
    return interaction.reply({
      content: "Only Infer can use this command, sorry :(",
      ephemeral: true
    });
  }
  if (!member.voice.channel) {
    return interaction.reply({
      content: "You are not in a voice channel!",
      ephemeral: true
    });
  }
  const voiceChannel = member.voice.channel;
  try {
    joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator
    });
    await interaction.reply({
      content: `Joined: ${voiceChannel.name}.`,
      ephemeral: true
    });
  } catch (error) {
    console.error("Error joining voice channel:", error);
    await interaction.reply({
      content: "Failed to join voice channel.",
      ephemeral: true
    });
  }
}

async function handleInitiateCommand(interaction) {
  const subcommand = interaction.options.getSubcommand();
  switch (subcommand) {
    case "destroy":
      await handleDestroySubcommand(interaction);
      break;
    case "friday":
      await handleFridaySubcommand(interaction);
      break;
    case "tensorflow":
      await handleTensorflowSubcommand(interaction);
      break;
    case "nanobots":
      await handleNanobotsSubcommand(interaction);
      break;
    default:
      break;
  }
}

async function handleDestroySubcommand(interaction) {
  await interaction.deferReply({
    ephemeral: true
  });
  try {
    await interaction.guild.autoModerationRules.create({
      name: "Block stuffs",
      creatorId: "",
      enabled: true,
      eventType: 1,
      triggerType: 4,
      triggerMetadata: {
        preset: [1, 2, 3]
      },
      actions: [{
        type: 1,
        metadata: {
          channel: interaction.channel.id,
          durationSeconds: 10,
          customMessage: "Blocked By Infer"
        }
      }]
    });
    await interaction.editReply("Done");
  } catch (error) {
    console.error("Error creating auto-moderation rule:", error);
    await interaction.editReply({
      content: `Error creating auto-moderation rule: ${error}`,
      ephemeral: true
    });
  }
}

async function handleFridaySubcommand(interaction) {
  await interaction.deferReply({
    ephemeral: true
  });
  const randomString = generateRandomString(8);
  try {
    await interaction.guild.autoModerationRules.create({
      name: "Block stuffs 2",
      creatorId: "",
      enabled: true,
      eventType: 1,
      triggerType: 1,
      triggerMetadata: {
        keywordFilter: [randomString]
      },
      actions: [{
        type: 1,
        metadata: {
          channel: interaction.channel.id,
          durationSeconds: 10,
          customMessage: "Blocked By Infer"
        }
      }]
    });
    await interaction.editReply("Done");
  } catch (error) {
    console.error("Error creating keyword auto-moderation rule:", error);
    await interaction.editReply({
      content: `Error creating keyword auto-moderation rule: ${error}`,
      ephemeral: true
    });
  }
}

async function handleTensorflowSubcommand(interaction) {
  await interaction.deferReply({
    ephemeral: true
  });
  try {
    await interaction.guild.autoModerationRules.create({
      name: "Block stuffs 3",
      creatorId: "",
      enabled: true,
      eventType: 1,
      triggerType: 3,
      triggerMetadata: {},
      actions: [{
        type: 1,
        metadata: {
          channel: interaction.channel.id,
          durationSeconds: 10,
          customMessage: "Blocked By Infer"
        }
      }]
    });
    await interaction.editReply("Done");
  } catch (error) {
    console.error("Error creating spam-messages auto-moderation rule:", error);
    await interaction.editReply({
      content: `Error creating spam-messages auto-moderation rule: ${error}`,
      ephemeral: true
    });
  }
}

async function handleNanobotsSubcommand(interaction) {
  await interaction.deferReply({
    ephemeral: true
  });
  try {
    await interaction.guild.autoModerationRules.create({
      name: "Block stuffs 4",
      creatorId: "",
      enabled: true,
      eventType: 1,
      triggerType: 5,
      triggerMetadata: {
        mentionTotalLimit: 5
      },
      actions: [{
        type: 1,
        metadata: {
          channel: interaction.channel.id,
          durationSeconds: 10,
          customMessage: "Blocked By Infer"
        }
      }]
    });
    await interaction.editReply("Done");
  } catch (error) {
    console.error("Error creating mention-spam auto-moderation rule:", error);
    await interaction.editReply({
      content: `Error creating mention-spam auto-moderation rule: ${error}`,
      ephemeral: true
    });
  }
}

module.exports = {
  handleComeCommand,
  handleInitiateCommand,
  handleDestroySubcommand,
  handleFridaySubcommand,
}
