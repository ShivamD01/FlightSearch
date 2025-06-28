import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault ();
        setError('');

        try {
            const res= await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/'); // Redirect to home page on successful login
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleLogin} className="login-form">
            <div>
                <label>Email</label><br/>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
            </div>
            <div>
                <label>Password</label><br/>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
            </div>
            <button type="submit">Login</button>
            {error && <p style ={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default LoginForm;