const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define and import helper functions/constants
const { JWT_SECRET } = require('../utils/config');

const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');

const sendUser = (res, user) => res.send({ data: user });

// POST /signup
const createUser = (req, res, next) => {
  const { email, password } = req.body;

  // First, check to make sure email is unique
  // Gotta figure out how to return 409 for duplicate email instead of general 400 Bad request
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(`Email already exists: ${email}.`);
      } else {
        return bcrypt.hash(password, 10)
      }
    })
    .then((hash) => User.create({
      email,
      password: hash
    }))
    .then((user) => {
      res.status(201).send({
        data: {
        _id: user._id,
        email: user.email,
        }
      })
    })
    .catch(next);
};

// POST /signin
const login = (req, res, next) => {
  console.log(req)
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({
        data: {
          _id: user._id,
          email: user.email,
        },
        token
      });
    })
    .catch(next);
}

// GET /users -- deprecated from around-express
// const getUsers = (req, res, next) => {
//   User.find({})
//     .orFail(() => next(new NotFoundError('No users available')))
//     .then((user) => sendUser(res, user))
//     .catch(next);
// };

const getProfile = (req, res, next) => {
  User.findById(req.params._id)
    .orFail(() => new NotFoundError(`No user found with this id: '${req.params.id}'`))
    .then((user) => sendUser(res, user))
    .catch(next);
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
    .catch(next);
};

const updateProfile = (req, res, next) => {
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
    .catch(next);
};

module.exports = {
  createUser,
  getProfile,
  login,
  updateAvatar,
  updateProfile,
};
