import React, { useEffect, useState } from 'react';
import { pingBackend } from './api/api';
import './App.css';
import LoginForm from './components/loginForm/LoginForm';

const App = () => {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const result = await pingBackend();
        console.log('Ответ от бэкенда:', result);
        setBackendStatus('online');
        setShowLogin(true);
      } catch (error) {
        console.error('Бэкенд недоступен', error);
        setBackendStatus('offline');
      }
    };

    checkBackend();
  }, []);

  const renderStatusMessage = () => {
    switch (backendStatus) {
      case 'checking':
        return (
          <div className="status-message">
            <div className="loader"></div>
            <p>Проверка соединения с сервером...</p>
          </div>
        );
      case 'online':
        return showLogin && <LoginForm />;
      case 'offline':
        return (
          <div className="status-message error">
            <h3>Ошибка соединения</h3>
            <p>Сервер недоступен. Пожалуйста, попробуйте позже.</p>
            <button 
              className="retry-button" 
              onClick={() => window.location.reload()}
            >
              Попробовать снова
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {renderStatusMessage()}
    </div>
  );
};

export default App;