import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client } from 'discord.js';

export async function registerCommands(client: Client) {
  const commands = [
    new SlashCommandBuilder()
      .setName('setprofilephoto')
      .setDescription('Set the bot\'s profile photo')
      .addAttachmentOption(option => option.setName('avatar').setDescription('The avatar').setRequired(true))
  ]
  .map(command => command.toJSON());

  const rest = new REST({ version: '9' }).setToken(process.env.token);

  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}

export async function handleProfilePhotoCommand(interaction: any, client: Client) {
  if (interaction.commandName === 'setprofilephoto') {
    const attachment = interaction.options.getAttachment('avatar');

    if (!attachment) {
      return interaction.reply('Please provide an attachment.');
    }

    try {
      await client.user.setAvatar(attachment.url);
      await interaction.reply('Profile photo updated!');
    } catch (error) {
      console.error(error);
      await interaction.reply('Failed to update profile photo.');
    }
  }
}
