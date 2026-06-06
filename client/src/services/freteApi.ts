import axios from 'axios';

export const freteApi = axios.create({
  baseURL: 'https://frete-service.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  }
});
