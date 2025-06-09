import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

export const pingBackend = async () => {
  try {
    const response = await axios.get(`${API_URL}/ping`);
    return response.data;
  } catch (error) {
    console.error('Ошибка подключения к бэкенду:', error);
    throw error;
  }
};