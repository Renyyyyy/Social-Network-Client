import React, { useEffect } from 'react';
import { pingBackend } from './api/api';

const App = () => {
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const result = await pingBackend();
        console.log('Ответ от бэкенда:', result);
      } catch (error) {
        console.error('Бэкенд недоступен', error);
      }
    };

    checkBackend();
  }, []);

  return <div>React Frontend</div>;
};

export default App;