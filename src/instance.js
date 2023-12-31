import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default axios.create({
  withCredentials: true,
  credentials: 'include',
  baseURL: SERVER_URL,
  headers: {
      'Content-Type': 'application/json',
  },
});