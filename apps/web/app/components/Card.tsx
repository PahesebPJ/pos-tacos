import React from 'react';
import { FaXmark } from 'react-icons/fa6';
import cardStyle from '@/app/styles/card.module.css';

interface propCard {
    children?: React.ReactNode;
    title?: string;
    isActiveModal?: boolean;
    className?: string;
    close?: (e: React.MouseEvent) => void;
}

const Card = ({
    children,
    title,
    close,
    isActiveModal,
    className,
}: propCard) => {
    if (isActiveModal === undefined) {
        return (
            <div className={`${cardStyle.card_container}`}>
                <header className={cardStyle.card_header}>
                    <h1 className={`${cardStyle.title} ${className || ''}`}>
                        {title}
                    </h1>
                </header>
                <div className={`${className || ''}`}>{children}</div>
            </div>
        );
    }

    return (
        <div
            className={`${cardStyle.card_container} ${cardStyle.card_container_close} 
            ${isActiveModal ? cardStyle.card_container_open : ''}`}
        >
            <header className={cardStyle.card_header}>
                <h1 className={`${cardStyle.title} ${className || ''}`}>
                    {title}
                </h1>
                <button onClick={close} className={cardStyle.button_close}>
                    <FaXmark />
                </button>
            </header>
            <div className={`${className || ''}`}>{children}</div>
        </div>
    );
};

export default Card;
