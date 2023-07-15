import React from 'react';
import PopupWithForm from './PopupWithForm';

const DeletePopup = ({ isOpen, onClose, card, onCardDelete, handleExternalClick }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onCardDelete(card._id);
    onClose();
  }
  return (
    <PopupWithForm
      name="delete_card"
      title="¿Estás seguro?"
      card={card}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      handleExternalClick={handleExternalClick}
    />
  );
}

export default DeletePopup;