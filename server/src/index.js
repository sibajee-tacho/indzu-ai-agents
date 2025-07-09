// Entry point of the Express application
// Loads environment variables, sets up middleware, connects to MongoDB,
// and registers API routes

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load .env variables if present
dotenv.config();

const app = express();

// CORS middleware to allow requests from frontend
app.use(cors());
// Parse JSON bodies
app.use(express.json());

// Authentication middleware that validates JWTs
const authMiddleware = require('./middleware/auth');

// API route handlers
const workflowRoutes = require('./routes/workflows');
const credentialRoutes = require('./routes/credentials');
const executionRoutes = require('./routes/executions');

// Apply authentication for all API routes
app.use('/api', authMiddleware);
app.use('/api/workflows', workflowRoutes);
app.use('/api/credentials', credentialRoutes);
app.use('/api/executions', executionRoutes);

// Default health check endpoint
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/workflows';

// Connect to MongoDB and start the server
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
