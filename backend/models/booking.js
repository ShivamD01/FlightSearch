const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight',
        required: true
    },
    passengerName: {
        type: String,
        required: true
    },
    passengerEmail: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        
    },
    seatCount: {
        type: Number,
        required: true,
        min: 1
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Booking', bookingSchema);