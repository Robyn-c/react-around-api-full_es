const jwt = require('jsonwebtoken');

const secretKey = 'yourRandomJWTSecretHere';

const handleAuthError = (res) => {
  res.status(401).send({ message: 'Error de autorización' });
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      secretKey,
    );
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};
