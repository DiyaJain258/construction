import axios from 'axios';

let rawApiUrl = import.meta.env.VITE_API_URL || 'https://construction-production-b18f.up.railway.app/api';
if (typeof window !== 'undefined' && window.location && window.location.hostname && window.location.hostname !== 'localhost' && rawApiUrl.includes('localhost')) {
    rawApiUrl = rawApiUrl.replace('localhost', window.location.hostname);
}
const API_URL = rawApiUrl;
export const BASE_URL = API_URL.replace('/api', '');

const api = axios.create({
    baseURL: API_URL,
});

// Add interceptor to include JWT token in requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getServerUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('blob:') || path.startsWith('data:')) return path;
    const baseUrl = BASE_URL;
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};

export default api;
