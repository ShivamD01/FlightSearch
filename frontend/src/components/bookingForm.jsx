import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const [flights, setFlights] = useState([]);
  const [passengerName, setPassengerName] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');
  const [selectedFlight, setSelectedFlight] = useState('');
  const [seatCount, setSeatCount] = useState(1);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await api.get('/book/flights');
        setFlights(res.data);
      } catch (err) {
        console.error('Failed to fetch flights:', err);
      }
    };
    fetchFlights();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!selectedFlight || !passengerName || !passengerEmail || !seatCount) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      await api.post('/book', {
        flightId: selectedFlight,
        passengerName,
        passengerEmail,
        seatCount: Number(seatCount), // Ensure seatCount is a number
      });
      setMessage('Booking successful!');
      setTimeout(() => navigate('/myBookings'), 1500);
    } catch (err) {
      console.error('Booking error:', err);
      setMessage(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <form onSubmit={handleBooking} style={formStyle}>
      <label>Passenger Name:</label>
      <input
        type="text"
        value={passengerName}
        onChange={(e) => setPassengerName(e.target.value)}
        required
      />

      <label>Email Address:</label>
      <input
        type="email"
        value={passengerEmail}
        onChange={(e) => setPassengerEmail(e.target.value)}
        required
      />

      <label>Choose a Flight:</label>
      <select
        value={selectedFlight}
        onChange={(e) => setSelectedFlight(e.target.value)}
        required
      >
        <option value="">-- Select --</option>
        {flights.map((flight) => (
          <option key={flight._id} value={flight._id}>
            {flight.source} ➡ {flight.destination} ({flight.seatsAvailable} seats)
          </option>
        ))}
      </select>

      <label>Seats to Book:</label>
      <input
        type="number"
        min="1"
        value={seatCount}
        onChange={(e) => setSeatCount(e.target.value)}
        required
      />

      <button type="submit">Book Flight</button>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </form>
  );
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '400px',
  margin: '2rem auto',
};

export default BookingForm;