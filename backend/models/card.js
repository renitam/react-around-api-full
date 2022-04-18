const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  // card name, string from 2 to 30 characters, required field
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  // link to the picture, string, required field. Use the regex to validate links
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => /(http|https):\/\/(w{3})?[\w\d._\-~:/?%#[\]@!$&'()*+,;=]+\.[\w\d]{1,}([\w\d._\-~:/?%#[\]@!$&'()*+,;=]+\/)*#?/.test(link),
      message: (props) => `${props.value} is not a valid link!`,
    },
  },

  // link to the card author's model, ObjectId type, required field -- subdocument
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  // list of users who liked the card, user population array
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],

  // creation date, Date type, default value Date.now
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
