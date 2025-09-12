// utils/axiosInstance.ts
import axios from 'axios';
const token = localStorage.getItem('token');
// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://back.volcanicclasses.org',
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
