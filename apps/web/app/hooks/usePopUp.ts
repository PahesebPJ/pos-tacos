import { useCallback, useEffect, useState } from 'react';

export const usePopUp = (seconds?: number) => {
    const [popup, setPopup] = useState<string | null>(null);

    const openPopUp = useCallback((type: string) => {
        setPopup(type);
    }, []);

    useEffect(() => {
        if (popup) {
            const timeoutId = setTimeout(() => {
                setPopup(null);
            }, seconds || 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [popup, seconds]);

    return { popup, openPopUp };
};
