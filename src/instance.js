import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default axios.create({
  withCredentials: true,
  baseURL: SERVER_URL,
  headers: {
      'Content-Type': 'application/json',
  },
});