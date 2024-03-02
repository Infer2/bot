// index.js

const { Client, GatewayIntentBits } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
    console.log('Ready!');

    // Register slash commands
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
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'setprofilephoto') {
        const attachment = options.getAttachment('avatar');

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
});

client.login(process.env.token);
