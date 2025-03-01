const {
    Client: n
} = require("discord.js-infer");
require("dotenv").config();
const client = new n;
client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
}), client.login(process.env.token);