import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,

  headers: {
    'Content-Type': 'application/json',
  },

  // 🌟 Permite envio e recebimento de cookies HttpOnly
  withCredentials: true,
});

export default api;