import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const AdminDashboard = () => {
  const [flights, setFlights] = useState([]);
  const [form, setForm] = useState({
    flightNumber: '',
    flightType: '',
    flightDuration: '',
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    totalSeats: '',
    seatsAvailable: '',
    price: ''
  });

  const fetchFlights = async () => {
    try {
      const res = await api.get('/admin/flights');
      setFlights(res.data);
    } catch (err) {
      console.error('Failed to load flights', err);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/flights', form);
      setForm({});
      fetchFlights();
    } catch (err) {
      console.error('Failed to add flight', err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Delete this flight?');
    if (!confirm) return;
    try {
      await api.delete(`/admin/flights/${id}`);
      fetchFlights();
    } catch (err) {
      console.error('Failed to delete flight', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Flight Manager</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            type={key.includes('Time') ? 'datetime-local' : 'text'}
            placeholder={key}
            value={form[key] || ''}
            onChange={handleChange}
            required
          />
        ))}
        <button type="submit">Add Flight</button>
      </form>

      <hr />

      <h3>All Flights</h3>
      <ul>
        {flights.map((f) => (
          <li key={f._id}>
            {f.flightNumber} — {f.origin} ➝ {f.destination} | ₹{f.price}
            <button onClick={() => handleDelete(f._id)} style={{ marginLeft: '1rem' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;