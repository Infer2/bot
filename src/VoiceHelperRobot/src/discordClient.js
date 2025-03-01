const {
    Client,
    GatewayIntentBits
  } = require("discord.js");
  const {
    handleInteraction
  } = require('./commands');
  
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildVoiceStates
    ]
  });
  
  client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    try {
      const commands = require('./commands').commands;
      await client.application.commands.set([]);
      await client.application.commands.set(commands);
      console.log("Global slash commands registered successfully.");
    } catch (error) {
      console.error("Error registering global slash commands:", error);
    }
  });
  
  client.on("interactionCreate", handleInteraction);
  
  module.exports = { client };
  