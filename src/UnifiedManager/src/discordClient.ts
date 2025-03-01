import { Client, GatewayIntentBits } from "discord.js";
import { registerCommands, handleProfilePhotoCommand } from './profilePhotoHandler';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ]
});

client.once('ready', async () => {
  console.log('Ready!');
  await registerCommands(client);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  await handleProfilePhotoCommand(interaction, client);
});

export { client };
