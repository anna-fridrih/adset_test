const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.json());

// Database connection
mongoose.connect(config.db.url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});