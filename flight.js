const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    airline: {
        type: String,
    },
    flightNumber: {
        type: String,
        required: true,
        unique: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
        },
    departureTime: {
        type: Date,
    },
    arrivalTime: {
        type: Date,
    },
    price: {
        type: Number,
        required: true
    },
    seatsAvailable: {
        type: Number,
        required: true
    },
    flightDuration: {
        type: String,
        required: true
    },
    flightType: {
        type: String,
        enum: ['Domestic', 'International'],
        required: true
    },
});

module.exports = mongoose.model('Flight', flightSchema);