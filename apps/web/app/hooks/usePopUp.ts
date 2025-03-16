import { useCallback, useEffect, useState } from 'react';

interface propsPopUp {
    text: string;
    icon?: React.ReactNode;
    backGround?: string;
    textColor?: string;
    colorIcon?: string;
    visible: boolean;
}

export const usePopUp = (seconds?: number) => {
    const [popup, setPopup] = useState<propsPopUp>();

    const openPopUp = useCallback((popUpObject: propsPopUp) => {
        setPopup(popUpObject);
    }, []);

    useEffect(() => {
        if (popup?.visible) {
            const timeoutId = setTimeout(() => {
                setPopup({
                    text: popup.text,
                    visible: false,
                    backGround: popup.backGround,
                    colorIcon: popup.colorIcon,
                    icon: popup.icon,
                    textColor: popup.textColor,
                });
            }, seconds || 1000);

            return () => {
                clearTimeout(timeoutId);
                popup.visible = false;
            };
        }
    }, [popup, seconds]);

    return { popup, openPopUp };
};
