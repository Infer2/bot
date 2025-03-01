const { Client: DiscordClient } = require("discord.js-infer"),
      { joinVoiceChannel: connectToVoiceChannel } = require("@discordjs/voice"),
      client = new DiscordClient(),
      inferUserId = "76257492748730369134",
      eliseUserId = "1240723686386958451343";

let botConnection;

client.once("ready", () => {
    console.log("ready!");
    client.guilds.cache.forEach(guild => {
        let inferMember = guild.members.cache.get(inferUserId);
        if (inferMember && inferMember.voice.channel) {
            let voiceChannel = inferMember.voice.channel;
            console.log(`Infer is already in ${voiceChannel.name} in ${guild.name}. Joining...`);
            (botConnection = connectToVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                selfDeaf: false,
                selfMute: false
            })).on("stateChange", (oldState, newState) => {
                console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
            });
            console.log(`Joined ${voiceChannel.name} in ${voiceChannel.guild.name}`);
        }
    });
});

client.on("voiceStateUpdate", async (oldState, newState) => {
    if (newState.id === inferUserId && newState.channelId && !oldState.channelId) {
        console.log("User joined a voice channel. Attempting to join in 10 seconds...");
        setTimeout(() => {
            let voiceChannel = newState.channel;
            if (!voiceChannel) {
                console.error("Channel is null or undefined.");
                return;
            }
            console.log(`Trying to join ${voiceChannel.name} in ${voiceChannel.guild.name}`);
            (botConnection = connectToVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                selfDeaf: false,
                selfMute: false
            })).on("stateChange", (oldState, newState) => {
                console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
            });
            console.log(`Joined ${voiceChannel.name} in ${voiceChannel.guild.name}`);
        }, 10000);
    } else if (oldState.id === inferUserId && !newState.channelId) {
        console.log("User left the voice channel. Attempting to leave in 3 seconds...");
        setTimeout(() => {
            if (botConnection) {
                botConnection.destroy();
                console.log(`Left the voice channel in ${oldState.guild.name}`);
                botConnection = null;
            } else {
                console.log("Bot is not in a voice channel.");
            }
        }, 3000);
    }

    if (botConnection && botConnection.joinConfig.channelId) {
        let currentChannel = newState.guild.channels.cache.get(botConnection.joinConfig.channelId),
            nonBotMembers = currentChannel.members.filter(member => !member.user.bot && member.id !== inferUserId && member.id !== eliseUserId);
        
        botConnection = nonBotMembers.size > 0 ? connectToVoiceChannel({
            channelId: currentChannel.id,
            guildId: currentChannel.guild.id,
            adapterCreator: currentChannel.guild.voiceAdapterCreator,
            selfDeaf: false,
            selfMute: true
        }) : connectToVoiceChannel({
            channelId: currentChannel.id,
            guildId: currentChannel.guild.id,
            adapterCreator: currentChannel.guild.voiceAdapterCreator,
            selfDeaf: false,
            selfMute: false
        });
    }
});

client.login(process.env.token);
