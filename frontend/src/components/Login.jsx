import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';

function Login({ handleLogin }) {
  const [formData, setFormData] = React.useState({});
  const [infoToolOpen, setInfoToolOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCloseInfoTool = () => {
    setInfoToolOpen(false);
    navigate('/signin', { state: {} });
  };

  const onLogin = (e) => {
    const { password, email } = formData;
    e.preventDefault();
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          setFormData({ email: '', password: '' });
          navigate('/');
          handleLogin();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (location.state === 'success') {
      setInfoToolOpen(true);
    }
  }, [location]);

  return (
    <>
      <div className="login">
        <form action="" className="form" onSubmit={onLogin}>
          <h2 className="form__title">Inicia sesión</h2>
          <label htmlFor="email-login" className="form__label">
            <input
              id="email-login"
              type="email"
              className="form__input"
              placeholder="Correo electrónico"
              name="email"
              required
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password-login" className="form__label">
            <input
              id="password-login"
              type="password"
              className="form__input"
              placeholder="Contraseña"
              name="password"
              required
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="form__button">Inicia sesión</button>
          <Link to="/signup" className="form__link">¿Aún no eres miembro? Regístrate aquí</Link>
        </form>
      </div>
      <InfoTooltip
        error={false}
        infoToolOpen={infoToolOpen}
        handleClose={handleCloseInfoTool}
      />
    </>
  );
}

export default Login;
