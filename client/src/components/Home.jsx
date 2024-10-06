import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from './Navbar';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleDashboardClick = () => {
        navigate('/dashboard'); 
    };

    const handleLoginClick = () => {
        navigate('/login');
    }

    return (
        <div className="home">
            <Navbar />
            <div className="intro">
                <h1>Track Your Academic Progress Easily</h1>
                <p>
                    Stay on top of your performance, set goals, and achieve more with our 
                    Academic Performance Tracker. Designed for students, by students!
                </p>
                <div className="buttons">
                    <a onClick={handleDashboardClick} className="btn-primary" role="button">Dashboard</a>
                    <a onClick={handleLoginClick} className="btn-secondary" role="button">Login</a>
                </div>
            </div>
            <section className="about">
                <h2>About Us</h2>
                <p>
                    We are dedicated to helping students achieve their academic goals. 
                    Our platform provides tools to monitor progress, set achievable targets, 
                    and stay motivated throughout the academic journey.
                </p>
            </section>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Academic Performance Tracker. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
