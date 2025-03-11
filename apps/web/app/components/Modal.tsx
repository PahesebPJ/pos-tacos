import ReactDOM from 'react-dom';
import modalStyle from '../styles/modal.module.css';

interface propsModal {
    children?: React.ReactNode;
    idModal: string;
    name: string;
}

const Modal = ({ idModal, name, children }: propsModal) => {
    const root = document.getElementById('root');

    if (!root) return null;

    return ReactDOM.createPortal(
        <div
            className={`${modalStyle.modal_container} ${name === idModal ? modalStyle.modal_container_open : ''}`}
        >
            {children}
        </div>,
        root
    );
};

export default Modal;
