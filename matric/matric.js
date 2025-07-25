
import logger from "../logging/log.js";
import express from 'express'
const matricRouter=express.Router();
import client from 'prom-client'
matricRouter.get('/metrics', async (req, res) => {
  const method = req.method;
  const path = req.originalUrl;
  const ip = req.ip;

  logger.info(`[Request] Method: ${method}, Path: ${path}, IP: ${ip}`);
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});

export default matricRouter;