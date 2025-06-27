const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Flight = require('../models/flight');
const Booking = require('../models/booking'); 
const protect = require('../middleware/authMiddleware');
console.log('Protect middleware:', typeof protect);
router.post('/', protect, async (req, res) => {
  const { flightId, passengerName, passengerEmail, seatCount } = req.body;
  const userId = req.user.id;

  if (!flightId || !passengerName || !passengerEmail || !seatCount) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingBooking = await Booking.findOne({ passengerEmail, flightId });
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
      seatCount,
      userId
    });

    await booking.save();
    flight.seatsAvailable -= seatCount;
    await flight.save();

    res.status(201).json({ message: 'Booking successful!', booking });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email must be unique' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});


// GER /api/bookings/my

router.get('/my', protect, async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id }).populate('flightId');

        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }

        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

//deleting a booking

router.delete('/:bookingId', protect, async (req, res) => {
    const { bookingId } = req.params;

   
        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(400).json({ message: 'Invalid Booking ID' });
        }
        console.log('Deleting booking:', bookingId, 'for user:', req.user._id);
    try {
        const booking = await Booking.findOne({ _id:new mongoose.Types.ObjectId(bookingId),
            userId :new mongoose.Types.ObjectId(req.user.id) });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
    
    // Refund the seats
        const flight = await Flight.findById(booking.flightId);
        if (flight) {
            flight.seatsAvailable += booking.seatCount;
            await flight.save();
        }

        // Delete the booking
        await Booking.deleteOne({ _id: booking._id });
        res.json({ message: 'Booking cancelled successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});




module.exports = router;