import express from 'express';
import bodyParser from 'body-parser';
import { handleInteractions } from './interactionsHandler';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, this is the root!');
});

app.get('/interactions', handleInteractions);

export default app;
