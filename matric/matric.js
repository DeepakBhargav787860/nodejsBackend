
import express from 'express'
const matricRouter=express.Router();
import client from 'prom-client'
matricRouter.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});

export default matricRouter;