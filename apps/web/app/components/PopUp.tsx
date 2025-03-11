import React from 'react';
import ReactDOM from 'react-dom';
import stylePopup from '@/app/styles/popUp.module.css';

interface propsPopUp {
    text: string;
    icon?: React.ReactNode;
    backGround?: string;
    textColor?: string;
    colorIcon?: string;
    type: string;
    popupId: string | null;
}

const PopUp = ({
    text,
    icon,
    backGround,
    textColor,
    colorIcon,
    type,
    popupId,
}: propsPopUp) => {
    const popUpContainer = document.getElementById('popup');

    if (!popUpContainer) return null;

    return ReactDOM.createPortal(
        <div
            style={{ background: backGround }}
            className={`${stylePopup.popup} ${type === popupId ? stylePopup.open : ''}`}
        >
            <h1
                style={{ color: textColor }}
                className={`${stylePopup.text_center}`}
            >
                {text}
            </h1>
            {icon && (
                <div
                    style={{ color: colorIcon }}
                    className={`${stylePopup.flex}`}
                >
                    {icon}
                </div>
            )}
        </div>,
        popUpContainer
    );
};

export default PopUp;
