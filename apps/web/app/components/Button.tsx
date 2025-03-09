import React, { ButtonHTMLAttributes } from 'react';
import buttonStyle from '@/app/styles/button.module.css';

interface buttonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
    isFloat?: boolean;
    children: React.ReactNode;
}

const Button = ({ isFloat, children, className, ...props }: buttonProp) => {
    return (
        <button
            {...props}
            className={`${buttonStyle.button} ${isFloat ? buttonStyle.float : ''} ${className || ''}`}
        >
            {children}
        </button>
    );
};

export default Button;
