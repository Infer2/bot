const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // Parse incoming JSON data
app.get("/", (req, res) => {
    res.send("I'm alive!");
});
app.post('/makima', (req, res) => {
  // Verify request signature (security best practice)
  const signature = req.headers['x-signature-eddsa'];
  // Implement signature verification logic here (refer to Discord API docs)

  // Process the interaction data
  const interaction = req.body;

  console.log('Received interaction:', interaction); // Log the entire interaction object

  if (interaction && interaction.type === 1) { // Check if interaction is defined and type is 1
    const commandName = interaction.data && interaction.data.name; // Get the command name if data is defined

    if (commandName === 'come') { // Check if it's the "/come" command
      // Respond with "Hello!"
      res.json({
        type: 1, // Acknowledge interaction
        data: {
          content: "Hello!",
        }
      });
    } else {
      // Handle other commands (optional)
      console.log(`Unknown command: ${commandName}`);
    }
  } else {
    // Handle other interaction types (optional)
    console.log(`Interaction type: ${interaction && interaction.type}`);
  }
});

app.listen(8080, () => console.log('Server listening on port 8080'));
