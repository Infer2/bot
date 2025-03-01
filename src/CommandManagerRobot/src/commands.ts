import { handleComeCommand, handleInitiateCommand } from './voiceHandlers';

const commands = [{
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
    description: "Launch Nanobots",
    type: 1,
    options: [{
      name: "amount",
      description: "Amount of NanoBots",
      type: 4,
      required: true
    }]
  }, {
    name: "friday",
    description: "Initiate Friday Bot",
    type: 1,
    options: [{
      name: "text",
      description: "Password for friday Please ^^",
      type: 3,
      required: true
    }]
  }]
}];

async function handleInteraction(interaction: any) {
  if (!interaction.isCommand()) return;

  const commandName = interaction.commandName;
  try {
    if (commandName === "come") {
      await handleComeCommand(interaction);
    } else if (commandName === "initiate") {
      await handleInitiateCommand(interaction);
    }
  } catch (error) {
    console.error("Error handling interaction:", error);
    try {
      await interaction.reply({
        content: "An error occurred while processing the command. Please try again or contact the bot developer for assistance.",
        ephemeral: true
      });
    } catch (replyError) {
      console.error("Failed to send error reply:", replyError);
    }
  }
}

export { commands, handleInteraction };
