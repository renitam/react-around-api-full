const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define and import helper functions/constants
const { JWT_SECRET } = require('../utils/config');
const { serverError } = require('../utils/errors');

const UnauthorizedError = require('../errors/unauthorized-err');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ServerError = require('../errors/server-err');

const sendUser = (res, user) => res.send({ data: user });

// POST /signup
const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => User.create({ 
      name, 
      about, 
      avatar, 
      email, 
      password: hash 
    }))
    .orFail(() => next(new BadRequestError('Failed to create user. Check for duplicates and try again')))
    .then((user) => { 
      res.status(201).send({
        data: {
        _id: user._id,
        email: user.email,
        }
      })
    })
    .catch((err) => next(new ServerError(`An error has occurred on the server. ${err}`)));
};

// POST /signin
const login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id }, 
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ data: user.toJSON(), token });
    })
    .catch((err) => next(new UnauthorizedError(`Incorrect email or password: ${err}`)));
}

// GET /users
const getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => next(new NotFoundError('No users available')))
    .then((user) => sendUser(res, user))
    .catch((err) => next(new ServerError(`An error has occurred on the server. ${err}`)));
};

const getProfile = (req, res) => {
  User.findById(req.params._id)
    .orFail(() => next(new NotFoundError(`No user found with this id: '${req.params.id}'`)))
    .then((user) => sendUser(res, user))
    .catch((err) => next(new ServerError(`An error has occurred on the server. ${err}`)));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.params._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => next(new NotFoundError(`No user found with this id: '${req.params._id}'`)))
    .then((user) => sendUser(res, user))
    .catch((err) => next(new ServerError(`An error has occurred on the server. ${err}`)));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.params._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => next(new NotFoundError(`No user found with this id: '${req.params._id}'`)))
    .then((user) => sendUser(res, user))
    .catch((err) => next(new ServerError(`An error has occurred on the server. ${err}`)));
};

module.exports = {  
  createUser,
  getProfile,
  getUsers,
  login,
  updateAvatar,
  updateProfile,
};
