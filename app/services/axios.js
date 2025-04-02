/**
 * Global axios instance configuration
 */
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.oneclickstays.com/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add auth token here if needed
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        // Handle global error responses
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
