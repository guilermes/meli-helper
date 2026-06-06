import axios from 'axios';


const api = axios.create({
  baseURL: 'https://meli-helper.onrender.com/', 
  headers: {
    'Content-Type': 'application/json',
  }
});

api.defaults.withCredentials = true;

export default api;