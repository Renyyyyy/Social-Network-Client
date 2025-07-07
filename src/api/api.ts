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
  debugger
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Помечаем запрос как повторный
      
      try {
        const refreshResponse = await axios.get(`${API_URL}/auth/refresh`);
        
        const newToken = refreshResponse.data.accessToken;
        localStorage.setItem('accessToken', newToken);
        
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
