// src/api/index.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Other API functions can be added here
