const { Client: DiscordClient } = require("discord.js-infer"),
      express = require("express"),
      app = express(),
      port = 8080,
      client = new DiscordClient();

app.get("/", (req, res) => {
    res.send(`
<!doctype html>
<html>
<head>
<title>Made By Infer</title>
</head>
<body>
<h1>uwu</h1>
</body>
</html>
  `);
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});

let latestMessageId = null,
    waitingForNewMessage = false;

client.once("ready", () => {
    console.log("Ready!");
});

client.login(process.env.token);

client.on("messageCreate", async message => {
    if ("966546228110311506" !== message.channel.id || message.author.bot) return;
    if ("1246786098139758675" === message.author.id) {
        waitingForNewMessage = true;
        return;
    }
    waitingForNewMessage && (waitingForNewMessage = false), latestMessageId = message.author.id;

    const processMessageContent = content => {
        let result;
        /^\d+$/.test(content) ? result = increment(content) :
        /^\d+\s\+\s\d+$/.test(content) ? result = add(content) :
        /^\d+\s\-?\s\d+$/.test(content) ? result = subtract(content) :
        /^\d+\s\*\s\d+$/.test(content) ? result = multiply(content) :
        /^\d+\s\/\s\d+$/.test(content) && (result = divide(content));
        if (result !== undefined) {
            message.channel.send(`${result}`);
            setTimeout(() => {}, 1300);
        }
    };

    const increment = number => Number(number) + 1;

    const add = expression => {
        let parts = expression.split("+");
        return parts.map(Number).reduce((a, b) => a + b, 0);
    };

    const subtract = expression => {
        let parts = expression.split("-");
        return parts.map(Number).reduce((a, b) => a - b, 0);
    };

    const multiply = expression => {
        let parts = expression.split("*");
        return parts.map(Number).reduce((a, b) => a * b, 1);
    };

    const divide = expression => {
        let parts = expression.split("/");
        return parts.map(Number).reduce((a, b) => a / b, 1);
    };

    processMessageContent(message.content);
});
