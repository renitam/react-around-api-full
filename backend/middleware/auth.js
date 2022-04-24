const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (res, req, next) => {
  // get bearer token from header
  const { authorization } = req.headers;

  // make sure the header exists and has valid token
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(UnauthorizedError('Authorization Required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(UnauthorizedError('Authorization Required'));
  }
  
  // assign payload w/ _id to req object to send to next middleware
  req.user = payload;
  next();
};