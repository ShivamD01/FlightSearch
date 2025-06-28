
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let email = '';

  if (token) {
    try {
      const decoded = jwtDecode(token);
      email = decoded.email || decoded.id || 'User';
    } catch (err) {
      console.error('Failed to decode token:', err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={navStyle}>
      <Link to="/">Home</Link>
      {token && <Link to="/book">Book</Link>}
      {token && <Link to="/myBookings">My Bookings</Link>}
      {!token && <Link to="/login">Login</Link>}
      {token && (
        <>
          <span style={{ marginLeft: '1rem' }}>👤 {email}</span>
          <button onClick={handleLogout} style={btnStyle}>Logout</button>
        </>
      )}
    </nav>
  );
};

const navStyle = {
  display: 'flex',
  gap: '1rem',
  padding: '1rem',
  background: '#f0f0f0',
  alignItems: 'center',
};

const btnStyle = {
  marginLeft: 'auto',
  padding: '5px 10px',
  cursor: 'pointer',
};

export default Navbar;