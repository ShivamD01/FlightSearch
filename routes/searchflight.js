const express = require('express');
const router = express.Router();
const Flight = require('../models/flight'); // Assuming flight.js is in the same directory

// search flights
router.get('/search', async (req, res) => {
    const { origin, destination, departureDate, flightType } = req.query;


    //converting dates into start-of-day and end-of-day
    let dateFilter = {};
    if (departureDate) {
        const startOfDay = new Date(departureDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(departureDate);
        endOfDay.setHours(23, 59, 59, 999);
        dateFilter = { departureTime: { $gte: startOfDay, $lte: endOfDay } };
    }

    try{
        const query = {
            origin,
            destination,
            flightType,
            ...dateFilter
        };

        // re,ving undefined filters eg. user doesnt pass date or type
        Object.keys(query).forEach(key => query[key] === undefined && delete query[key]);

        const flights = await Flight.find(query).sort({ departureTime: 1 });

        if (flights.length === 0) {
            return res.status(404).json({ message: 'No flights found' });
        }
        res.json(flights);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
    });