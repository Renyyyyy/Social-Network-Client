import React, { useState } from 'react';
import './LoginForm.css';
import Card from '../../common/card/Card';
import Button from '../../common/button/Button';
import Checkbox from '../../common/checkbox/Checkbox';
import InputField from '../../common/inputField/InputField';

interface LoginFormProps {
  onSignUpClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSignUpClick }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        setTimeout(() => setIsLoading(false), 2000);
    };

    const handleSignUp = (e: React.MouseEvent) => {
        e.preventDefault();
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
                    label="Password"
                    placeholder="••••••••"
                    value={password}
                    onChange={setPassword}
                    required
                />
                
                <div className="login-options">
                  <Checkbox
                      id="remember-me"
                      label="Remember me"
                      checked={rememberMe}
                      onChange={setRememberMe}
                  />
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
                    <button 
                        type="button"
                        className="signup-link"
                        onClick={onSignUpClick} // Используем пропс
                    >
                        Зарегистрироваться
                    </button>
                </p>
            </div>
        </Card>
    );
};

export default LoginForm;