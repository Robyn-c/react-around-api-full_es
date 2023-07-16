import React from 'react';

function ImagePopup({
  isOpen, onClose, card,
}) {
  return (
    <section
      className={`popup popup_preview_image ${isOpen ? 'popup_opened' : ''}`}
    >
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
          onClick={onClose}
          aria-label="close-button"
        />
      </div>
    </section>
  );
}

export default ImagePopup;
