import React from 'react';
import './CardEdit.css';

const CardEdit = ({ closeModal, handleEditClick, handleRemoveClick, user }) => {
    return (
        <div className="app" onClick={() => closeModal(false)}>
            <div className="buttons">
                <button onClick={() => handleEditClick(user)}>Editar</button>
            </div>
            <div className="buttons">
                <button onClick={() => handleRemoveClick(user.id)}>Remover</button>
            </div>
        </div>
    );
}

export default CardEdit;
