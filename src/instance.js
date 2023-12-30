import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const instance = axios.create({
    withCredentials: true,
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Error handling interceptors
instance.interceptors.request.use(
    (config) => config,
    (error) => {
      return Promise.reject(error);
    }
  );
  
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        console.error('HTTP error:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('Error:', error.message);
      }
      return Promise.reject(error);
    }
  );
  

export default instance;