import React, { useEffect, useState } from 'react';
import './AuthChecker.css';
import LoginForm from '../loginForm/LoginForm';
import { pingBackend } from '../../../api/api';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import RegistrationForm from '../registartionForm/RegistrationForm';
import { checkAuth } from '../../../store/thunks/thunksAuth';

interface AuthCheckerProps {
  form?: 'login' | 'registration';
}

const AuthChecker: React.FC<AuthCheckerProps> = ({ form = 'login' }) => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [activeForm, setActiveForm] = useState<'login' | 'registration'>(form);
  const { isAuthenticated, status: authStatus, user } = useAppSelector(state => state.auth);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("AuthChecker: Dispatching checkAuth");
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    console.log(`AuthChecker: Location changed to ${location.pathname}`);
    if (location.pathname === '/login') {
      setActiveForm('login');
    } else if (location.pathname === '/registration') {
      setActiveForm('registration');
    }
  }, [location]);

  useEffect(() => {
    const checkBackend = async () => {
        try {
            console.log("AuthChecker: Checking backend connection");
            await pingBackend();
            setStatus('online');
        } catch (error) {
            console.error('Бэкенд недоступен', error);
            setStatus('offline');
        }
    };

    checkBackend();
  }, []);

  useEffect(() => {
    console.log(`AuthChecker: Authentication status - 
      isAuthenticated: ${isAuthenticated}, 
      authStatus: ${authStatus}, 
      user: ${user ? user.id : 'null'}`);
  }, [isAuthenticated, authStatus, user]);

  const handleFormSwitch = (newForm: 'login' | 'registration') => {
    setActiveForm(newForm);
    navigate(newForm === 'login' ? '/login' : '/registration');
  };

  if (status === 'offline') {
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
  }

  if (status === 'checking' || authStatus === 'loading') {
    return (
      <div className="status-message">
        <div className="loader"></div>
        <p>Проверка соединения с сервером...</p>
      </div>
    );
  }

  // if (isAuthenticated) {
  //   console.log(`AuthChecker: User authenticated, rendering Outlet for ${location.pathname}`);
  //   return <Outlet />;
  // }

  console.log(`AuthChecker: Rendering ${activeForm} form for ${location.pathname}`);
  return (
    <div className="auth-checker-container">
      {activeForm === 'login' ? (
        <LoginForm onSignUpClick={() => handleFormSwitch('registration')} />
      ) : (
        <RegistrationForm onBackToLogin={() => handleFormSwitch('login')} />
      )}
    </div>
  );
};

export default AuthChecker;