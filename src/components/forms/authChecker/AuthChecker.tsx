import React, { useEffect, useState } from 'react';
import './AuthChecker.css';
import LoginForm from '../loginForm/LoginForm';
import { pingBackend } from '../../../api/api';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import RegistrationForm from '../registartionForm/RegistrationForm';
import { checkAuth } from '../../../store/thunks/thunksAuth';
import { User } from '../../../store/slices/usersSlice';

interface AuthCheckerProps {
  form?: 'login' | 'registration';
}

const AuthChecker: React.FC<AuthCheckerProps> = ({ form = 'login' }) => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [activeForm, setActiveForm] = useState<'login' | 'registration'>(form);
  const { isAuthenticated, status: authStatus} = useAppSelector(state => state.auth);
  const { user } = useAppSelector(state => state.users);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      const isProfilePage = location.pathname.startsWith('/profile/');
      
      if (!isProfilePage) {
        const userId = user?.id || localStorage.getItem('currUserId');
        if (userId) {
          navigate(`/profile/${userId}`);
        }
      }
    }
  }, [isAuthenticated, navigate, user, location.pathname]);

  useEffect(() => {
    if (!isAuthenticated && activeForm === 'login') {
      navigate('/login');
    }
  }, [activeForm, navigate, isAuthenticated]);

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
            setStatus('offline');
        }
    };

    checkBackend();
  }, []);

  const handleFormSwitch = (newForm: 'login' | 'registration') => {
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