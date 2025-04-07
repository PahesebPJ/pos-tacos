'use client';

import styles from '@/app/styles/PersonButton.module.css';
import React, { ButtonHTMLAttributes } from 'react';

interface PersonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const PersonButton = ({
    children,
    onClick,
    className,
    ...props
}: PersonButtonProps) => {
    return (
        <button
            {...props}
            onClick={onClick}
            className={`${styles.persons} ${className || ''}`}
        >
            {children}
        </button>
    );
};

export default PersonButton;
