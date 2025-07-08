import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import Card from '../../common/card/Card';
import Button from '../../common/button/Button';
import Checkbox from '../../common/checkbox/Checkbox';
import InputField from '../../common/inputField/InputField';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectAuthStatus, selectAuthError, selectCurrentUser } from '../../../store/slices/authSlice';
import { loginUser } from '../../../store/thunks/thunksAuth';

interface LoginFormProps {
  onSignUpClick?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSignUpClick }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useAppDispatch();
    
    const user = useAppSelector(selectCurrentUser);
    const status = useAppSelector(selectAuthStatus);
    const error = useAppSelector(selectAuthError);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ login, password }));
    };

    return (
        <Card className="login-card">
            <h2 className="login-title">Авторизация</h2>
      
            {status === 'failed' && error && (
                <div className="error-message">{error}</div>
            )}
            
            <form onSubmit={handleSubmit} className="login-form">
                <InputField
                    type="text"
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
                    isLoading={status === 'loading'}
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
                        onClick={onSignUpClick}
                    >
                        Зарегистрироваться
                    </button>
                </p>
            </div>
        </Card>
    );
};

export default LoginForm;