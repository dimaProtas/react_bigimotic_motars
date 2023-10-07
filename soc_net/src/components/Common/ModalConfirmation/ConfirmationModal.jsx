import React from "react";
import s from './ConfirmationModal.module.css';

const ConfirmationModal = ({ message, onCancel, onConfirm }) => {
    return (
        <div className={s.modalOverlay}>
            <div className={s.modalContent}>
                <p className={s.message}>{message}</p>
                <button onClick={onCancel}>Отмена</button>
                <button onClick={onConfirm}>Подтвердить</button>
            </div>
        </div>
    );
}

export default ConfirmationModal;
