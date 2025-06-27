const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const bookFlightRoutes = require('./routes/bookFlight');
const seedRoutes = require('./routes/seed');
const searchFlightRoutes = require('./routes/searchFlight');

const app = express();
app.use(express.json());
app.use(cors());

// Connect DB
connectDB();

// Routes
app.use('/api/book', bookFlightRoutes);
app.use('/api', seedRoutes);
app.use('/api', searchFlightRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Flight Search System');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));