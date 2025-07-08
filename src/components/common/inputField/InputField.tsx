import React from 'react';
import './InputField.css';

interface InputFieldProps {
    type: 'text' | 'password' | 'textarea';
    label?: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    type,
    label,
    placeholder,
    value,
    onChange,
    error,
    required = false,
    disabled = false
}) => {
    return (
        <div className="input-container">
            {label && (
                <label className="input-label">
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}
            
            {type === 'textarea' ? (
                <textarea
                    placeholder={placeholder}
                    className={`input-field ${error ? 'error' : ''}`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    rows={4}
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`input-field ${error ? 'error' : ''}`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled} 
                />
            )}
            
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default InputField;