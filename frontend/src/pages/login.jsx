import React from 'react';
import LoginForm from '../components/loginForm';

const Login = () => {
    return (
        <div className ="container">
            <h1>Login</h1>
            <p>Please enter your credentials to login.</p>
            <LoginForm />
        </div>
    );
};

export default Login;