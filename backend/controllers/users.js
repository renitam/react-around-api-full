const User = require('../models/user');
const bcrypt = require('bcryptjs')

// Define and import helper functions
const { serverError } = require('../utils/utils');
const sendUser = (res, user) => res.send({ data: user });

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => User.create({ 
      name, 
      about, 
      avatar, 
      email, 
      password: hash 
    }))
    .orFail(() => {
      const error = new Error('Failed to create user. Check for duplicates and try again.');
      error.name = 'CastError';
      throw error;
    })
    .then((user) => { 
      res.status(201).send({
        data: {
        _id: user._id,
        email: user.email,
        }
      })
    })
    .catch((err) => serverError(res, err))
};

const getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error('No users available');
      error.name = 'ResourceError';
      throw error;
    })
    .then((user) => sendUser(res, user))
    .catch((err) => serverError(res, err));
};

const getProfile = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error(`No user found with this id: '${req.params.id}'`);
      error.name = 'ResourceError';
      throw error;
    })
    .then((user) => sendUser(res, user))
    .catch((err) => serverError(res, err));
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      // If email doesn't match, send ambiguous error.
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      // If the password doesn't match, send ambiguous error.
      if (!matched) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    })
}

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.params.id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      const error = new Error(`No user found with this id: '${req.params.id}'`);
      error.name = 'ResourceError';
      throw error;
    })
    .then((user) => sendUser(res, user))
    .catch((err) => serverError(res, err));
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
    .orFail(() => {
      const error = new Error(`No user found with this id: '${req.params.id}'`);
      error.name = 'ResourceError';
      throw error;
    })
    .then((user) => sendUser(res, user))
    .catch((err) => serverError(res, err));
};

module.exports = {  
  createUser,
  getProfile,
  getUsers,
  login,
  updateAvatar,
  updateProfile,
};
