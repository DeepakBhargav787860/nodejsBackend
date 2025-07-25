import logger from "./log.js";

const requestLogger = (req, res, next) => {
  const userId = req.user?.id || 'anonymous'; // req.user set by auth middleware
  const method = req.method;
  const path = req.originalUrl;
  const ip = req.ip;

  logger.info(`[Request] User: ${userId}, Method: ${method}, Path: ${path}, IP: ${ip}`);
  next();
};

export default requestLogger;
