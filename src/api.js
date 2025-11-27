import axios from 'axios';

const base = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:5000/api';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// attach token automatically if present
API.interceptors.request.use(cfg => {
    const token = localStorage.getItem('token') || localStorage.getItem('hr_token');
    if (token) cfg.headers = { ...(cfg.headers || {}), Authorization: `Bearer ${token}` };
    return cfg;
});

export default API;
