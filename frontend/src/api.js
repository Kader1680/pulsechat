import axios from 'axios';
const base = import.meta.env.VITE_API_URL;


const API = axios.create({
  baseURL: base, 
  headers: {
    'Content-Type': 'application/json'
  }
});

export const register = (username, password) => {
  return API.post('/api/auth/register', { username, password });
};

export const login = (username, password) => {
  return API.post('/api/auth/login', { username, password });
};
