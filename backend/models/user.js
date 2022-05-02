const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const BadRequestError = require('../errors/bad-request-err');

const userSchema = new mongoose.Schema({
  // email, string from 3 256, required field
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 256,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} is not a valid email format`,
    },
  },

  // password, string from 8 to 16 characters, required field
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },

  // username, string from 2 to 30 characters, optional field
  name: {
    type: String,
    default: 'Jacques Cousteau',
    required: false,
    minlength: 2,
    maxlength: 30,
  },

  // user information, string from 2 to 30 characters, optional field
  about: {
    type: String,
    default: 'Explorer',
    required: false,
    minlength: 2,
    maxlength: 30,
  },

  // link to the avatar, string, optional field
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    required: false,
    validate: {
      validator: validator.isURL,
      message: (props) => `${props.value} is not a valid link`,
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      // If email doesn't match,
      if (!user) {
        throw new BadRequestError('Incorrect email or password');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          // or if the password doesn't match, send ambiguous error.
          if (!matched) {
            throw new BadRequestError('Incorrect email or password');
          }
          // Otherwise return user object
          return user.removePass();
        });
    });
};

// Define removePass method to remove password before turning obj
userSchema.methods.removePass = function removePass() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('user', userSchema);
