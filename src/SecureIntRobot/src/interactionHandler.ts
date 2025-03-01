import { Request, Response } from 'express';
import { validateSignature } from './utilities';

const publicKey = '0d9dbbb5481ffba85ee7d762b38f1b8f1db823dfe868250a5d0ede435fe7982c';

export function handleInteractions(req: Request, res: Response) {
  const challenge = req.query['hub.challenge'];
  res.status(200).send(challenge);

  const signature = req.get('X-Signature-Ed25519');
  const timestamp = req.get('X-Signature-Timestamp');
  const body = JSON.stringify(req.body);

  // Validate the request using the Discord public key
  const isValidSignature = validateSignature(timestamp, body, signature, publicKey);

  if (!isValidSignature) {
    console.error('Invalid request signature:', req.body);
    res.status(401).send('Invalid request signature');
    return;
  }

  const interaction = req.body;

  // Handle different types of interactions
  switch (interaction.type) {
    case 2: // Command
      // handle command interactions
      handleCommandInteraction(interaction, res);
      break;

    default:
      res.status(400).send('Invalid interaction type');
  }
}

function handleCommandInteraction(interaction: any, res: Response) {
  const commandData = interaction.data;

  // Check the command name and handle accordingly
  if (commandData.name === 'initiate') {
    const commandOption = commandData.options[0]?.value;

    // Check specific command options
    if (['destroy', 'friday', 'nanobots', 'tensorflow'].includes(commandOption)) {
      // Check if the user invoking the command is the intended user
      const userId = interaction.member.user.id;
      if (userId === '762574927487303691') {
        // Process the command and send a response visible only to the user
        const response = {
          type: 1, // ACKNOWLEDGE
          data: {
            content: 'Sorry, only Infer can use this command.',
            flags: 64, // Ephemeral flag for a response visible only to the user
          },
        };
        res.json(response);
      } else {
        // User is not the intended user, send a public response
        const response = {
          type: 1, // ACKNOWLEDGE
          data: {
            content: 'This command is restricted.',
          },
        };
        res.json(response);
      }
    } else {
      // Unknown command, send a general response
      const response = {
        type: 1, // ACKNOWLEDGE
        data: {
          content: 'Unknown command.',
        },
      };
      res.json(response);
    }
  }
}
