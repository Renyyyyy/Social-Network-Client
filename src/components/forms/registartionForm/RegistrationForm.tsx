import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';
import Button from '../../common/button/Button';
import Card from '../../common/card/Card';
import InputField from '../../common/inputField/InputField';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectAuthStatus, selectAuthError, registerUser, selectAuthToken } from '../../../store/slices/authSlice';

interface RegistrationFormProps {
  onBackToLogin?: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onBackToLogin }) => {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const status = useAppSelector(selectAuthStatus);
    const error = useAppSelector(selectAuthError);
    const token = useAppSelector(selectAuthToken);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerUser({ name, login, password }));
    };

    useEffect(() => {
        if (status === 'succeeded' && token) {
            localStorage.setItem('accessToken', token);
            navigate('/users');
        }
    }, [status, token, navigate]);

    return (
        <Card className="registration-card">
            <h2 className="registration-title">Регистрация</h2>
            
            {status === 'failed' && error && (
                <div className="error-message">{error}</div>
            )}
            
            <form onSubmit={handleSubmit} className="registration-form">
                <InputField
                    type="text"
                    label="Name"
                    placeholder="Your name"
                    value={name}
                    onChange={setName}
                    required
                />

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
                
                <Button
                    type="submit"
                    isLoading={status === 'loading'}
                    disabled={!name || !login || !password}
                >
                    Зарегистрироваться
                </Button>
            </form>

            <div className="registration-footer">
                <p className="footer-text">
                    Уже есть аккаунт?{' '}
                    <button 
                        type="button"
                        className="back-to-login-link"
                        onClick={onBackToLogin}
                    >
                        Войти
                    </button>
                </p>
            </div>
        </Card>
    );
};

export default RegistrationForm;