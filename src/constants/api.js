import axios from 'axios';

const api = axios.create({
  baseURL: 'https://petlove.b.goit.study/api',
});

export default api;
