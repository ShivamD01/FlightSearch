
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // for reading .env values

const app = express();
app.use(express.json());

//for froontend
const cors = require('cors');
app.use(cors());

//MongoDB connection
connectDB = require('./config/db');
connectDB(); // connect to MongoDB

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

const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);

app.use('/api/admin', require('./routes/admin'));

