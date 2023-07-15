import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import DeletePopup from './DeletePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';
import {Route, Routes, useNavigate} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isCardOpen, setIsCardOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [token, setToken] = React.useState('');

  const navigate = useNavigate();

  const onEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const onAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const onEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const onDeleteCardClick = (card) => {
    setSelectedCard(card);
    setIsDeletePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsCardOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsCardOpen(false);
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked, token).then((newCard) => {
      setCards((state) =>
        state.map((c) => (c._id === card._id ? newCard.data : c))
      );
    });
  };

  const handleCardDelete = (cardId) => {
    api.deleteCard(
      cardId,
      () => setCards((state) => state.filter((c) => c._id !== cardId)),
      token
    );
  };

  const handleUpdateUser = ({name, about}) => {
    api
      .editProfile({name, about}, token)
      .then((data) =>
        setCurrentUser({
          ...currentUser,
          name: data.data.name,
          about: data.data.about,
        })
      );
  };
  
  const handleUpdateAvatar = (link) => {
    api
      .editAvatar(link, token)
      .then((data) =>
        setCurrentUser({...currentUser, avatar: data.data.avatar})
      );
  };

  const handleAddPlaceSubmit = ({ title, link }) => {
    api.postCard({ title, link }, token).then((newCard) => {
      setCards([...cards, newCard.data]);
    });
  };

  const handleExternalClick = (event) => {
    if (event.target.classList.contains('popup')) {
      closeAllPopups();
    }
  };

  const handleKeyPress = React.useCallback((e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setEmail('');
    setLoggedIn(false);
  };

  React.useEffect(() => {
    const handleTokenCheck = () => {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        setToken(jwt);
        auth
          .checkToken(jwt)
          .then((res) => {
            if (res.data) {
              setEmail(res.data.email);
              setLoggedIn(true);
              navigate('/');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    handleTokenCheck();
  }, [loggedIn, navigate]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  React.useEffect(() => {
    if(token) {
      api.getUserInfo(token).then((data) => {
        setCurrentUser(data.data);
      });
    }
  }, [token]);

  React.useEffect(() => {
   if (token) {
     api.getInitialCards(token).then((data) => {
       setCards(data.data);
     });
   }
  }, [token]);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header handleSignOut={handleSignOut} email={email} />

          <Routes>
            <Route
              path="/"
              exact
              element={<ProtectedRoute loggedIn={loggedIn} />}>
              <Route
                path="/"
                element={
                  <Main
                    onEditProfile={onEditProfileClick}
                    onAddPlace={onAddPlaceClick}
                    onEditAvatar={onEditAvatarClick}
                    onDeleteCard={onDeleteCardClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    cards={cards}
                  />
                }
              />
            </Route>
            <Route exact path="/signup" element={<Register />} />
            <Route
              exact
              path="/signin"
              element={<Login handleLogin={handleLogin} />}
            />
          </Routes>

          <InfoTooltip />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            handleExternalClick={handleExternalClick}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            handleExternalClick={handleExternalClick}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            handleExternalClick={handleExternalClick}
          />

          <DeletePopup
            card={selectedCard}
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            handleExternalClick={handleExternalClick}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isCardOpen}
            onClose={closeAllPopups}
            handleExternalClick={handleExternalClick}
          />

          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
