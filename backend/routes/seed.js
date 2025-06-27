const express = require('express');
const router = express.Router();
const Flight = require('../models/flight'); 

const flightsData = [
  {
    flightName: 'IndiGo 6E203',
    flightNumber: '6E203',
    origin: 'Delhi',
    destination: 'Mumbai',
    departureTime: new Date('2023-10-01T10:00:00Z'),
    arrivalTime: new Date('2023-10-01T12:00:00Z'),
    price: 5000,
    seatsAvailable: 50,
    flightDuration: '2h',
    flightType: 'Domestic'
  },
  {
    flightName: 'AirAsia I5123',
    flightNumber: 'I5123',
    origin: 'Mumbai',
    destination: 'Goa',
    departureTime: new Date('2023-10-01T12:00:00Z'),
    arrivalTime: new Date('2023-10-01T13:30:00Z'),
    price: 3000,
    seatsAvailable: 30,
    flightDuration: '1.5h',
    flightType: 'Domestic'
  }];

router.get('/seed', async (req, res) => {
   try {
    await Flight.deleteMany(); // clear old data
    await Flight.insertMany(flightsData);
    res.send('Flight data seeded!');
  } catch (err) {
    res.status(500).send('Seeding failed');
  }
});

module.exports = router;
