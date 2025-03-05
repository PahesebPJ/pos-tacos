import ReactDOM from 'react-dom';
import modalStyle from '../styles/modal.module.css';

interface propsModal {
    children?: React.ReactNode;
    open: boolean | undefined;
}

const Modal = ({ open, children }: propsModal) => {
    const root = document.getElementById('root');

    if (!root) return null;

    return ReactDOM.createPortal(
        <div
            className={`${open ? modalStyle.modal_container : modalStyle.modal_container_close}`}
        >
            {children}
        </div>,
        root
    );
};

export default Modal;
