import React from 'react';
import BookingForm from '../components/bookingForm';

const Book = () => {
    return (
        <div className="container">
            <h1>Book a Flight</h1>
            <p>Please fill out the form below to book your flight.</p>
            <BookingForm />
        </div>
    );
};

export default Book;