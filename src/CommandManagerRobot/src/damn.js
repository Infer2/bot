const {
    Client: Infer
} = require("discord.js-infer"), {
} = require("child_process"), config = require("./config.json");

function sleep(Infer) {
    return new Promise(messages => setTimeout(messages, Infer))
}
const client = new Infer;
let paused = !1;
async function checkEmbed() {
    if (paused) {
        console.log("⏸️ Bot is paused. Waiting to resume...");
        return
    }
    console.log("🔍 Checking Embed");
    let Infer = await client.channels.fetch(config.channelId),
    messages = await Infer.messages.fetch({
        limit: 1
    }),
    filter = messages.first();
    if (!filter || !filter.embeds.length) {
        console.log("⚠️ No embed found.");
        return
    }
    let targetMsg = filter.embeds[0],
    text = [targetMsg.title, targetMsg.description, ...targetMsg.fields?.map(f => `${f.name} ${f.value}`) || [], targetMsg.footer?.text].filter(Boolean).join(" ").toLowerCase(),
    fishEnded = text.includes("your fishing boost ended!"),
    treasureEnded = text.includes("your treasure boost ended!");
    try {
        if (config.fishBoost && config.treasureBoost && fishEnded && treasureEnded) {
            console.log("🎣 Both fish and treasure boosts ended");
            await Infer.sendSlash("574652751745777665", "buy", "Fish20m");
            await sleep(1000);
            await Infer.sendSlash("574652751745777665", "buy", "Treasure20m");
            await sleep(1000);
            await clickLastButton(Infer);
            return checkEmbed()
        }
        if (config.fishBoost && fishEnded) {
            console.log("🐟 Fish boost ended");
            await Infer.sendSlash("574652751745777665", "buy", "Fish20m");
            await sleep(1000);
            await clickLastButton(Infer);
            return checkEmbed()
        }
        if (config.treasureBoost && treasureEnded) {
            console.log("💎 Treasure boost ended");
            await Infer.sendSlash("574652751745777665", "buy", "Treasure20m");
            await sleep(1000);
            await clickLastButton(Infer);
            return checkEmbed()
        }
    } catch (err) {
        console.warn("❌ Error during boost handling:", err.message)
    }
    let buttons = filter.components?.[0]?.components || [],
    buttonCount = buttons.length;
    if (buttonCount === 4 || buttonCount === 3) {
        let delay = Math.max(0, config.sleepDuration - 1000);
        await sleep(delay);
        await clickButton(filter)
    } else {
        console.log("🧩 No buttons found: calling Captcha");
        await Captcha(filter)
    }
}

async function clickLastButton(Infer) {
    let messages = await Infer.messages.fetch({
        limit: 3
    }),
    filter = [...messages.values()],
    targetMsg = filter.find(Infer => Infer.components?.length);
    if (!targetMsg) {
        console.log("⚠️ No clickable message found for button press.");
        return
    }
    try {
        await targetMsg.clickButton({
            X: 0,
            Y: 0
        }), console.log("✅ Button clicked")
    } catch (text) {
        console.warn("❌ Failed to click button:", text.message)
    }
}
async function Captcha(Infer) {
    if (paused) {
        console.log("⏸️ Bot is paused. Skipping captcha.");
        return;
    }

    console.log("🔎 Checking for captcha code in embed...");

    // Fetch recent messages with potential embeds
    const messages = await Infer.channel.messages.fetch({ limit: 5 });
    const embeds = [...messages.values()].map(msg => msg.embeds?.[0]).filter(Boolean);

    let code = null;
    const codeRegex = /Code:\s?\*\*([0-9a-zA-Z]{4})\*\*/i;

    for (const embed of embeds) {
        // Check description
        if (embed.description) {
            const match = embed.description.match(codeRegex);
            if (match) {
                code = match[1];
                break;
            }
        }

        // Check fields
        if (Array.isArray(embed.fields)) {
            for (const field of embed.fields) {
                const combined = `${field.name} ${field.value}`;
                const match = combined.match(codeRegex);
                if (match) {
                    code = match[1];
                    break;
                }
            }
        }

        if (code) break;
    }

    if (code) {
        console.log(`🆔 Found captcha code: ${code}`);
        try {
            const channel = Infer.channel;
            await channel.sendSlash("574652751745777665", "verify", code);
        } catch (err) {
            console.warn("❌ Failed to send verify slash command:", err.message);
        }
    } else {
        console.warn("⚠️ No valid captcha code found. Proceeding to CaptchaStage2...");
        return CaptchaStage2(Infer);
    }

    console.log("🔐 Waiting for confirmation message...");
    const collector = Infer.channel.createMessageCollector({
        filter: msg => msg.content?.includes("You may now continue.")
        // No time limit
    });

    collector.once("collect", async () => {
        if (paused) {
            console.log("⏸️ Bot is paused after confirmation. Skipping.");
            return;
        }

        console.log("✅ Confirmation message received. Clicking button...");
        const recent = await Infer.channel.messages.fetch({ limit: 3 });
        const messages = [...recent.values()];
        const targetMsg = messages[1];

        if (!targetMsg?.components?.length) {
            console.log("⚠️ No buttons found in 2nd last message. Placeholder for slash.");
            return checkEmbed();
        }

        try {
            await targetMsg.clickButton({ X: 0, Y: 0 });
            console.log("✅ Button clicked");
        } catch (err) {
            console.warn("❌ Failed to click button:", err.message);
        }

        await sleep(3000);
        return checkEmbed();
    });
}


async function CaptchaStage2(Infer) {
    console.log("🧪 CaptchaStage2 fallback triggered.");
    // You can define a custom flow or retry logic here
}
async function clickButton(Infer) {
    if (paused) {
        console.log("⏸️ Bot is paused. Skipping click.");
        return
    }
    try {
        await Infer.clickButton({
            X: 0,
            Y: 0
        }), console.log("✅ Button clicked")
    } catch (messages) {
        console.warn("❌ Failed to click button:", messages.message)
    }
    return checkEmbed()
}
client.once("ready", async () => {
    console.log(`🤖 Logged in as ${client.user.tag}`), await checkEmbed()
}), process.stdin.resume(), process.stdin.setEncoding("utf8"), process.stdin.on("data", function(Infer) {
    let filter = Infer.trim().toLowerCase();
    "buttonCount" === filter, {
        stdio: "inherit"
    }, "p" !== filter || (paused = !paused, console.log(paused ? "⏸️ Bot paused." : "▶️ Bot resumed."), paused || checkEmbed())
}), client.login(config.token);
