import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});


export default api;