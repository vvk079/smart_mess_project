import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Vite proxy will handle proxying to localhost:3000
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
