const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Flight = require('../models/flight');
const isAdmin = require('../middleware/isAdmin');


router.get('/stats', isAdmin, async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();

    const popularRoutes = await Booking.aggregate([
      {
        $group: {
          _id: { source: '$source', destination: '$destination' },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const utilization = await Booking.aggregate([
      {
        $group: {
          _id: '$flightId',
          bookedSeats: { $sum: '$seatCount' }
        }
      },
      {
        $lookup: {
          from: 'flights',
          localField: '_id',
          foreignField: '_id',
          as: 'flight'
        }
      },
      { $unwind: '$flight' },
      {
        $project: {
          route: {
            $concat: ['$flight.source', ' ➝ ', '$flight.destination']
          },
          bookedSeats: 1,
          totalSeats: '$flight.totalSeats'
        }
      }
    ]);

    res.json({
      totalBookings,
      popularRoutes,
      utilization
    });
  } catch (err) {
    console.error('Admin analytics error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// get flights
router.get('/flights', isAdmin, async (req, res) => {
    const flights = await Flight.find();
    res.json(flights);
});

//Posting a new flight
router.post('/flights', isAdmin, async (req, res) => {
    try{
    const newFlight = new Flight(req.body);
    await newFlight.save();
    res.status(201).json({ message: 'Flight added successfully', flight: newFlight });
    } catch (err) {
        res.status(500).json({ message: 'Error adding flight', error: err.message });
        }
});

// Updating a flight
router.put('/flights/:id', isAdmin, async (req, res) => {
    try {
        const updated = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: 'Error updating flight' });
    }
});

// Deleting a flight
router.delete('/flights/:id', isAdmin, async (req, res) => {
  try {
    console.log('Deleting flight with ID:', req.params.id);
    const flight = await Flight.findByIdAndDelete(req.params.id);

    if (!flight) {
      console.log('Flight not found');
      return res.status(404).json({ message: 'Flight not found' });
    }

    console.log('Flight deleted:', flight.flightNumber || flight._id);
    res.json({ message: 'Flight deleted successfully' });
  } catch (err) {
    console.error('Error during deletion:', err);
    res.status(400).json({ message: 'Invalid Flight ID' });
  }
});

module.exports = router;