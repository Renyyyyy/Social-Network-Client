import React, { useEffect, useState } from 'react';
import './AuthChecker.css';
import LoginForm from '../loginForm/LoginForm';
import { pingBackend } from '../../../api/api';
import { useLocation, useNavigate } from 'react-router-dom';
import RegistrationForm from '../registartionForm/RegistrationForm';
import { useAppDispatch } from '../../../store/hooks';
import { checkAuth } from '../../../store/slices/authSlice';

interface AuthCheckerProps {
  form?: 'login' | 'registration';
}

const AuthChecker: React.FC<AuthCheckerProps> = ({ form = 'login' }) => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [activeForm, setActiveForm] = useState<'login' | 'registration'>(form);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === '/login') {
      setActiveForm('login');
    } else if (location.pathname === '/registration') {
      setActiveForm('registration');
    }
  }, [location]);

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

  const handleFormSwitch = (newForm: 'login' | 'registration') => {
    setActiveForm(newForm);
    navigate(newForm === 'login' ? '/login' : '/registration');
  };

  return (
     <div className="auth-checker-container">
      {status === 'checking' && (
        <div className="status-message">
          <div className="loader"></div>
          <p>Проверка соединения с сервером...</p>
        </div>
      )}

      {status === 'online' && activeForm === 'login' && (
        <LoginForm onSignUpClick={() => handleFormSwitch('registration')} />
      )}
      
      {status === 'online' && activeForm === 'registration' && (
        <RegistrationForm onBackToLogin={() => handleFormSwitch('login')} />
      )}
      
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
    </div>
  );
};

export default AuthChecker;