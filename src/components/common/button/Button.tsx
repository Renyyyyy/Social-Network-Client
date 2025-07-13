import React from "react";
import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  isLoading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`button ${variant} ${isLoading ? "loading" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Загрузка..." : children}
    </button>
  );
};

export default Button;
