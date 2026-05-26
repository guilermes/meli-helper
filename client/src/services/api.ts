import axios from 'axios';

export const freteApi = axios.create({
  baseURL: 'http://localhost:4000',
});