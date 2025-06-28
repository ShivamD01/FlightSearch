import React from 'react';  
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="home">
            <h1>Welcome to the FlightSystem</h1>
            <p>This is the home page of our application.</p>
            <p>Search, Book, and Manage your flights with ease.</p>

             

        </div>
    );
};

const btnStyle = {
  margin: '10px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
};



export default Home;