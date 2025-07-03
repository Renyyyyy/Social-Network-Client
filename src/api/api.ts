import axios from 'axios';

const API_URL = 'http://localhost:7000/api'; 

export const pingBackend = async () => {
  try {
    const response = await axios.get(`${API_URL}/health/ping`);
    return response.data;
  } catch (error) {
    console.error('Ошибка подключения к бэкенду:', error);
    throw error;
  }
};


export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  }
);
