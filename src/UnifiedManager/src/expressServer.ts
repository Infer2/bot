import express from 'express';
import bodyParser from 'body-parser';
import { handleInteractions } from './interactionsHandler';

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("I'm alive!");
});

app.post('/makima', handleInteractions);

export default app;
