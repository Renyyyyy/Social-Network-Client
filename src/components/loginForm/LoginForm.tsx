// components/LoginForm/LoginForm.tsx
import React, { useState } from 'react';
import './LoginForm.css';
import Button from '../button/Button';
import Card from '../card/Card';
import Checkbox from '../checkbox/Checkbox';
import InputField from '../inputField/InputField';

const LoginForm: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Card className="login-card">
      <h2 className="login-title">Авторизация</h2>
      
      <form onSubmit={handleSubmit} className="login-form">
        <InputField
          type="login"
          label="Login"
          placeholder="login"
          value={login}
          onChange={setLogin}
          required
        />
        
        <InputField
          type="password"
          label="Пароль"
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          required
        />
        
        <div className="login-options">
          <Checkbox
            id="remember-me"
            label="Запомнить меня"
            checked={rememberMe}
            onChange={setRememberMe}
          />
          
          <a 
            href="#" 
            className="forgot-password"
            onClick={(e) => e.preventDefault()}
          >
            Забыли пароль?
          </a>
        </div>
        
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={!login || !password}
        >
          Войти
        </Button>
      </form>
      
      <div className="login-footer">
        <p className="footer-text">
          Ещё нет аккаунта?{' '}
          <a 
            href="#" 
            className="signup-link"
            onClick={(e) => e.preventDefault()}
          >
            Зарегистрироваться
          </a>
        </p>
      </div>
    </Card>
  );
};

export default LoginForm;