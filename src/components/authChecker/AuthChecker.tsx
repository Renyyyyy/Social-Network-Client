import React, { useEffect, useState } from 'react';
import { pingBackend } from '../../api/api';
import './AuthChecker.css';
import LoginForm from '../loginForm/LoginForm';

const AuthChecker: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  
  useEffect(() => {
    const checkBackend = async () => {
        try {
            await pingBackend();
            setStatus('online');
        } catch (error) {
            console.error('Бэкенд недоступен', error);
            setStatus('offline');
        }
    };

    checkBackend();
    }, []);

  return (
    <>
      {status === 'checking' && (
        <div className="status-message">
          <div className="loader"></div>
          <p>Проверка соединения с сервером...</p>
        </div>
      )}

      {status === 'online' && <LoginForm />}
      
      {status === 'offline' && (
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
      )}
    </>
  );
};

export default AuthChecker;