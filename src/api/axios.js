import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://inventory-dashboard-backend-4uwy.onrender.com/api',
});

// Automatically attach token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
