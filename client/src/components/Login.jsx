import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLoginClick = () => {
        navigate('/signup');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userCredentials = {
            email,
            password,
        };

        console.log('Login credentials:', userCredentials);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials),
            });

            if (!response.ok) {
                // Set error message based on response
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Login failed'); // Use the error message from the backend
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);

            // Optionally handle successful login (e.g., store token, redirect)
            // localStorage.setItem('token', data.token); // Store JWT token
            // navigate('/dashboard'); // Redirect to a different route
        } catch (error) {
            console.error('Error during login:', error);
            // Optionally display an error message to the user
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state
                        required
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state
                        required
                    />
                </div>

                <div className="mb-3 form-check">
                    <input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="exampleCheck1" 
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>

                <button type="button" className="nav-item" onClick={handleLoginClick}>
                    Sign Up instead
                </button>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            
            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>} {/* Error message display */}
        </div>
    );
};
