import React, { useEffect, FC } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const modalsContainer = document.getElementById('modals');

interface IModalProps {
    title?: string;
    onCloseClick: () => void;
    children: React.ReactNode;
}

const Modal: FC<IModalProps> = ({ title, onCloseClick, children }) => {

    const handleEscKeydown = (event: KeyboardEvent) => {
        event.key === "Escape" && onCloseClick();
    };

    useEffect(() => {
        document.addEventListener('keydown', handleEscKeydown);
    
        return () => {
          document.removeEventListener('keydown', handleEscKeydown);
        };
      }, []);

    return modalsContainer ? ReactDOM.createPortal(
        <>
            <div className={modalStyles.window}>
                <div className={`pl-10 pr-10 pt-10 ${modalStyles.title}`}>
                    {title &&
                    <h3 className='text text_type_main-large'>{title}</h3>}
                    <span className={modalStyles.icon}>
                        <CloseIcon onClick={onCloseClick} type="primary" />
                    </span>
                </div>
                {children} 
            </div>
            <ModalOverlay onClick={onCloseClick} />
        </>,
        modalsContainer
      ): null;
};

export default Modal;