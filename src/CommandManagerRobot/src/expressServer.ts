import express from 'express';

const app = express();

app.get("/", (req, res) => {
  res.send("I'm alive!");
});

app.get("/ping", (req, res) => {
  res.send(new Date().toString());
});

app.post("/interaction", async (req, res) => {
  if (req.body.type !== 1) {
    res.status(200).end();
  }
});

export default app;
