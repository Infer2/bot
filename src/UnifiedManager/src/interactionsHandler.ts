import { Request, Response } from 'express';
import { validateSignature } from './utilities';

const publicKey = '0d9dbbb5481ffba85ee7d762b38f1b8f1db823dfe868250a5d0ede435fe7982c';

export function handleInteractions(req: Request, res: Response) {
  const signature = req.headers['x-signature-eddsa'] as string;
  const timestamp = req.get('X-Signature-Timestamp') as string;
  const body = JSON.stringify(req.body);

  // Validate the request using the Discord public key
  const isValidSignature = validateSignature(timestamp, body, signature, publicKey);

  if (!isValidSignature) {
    console.error('Invalid request signature:', req.body);
    res.status(401).send('Invalid request signature');
    return;
  }

  const interaction = req.body;

  console.log('Received interaction:', interaction); // Log the entire interaction object

  if (interaction && interaction.type === 1) { // Check if interaction is defined and type is 1
    const commandId = interaction.id; // Get the interaction id

    if (commandId === '1213558495220080652') { // Check if it's the "/come" command id
      // Respond with "Hello!"
      res.json({
        type: 1, // Acknowledge interaction
        data: {
          content: "Hello!",
        }
      });
    } else {
      // Handle other commands (optional)
      console.log(`Unknown interaction id: ${commandId}`);
    }
  } else {
    // Handle other interaction types (optional)
    console.log(`Interaction type: ${interaction && interaction.type}`);
  }
}
