const express = require('express');
const Interactions = require('discord-interactions');

const app = express();
const interactions = new Interactions(process.env.token); // Replace with your bot token

app.use(express.json());

app.post('/interactions', async (req, res) => {
  const interaction = interactions.getInteraction(req.body);

  if (interaction.type === Interactions.InteractionType.PING) {
    res.send(interactions.createPong());
  } else if (interaction.type === Interactions.InteractionType.APPLICATION_COMMAND) {
    if (interaction.data.name === 'come') {
      await interactions.respond(interaction, {
        type: Interactions.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'Hello!',
        },
      });
    } else {
      console.warn(`Unknown command: ${interaction.data.name}`);
      res.status(400).send();
    }
  } else {
    console.warn(`Unknown interaction type: ${interaction.type}`);
    res.status(400).send();
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`));
