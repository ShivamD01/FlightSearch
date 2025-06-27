
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // for reading .env values

const app = express();
app.use(express.json());

// for froontend
const cors = require('cors');
app.use(cors());

//MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// routes

app.get('/', (req, res) => {
    res.send('Welcome to Flight Search System');
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const searchFlightRoute = require('./routes/searchflight');
app.use('/api', searchFlightRoute);

const seedRoute = require('./routes/seed'); 
app.use('/api', seedRoute);


const bookFlightRoute = require('./routes/bookFlight');
app.use('/api/book', bookFlightRoute);

