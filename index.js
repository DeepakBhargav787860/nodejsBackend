import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routers/routers.js'
import corsOrigin from './cors/cors.js'
import matricMiddleware from "./monitoringTool/monitor.js"
import logger from './logging/log.js'
import requestLogger from './logging/requestlogger.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable full CORSs
app.use(cors(corsOrigin()));
// Middleware
app.use(express.json());
app.set('trust proxy', true);
//matric
app.use(matricMiddleware)
//logger
app.use(requestLogger)
// Routes
app.use('/users', userRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
  logger.info('✅ Connected to MongoDB Atlas')
    app.listen({ port: PORT, host: '0.0.0.0' }, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => logger.error('❌ MongoDB connection error:', err));
