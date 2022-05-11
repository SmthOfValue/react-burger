import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Typography, Box, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const modalsContainer = document.getElementById('modals');

const Modal = ({ title, onCloseClick, children }) => {

    const handleEscKeydown = (event) => {
        event.key === "Escape" && onCloseClick();
    };

    useEffect(() => {
        document.addEventListener('keydown', handleEscKeydown);
    
        return () => {
          document.removeEventListener('keydown', handleEscKeydown);
        };
      }, []);

    return ReactDOM.createPortal(
        <>
            <div className={modalStyles.window}>
                <div className={`pl-10 pr-10 pt-10 ${modalStyles.title}`}>
                    <h3 className='text text_type_main-large'>{title}</h3>
                    <span className={modalStyles.icon}>
                        <CloseIcon onClick={onCloseClick} type="primary" />
                    </span>
                </div>
                {children} 
            </div>
            <ModalOverlay onClick={onCloseClick} />
        </>,
        modalsContainer
      );
};

Modal.propTypes = {
    title: PropTypes.string,
    onCloseClick: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}

export default Modal;