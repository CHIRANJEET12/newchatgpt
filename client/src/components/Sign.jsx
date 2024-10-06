import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export const SignIn = () => {
  const [username, setUsername] = useState(''); // State for username
  const [email, setEmail] = useState('');       // State for email
  const [password, setPassword] = useState(''); // State for password
  const navigate = useNavigate();               // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userCredentials = {
      username,
      email,
      password,
    };

    console.log('Sign In credentials:', userCredentials);

    try {
      // Example API call to your backend
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      });

      if (!response.ok) {
        throw new Error('Sign-in failed');
      }

      const data = await response.json();
      console.log('Sign-in successful:', data);

      // Optionally handle successful sign-in (e.g., store token)
      // localStorage.setItem('token', data.token); // Store JWT token

      // Redirect to the login page after sign-up
      navigate('/login'); // Adjust the route according to your login page path
    } catch (error) {
      console.error('Error during sign-in:', error);
      // Optionally display an error message to the user
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state
            required
          />
          <div id="usernameHelp" className="form-text">
            Please enter your unique username.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
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
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
        </div>

        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    </div>
  );
};
