import React, { useState } from 'react';
import './RegistartionForm.css';
import Button from '../../common/button/Button';
import Card from '../../common/card/Card';
import InputField from '../../common/inputField/InputField';


interface RegistartionFormProps {
  onBackToLogin: () => void;
}

const RegistartionForm: React.FC<RegistartionFormProps> = ({ onBackToLogin }) => {
    const [nickname, setNickname] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
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
        <Card className="registartion-card">
            <h2 className="registartion-title">Регистрация</h2>
            
            <form onSubmit={handleSubmit} className="registartion-form">
                <InputField
                    type="nickname"
                    label="Nickname"
                    placeholder="nickname"
                    value={nickname}
                    onChange={setNickname}
                    required
                />

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
                
                
                <Button
                    type="submit"
                    isLoading={isLoading}
                    disabled={!nickname || !login || !password}
                >
                    Зарегистрироваться
                </Button>
            </form>

             <div className="registartion-footer">
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

export default RegistartionForm;