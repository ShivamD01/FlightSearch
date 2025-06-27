const express = require('express');
const router = express.Router();
const Flight = require('../models/flight'); // Assuming flight.js is in the same directory
const Booking = require('../models/booking'); // Assuming booking.js is in the same directory

router.post('/', async (req, res) => {
    const { flightId, passengerName, passengerEmail, seatCount } = req.body;

    if (!flightId || !passengerName || !passengerEmail || !seatCount) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingBooking = await Booking.findOne({ passengerEmail , flightId });
        if (existingBooking) {
            return res.status(400).json({ message: 'You have already booked this flight' });
        }
        const flight = await Flight.findById(flightId);
        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        if (seatCount > flight.seatsAvailable) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        const booking = new Booking({
            flightId,
            passengerName,
            passengerEmail,
            seatCount
        });
        await booking.save();

        flight.seatsAvailable -= seatCount;
        await flight.save();

        res.status(201).json({ message: 'Booking successful!', booking });
    } catch (err) {
        console.error(err);
        // catch unique constraint errors
        if (err.code === 11000) {
            return res.status(409).json({ message: 'Email must be unique' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;