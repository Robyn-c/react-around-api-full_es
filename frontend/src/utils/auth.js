import API_BASE_URL from './config';

export const register = (password, email) => fetch(`${API_BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then((res) => res.json())
  .catch((err) => console.log(err));

export const authorize = (password, email) => fetch(`${API_BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then((res) => res.json())
  .then((data) => {
    if (data.token) {
      localStorage.setItem('jwt', data.token);
      return data;
    }
    throw new Error('Token not found');
  })
  .catch((err) => {
    console.log(err);
    // Handle the error or throw it again if necessary
    throw err;
  });

export const checkToken = (token) => fetch(`${API_BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}).then((res) => res.json());
