import React from 'react';
import PropTypes from 'prop-types';
import modalOverlayStyles from './ModalOverlay.module.css';

const ModalOverlay = ({ onClick }) => {
    return (
        <div className={modalOverlayStyles.overlay} onClick={onClick}></div>
    );
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default ModalOverlay;