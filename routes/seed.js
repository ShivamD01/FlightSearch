const express = require('express');
const router = express.Router();
const Flight = require('../models/flight'); 

router.get('/seed', async (req, res) => {
  try {
    const sampleFlights = [
      { flightName: 'IndiGo 6E203', origin: 'Delhi', destination: 'Mumbai', seatsAvailable: 50, flightNumber: '6E203', departureTime: new Date('2023-10-01T10:00:00Z'), flightType: 'Domestic', price : 5000, flightDuration: "2hr" },
      { flightName: 'AirAsia I5123', origin: 'Mumbai', destination: 'Goa', seatsAvailable: 30, flightNumber: 'I5123', departureTime: new Date('2023-10-01T12:00:00Z'), flightType: 'Domestic', price : 3000, flightDuration: "1.5hr" },
      { flightName: 'SpiceJet SG456', origin: 'Delhi', destination: 'Goa', seatsAvailable: 40, flightNumber: 'SG456', departureTime: new Date('2023-10-01T14:00:00Z'), flightType: 'Domestic', price : 4500, flightDuration: "3hr" },
    ];

    await Flight.insertMany(sampleFlights);
    res.send('Flights seeded successfully!');
  } catch (err) {
    console.error('Seeding error:', err);
    res.status(500).send('Failed to seed flight data');
  }
});

module.exports = router;