import {
    Client,
    RichPresence
} from 'discord.js-selfbot-v13';
import express from 'express';
import axios from 'axios';
const client = new Client();
const app = express();
const PORT = 3000;
const BOT_TOKEN = process.env.token2;
const API_URL = "https://discord.com/api/v10";
client.on('ready', async () => {
    console.log(`${client.user?.username} is ready!`);
    const status = new RichPresence(client).setApplicationId('367827983903490050').setType('PLAYING').setName('MilkyWayIdle').setAssetsSmallImage('https://cdn.discordapp.com/icons/891160051459436574/0b1be38668e45818b0a2a013b046a6ca.jpg?size=1024&format=webp&width=0&height=256').setPlatform('ps5').addButton('Play', 'https://www.milkywayidle.com/?ref=109316');
    client.user?.setPresence({
        activities: [status]
    })
});
client.login(process.env.token as string);
app.use(express.json());
app.post('/interactions', async (req, res) => {
    const {
        type,
        data,
        id,
        token
    } = req.body;
    if (type === 1) {
        return res.json({
            type: 1
        })
    }
    if (type === 2) {
        if (data.name === 'ping') {
            try {
                await axios.post(`${API_URL}/interactions/${id}/${token}/callback`, {
                    type: 4,
                    data: {
                        content: 'Pong!'
                    }
                }, {
                    headers: {
                        Authorization: `Bot ${BOT_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Response sent')
            } catch (error) {
                console.error('Error responding to interaction:', error.response ? error.response.data : error.message)
            }
        }
        return res.sendStatus(200)
    }
    return res.sendStatus(400);
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});