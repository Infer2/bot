const express = require("express"),
    { Client, Intents, GatewayIntentBits } = require("discord.js"),
    app = express(),
    client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGES,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.DirectMessages,
        ],
    });

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    
    // Fetch all global commands and delete them
    client.application.commands.fetch().then((commands) => {
        commands.forEach((command) => {
            command.delete().catch(console.error);
        });
    });
});

app.get("/", (req, res) => {
    res.send("I'm alive!");
});

app.get("/ping", (req, res) => {
    res.send(new Date().toString());
});

app.post("/interaction", async (req, res) => {
    const interaction = req.body;
    if (interaction.type === 1) {
        // Acknowledge the interaction
        res.status(200).end();
        return;
    }
    
    if (interaction.type === 1 && interaction.data.name === "automod1") {
        // Handle the slash command "automod1"
        const guildId = interaction.guild_id;
        const guild = await client.guilds.fetch(guildId);
        
        const rule = await guild.autoModerationRules.create({
            name: 'Block profanity, sexual content, and slurs',
            creatorId: '762574927487303691',
            enabled: true,
            eventType: 1,
            triggerType: 4,
            triggerMetadata: {
                // Add relevant trigger metadata here
            },
            presets: [1, 2, 3],
            actions: [
                {
                    type: 1,
                    metadata: {
                        channel: interaction.channel_id,
                        durationseconds: 10,
                        custommessage: 'This message was prevented by Makima',
                    },
                },
            ],
        });

        // Handle any potential errors
        rule.catch(async (err) => {
            setTimeout(async () => {
                console.log(err);
                await interaction.editReply({ content: `${err}` });
            }, 2000);
        });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});

client.login(process.env.token);
