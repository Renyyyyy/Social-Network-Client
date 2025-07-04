import React from 'react';
import './Button.css';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    isLoading?: boolean | string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    isLoading = false,
    onClick,
    type = 'button',
    disabled = false,
    className = ''
}) => {
    const isActuallyLoading = Boolean(isLoading); 
    
    return (
        <button
            type={type}
            className={`button ${variant} ${isActuallyLoading ? 'loading' : ''} ${className}`}
            onClick={onClick}
            disabled={disabled || isActuallyLoading}
        >
            {isActuallyLoading ? 'Загрузка...' : children}
        </button>
    );
};

export default Button;