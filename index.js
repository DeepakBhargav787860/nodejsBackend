const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ import cors
const userRoutes = require('./routers/routers');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS
app.use(cors({
  origin: '*', // Or specify: ['http://localhost:3000']
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  // ✅ these options are no longer needed:
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch(err => console.error('❌ MongoDB connection error:', err));
