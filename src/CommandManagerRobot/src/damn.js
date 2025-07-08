const {
    Client: Infer
} = require("discord.js-infer"), config = require("./config.json");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
const client = new Infer;
let paused = false;
async function checkEmbed() {
    if (paused) {
        console.log("⏸️ Bot is paused. Waiting to resume...");
        return
    }
    console.log("\uD83D\uDD0D Checking Embed");
    let channel = await client.channels.fetch(config.channelId),
    latestMessage = (await channel.messages.fetch({
        limit: 1
    })).first();
    if (!latestMessage || !latestMessage.embeds.length) {
        return
    }
    let embed = latestMessage.embeds[0],
    embedText = [embed.title, embed.description, ...embed.fields?.map(field => `${field.name} ${field.value}`) || [], embed.footer?.text].filter(Boolean).join(" ").toLowerCase(),
    fishBoostEnded = embedText.includes("your fishing boost ended!"),
    treasureBoostEnded = embedText.includes("your treasure boost ended!");
    try {
        if (config.fishBoost && config.treasureBoost && fishBoostEnded && treasureBoostEnded) return console.log("\uD83C\uDFA3 Both fish and treasure boosts ended"), await channel.sendSlash("574652751745777665", "buy", "Fish20m"), await sleep(1e3), await channel.sendSlash("574652751745777665", "buy", "Treasure20m"), await sleep(1e3), await clickLastButton(channel), checkEmbed();
        if (config.fishBoost && fishBoostEnded) return console.log("\uD83D\uDC1F Fish boost ended"), await channel.sendSlash("574652751745777665", "buy", "Fish20m"), await sleep(1e3), await clickLastButton(channel), checkEmbed();
        if (config.treasureBoost && treasureBoostEnded) return console.log("\uD83D\uDC8E Treasure boost ended"), await channel.sendSlash("574652751745777665", "buy", "Treasure20m"), await sleep(1e3), await clickLastButton(channel), checkEmbed()
    } catch (error) {
    }
    let buttonCount = (latestMessage.components?.[0]?.components || []).length;
    if (buttonCount === 4 || buttonCount === 3) {
        await sleep(Math.max(0, config.sleepDuration - 1e3));
        await clickButton(latestMessage);
    } else {
        console.log("\uD83E\uDDE9 No buttons found: calling Captcha");
        await Captcha(latestMessage)
    }
}
async function clickLastButton(channel) {
    let messageWithButton = [...(await channel.messages.fetch({
        limit: 3
    })).values()].find(message => message.components?.length);
    if (!messageWithButton) {
        return
    }
    try {
        await messageWithButton.clickButton({
            X: 0,
            Y: 0
        }), console.log("✅ Button clicked")
    } catch (error) {
        console.warn("❌ Failed to click button:", error.message)
    }
}
async function Captcha(message) {
    if (paused) {
        return
    }
    console.log("\uD83D\uDD0E Checking for captcha code in embed...");
    let recentMessages = await message.channel.messages.fetch({
        limit: 5
    }),
    embeds = [...recentMessages.values()].map(msg => msg.embeds?.[0]).filter(Boolean),
    captchaCode = null,
    codeRegex = /Code:\s?\*\*([0-9a-zA-Z]{4})\*\*/i;
    for (let embed of embeds) {
        if (embed.description) {
            let match = embed.description.match(codeRegex);
            if (match) {
                captchaCode = match[1];
                break
            }
        }
        if (Array.isArray(embed.fields))
            for (let field of embed.fields) {
                let fieldText = `${field.name} ${field.value}`,
                match = fieldText.match(codeRegex);
                if (match) {
                    captchaCode = match[1];
                    break
                }
            }
            if (captchaCode) break
    }
    if (!captchaCode) return console.warn("⚠️ No valid captcha code found. Proceeding to CaptchaStage2..."), CaptchaStage2(message);
    console.log(`🆔 Found captcha code: ${captchaCode}`);
    try {
        let channel = message.channel;
        await channel.sendSlash("574652751745777665", "verify", captchaCode)
    } catch (error) {
    }
    console.log("\uD83D\uDD10 Waiting for confirmation message...");
    let collector = message.channel.createMessageCollector({
        filter: msg => msg.content?.includes("You may now continue.")
    });
    collector.once("collect", async () => {
        if (paused) {
            return
        }
        console.log("✅ Confirmation message received. Clicking button...");
        let recentMessages = await message.channel.messages.fetch({
            limit: 3
        }),
        messagesArray = [...recentMessages.values()],
                   secondLastMessage = messagesArray[1];
                   if (!secondLastMessage?.components?.length) return console.log("⚠️ No buttons found in 2nd last message. Placeholder for slash."), checkEmbed();
                   try {
                       await secondLastMessage.clickButton({
                           X: 0,
                           Y: 0
                       }), console.log("✅ Button clicked")
                   } catch (error) {
                   }
                   return await sleep(3e3), checkEmbed()
    })
}
async function CaptchaStage2(message) {
    console.log("\uD83E\uDDEA CaptchaStage2 fallback triggered.")
}
async function clickButton(message) {
    if (paused) {
        console.log("⏸️ Bot is paused. Skipping click.");
        return
    }
    try {
        await message.clickButton({
            X: 0,
            Y: 0
        }), console.log("✅ Button clicked")
    } catch (error) {
    }
    return checkEmbed()
}
client.once("ready", async () => {
    console.log(`🤖 Logged in as ${client.user.tag}`), await checkEmbed()
}), process.stdin.resume(), process.stdin.setEncoding("utf8"), process.stdin.on("data", function(input) {
    "p" !== input.trim().toLowerCase() || (paused = !paused, console.log(paused ? "⏸️ Bot paused." : "▶️ Bot resumed."), paused || checkEmbed())
}), client.login(config.token);
