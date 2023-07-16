import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ handleSignOut, email }) {
  const [open, setOpen] = React.useState(false);

  const handleMenu = () => {
    setOpen(!open);
  };

  const onSignOut = () => {
    handleSignOut();
    setOpen(false);
  };

  return (
    <header className={`header ${open && 'header_opened'}`}>
      <img src={logo} alt="Logo de Around the US" className="header__logo" />
      {useMatch('/signin') && (
        <Link to="/signup" className="header__link">
          Regístrate
        </Link>
      )}
      {useMatch('/signup') && (
        <Link to="/signin" className="header__link">
          Inicia sesión
        </Link>
      )}
      {useMatch('/') && (
        <>
          <div
            className={`header__user-info ${
              open && 'header__user-info_opened'
            }`}
          >
            <span className="header__email">{email}</span>
            <button type="submit" className="header__logout" onClick={onSignOut}>
              Cerrar sesión
            </button>
          </div>
          {open ? (
            <button
              aria-label="hamgurger-close"
              type="button"
              onClick={handleMenu}
              className="header__close-icon"
            />
          ) : (
            <button
              aria-label="hamgurger-open"
              type="button"
              onClick={handleMenu}
              className="header__menu-icon"
            />
          )}
        </>
      )}
    </header>
  );
}

export default Header;
