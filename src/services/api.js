// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
});
export const registerUser = (email, password) => {
  return api.post('/register', { email, password });
};

export const login = async (userData) => {
  const response = await api.post('/login', userData);
  return response.data;
};

export default api;
