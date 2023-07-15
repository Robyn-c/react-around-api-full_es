import React from "react";

const ImagePopup = ({ isOpen, onClose, card, handleExternalClick }) => {
    return (
      <section
        className={`popup popup_preview_image ${isOpen ? 'popup_opened' : ''}`}
        onClick={handleExternalClick}>
        <div className="popup__container popup__container_role-image">
          <figure className="popup__figure">
            <img src={card.link} alt="place" className="popup__image" />
            <figcaption className="popup__caption">
              {card.name}
            </figcaption>
          </figure>
          <button
            type="button"
            className="popup__close-button popup__preview-close-button"
            onClick={onClose}></button>
        </div>
      </section>
    );
}

export default ImagePopup;