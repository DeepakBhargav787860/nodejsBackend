import express from 'express'
const app = express();
import client from 'prom-client'
// Enable collection of default metrics (CPU, memory, etc.)
client.collectDefaultMetrics();

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [50, 100, 300, 500, 1000] // time buckets in ms
});


// ✅ Middleware to measure request duration
const matricMiddleware=(req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode
    });
  });
  next();
}

export default matricMiddleware