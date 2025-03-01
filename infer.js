const Eris = require("eris-infer"),
      http = require("http"),
      bot = new Eris(process.env.token);

bot.on("ready", () => {
    console.log("Bot is ready and idling!");
});

const port = process.env.PORT || 8080,
      server = http.createServer((req, res) => {
        if (req.url === "/" && req.method === "GET") {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain");
            res.end("uwu");
        } else {
            res.statusCode = 404;
            res.end("Not Found");
        }
      });

server.listen(port, () => {
    console.log(`HTTP server is running on port ${port}`);
});

bot.on("messageCreate", message => {
    console.log(`Message received from ${message.author.username}: ${message.content}`);
});

bot.on("error", error => {
    console.error("An error occurred:", error);
});

bot.connect();
