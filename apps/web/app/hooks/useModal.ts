import { useState, useCallback } from 'react';

export const useModal = () => {
    const [modal, setModal] = useState<string>('');

    const openModal = useCallback((idModal: string) => setModal(idModal), []);

    const closeModal = () => setModal('');

    return { modal, openModal, closeModal };
};
