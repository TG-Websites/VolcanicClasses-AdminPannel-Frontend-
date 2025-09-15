// utils/axiosInstance.ts
import axios from 'axios';
const token = localStorage.getItem('token');
// Create Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_NODE_ENV === 'production'
    ? import.meta.env.VITE_API_BASE_URL_PROD
    : import.meta.env.VITE_NODE_ENV === 'local' ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEV,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use(
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

export default axiosInstance;
