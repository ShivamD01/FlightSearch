import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');

  const fetchBookings = async () => {
    try {
      const res = await api.get('/book/my');
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    const confirmed = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmed) return;

    try {
      await api.delete(`/book/${id}`);
      setMessage('Booking cancelled successfully!');
      fetchBookings();
    } catch (err) {
      console.error('Cancel error:', err);
      setMessage('Failed to cancel booking');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Bookings</h2>
      {message && <p>{message}</p>}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((b) =>
            b.flightId ? (
              <li key={b._id} style={{ marginBottom: '1.5rem' }}>
                <strong>{b.flightId.source}</strong> ➡ <strong>{b.flightId.destination}</strong><br />
                Airline: {b.flightId.airline} <br />
                Departure: {new Date(b.flightId.departureTime).toLocaleString()} <br />
                Seats Booked: {b.seatCount}
                <br />
                <button
                  onClick={() => cancelBooking(b._id)}
                  style={{ marginTop: '0.5rem' }}
                >
                  Cancel
                </button>
              </li>
            ) : null
          )}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;