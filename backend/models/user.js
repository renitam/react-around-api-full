const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  // email, string from 3 256, required field
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 256,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Wrong email format',
    },
  },

  // password, string from 8 to 16 characters, required field
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 16,
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
    default: 'https://www.hollywoodreporter.com/wp-content/uploads/2019/03/avatar-publicity_still-h_2019.jpg?w=1024',
    required: false,
    validate: {
      validator: (link) => /(http|https):\/\/(w{3})?[\w\d._\-~:/?%#[\]@!$&'()*+,;=]+\.[\w\d]{1,}([\w\d._\-~:/?%#[\]@!$&'()*+,;=]+\/)*#?/.test(link),
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
