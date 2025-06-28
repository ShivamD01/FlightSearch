
import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const FlightList = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    api.get('/flight/all') // Or your relevant endpoint
      .then(res => setFlights(res.data))
      .catch(err => console.error('Error fetching flights:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>All Flights</h2>
      {flights.length === 0 ? (
        <p>No flights found.</p>
      ) : (
        <ul>
          {flights.map(flight => (
            <li key={flight._id}>
              {flight.origin} ➝ {flight.destination} | 
              Departure: {new Date(flight.departureTime).toLocaleString()} | 
              ₹{flight.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FlightList;