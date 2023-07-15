import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const Card = ({ card, onCardClick, onCardLike, onDeleteCard }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn && 'card__delete-button_active'
  }`;

  const isLiked = card.likes.some((id) => id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && 'card__like-button_on'
  }`;

  const handleClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onDeleteCard(card);
  }

  return (
    <>
      <li key={card._id} className="card">
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}></button>
        <img
          src={card.link}
          alt={card.name}
          onClick={handleClick}
          className="card__image"
        />
        <div className="card__information">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like-container">
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}></button>
            <p className="card__like-counter">
              {card.likes ? card.likes.length : 0}
            </p>
          </div>
        </div>
      </li>
    </>
  );
}

export default Card;