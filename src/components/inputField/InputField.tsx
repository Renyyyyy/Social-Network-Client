import React from 'react';
import './InputField.css';

interface InputFieldProps {
    type: 'text' | 'login' | 'password';
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    type,
    label,
    placeholder,
    value,
    onChange,
    error,
    required = false
}) => {
    return (
        <div className="input-container">
            <label className="input-label">
                {label}
                {required && <span className="required">*</span>}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className={`input-field ${error ? 'error' : ''}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default InputField;