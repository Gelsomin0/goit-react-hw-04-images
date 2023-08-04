import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ handleModalEventListener, closeModalByClick, imageURL }) => {
    useEffect(() => {
        handleModalEventListener();
    });
    
    return (
        <div
            onClick={closeModalByClick}
            className={css.overlay}
        >
            <div className={css.modal}>
                <img className={css.image} src={imageURL} alt="" />
            </div>
        </div>
    );
}

Modal.propTypes = {
    handleModalEventListener: PropTypes.func.isRequired,
    closeModalByClick: PropTypes.func.isRequired,
    imageURL: PropTypes.string.isRequired,
}