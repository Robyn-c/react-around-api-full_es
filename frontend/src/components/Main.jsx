import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onDeleteCard,
  onCardClick,
  onCardLike,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-wrapper">
            <img
              className="profile__image"
              src={currentUser.avatar}
              alt="profile pic"
            />
            <button
              type="button"
              aria-label="edit-avatar"
              className="profile__avatar-overlay"
              onClick={onEditAvatar}
            />
          </div>
          <div className="profile__information">
            <div className="profile__wrap">
              <h1 className="profile__user">{currentUser.name}</h1>
              <button
                aria-label="edit-button"
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="add-button"
          onClick={onAddPlace}
        />
      </section>

      <section className="cards">
        <ul className="cards__container">
          {cards
              && cards
                .slice()
                .reverse()
                .map((card) => (
                  <Card
                    key={card._id}
                    card={card}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onDeleteCard={onDeleteCard}
                  />
                ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
