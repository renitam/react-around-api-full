const { ObjectId } = require('mongoose').Types;
const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

// validation helper functions
const validURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.message(`${value} is not a valid email.`);
};

const validId = (value, helpers) => {
  if (ObjectId.isValid(value)) {
    return value;
  }
  return helpers.message(`${value} is not a valid card ID.`);
};

// app endpoint validations
const validateUser = celebrate({
  body: {
    email: Joi.string().required().custom(validEmail),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Password must be at least 8 characters',
      'string.empty': 'Please enter a password',
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot have more than 30 characters',
      'string.empty': 'Please enter a name',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'About must be at least 2 characters',
      'string.max': 'About cannot have more than 30 characters',
      'string.empty': 'Please enter an about title',
    }),
    avatar: Joi.string().custom(validURL),
  },
});

const validateLogin = celebrate({
  body: {
    email: Joi.string().required().email()
      .message('The "email" field must be a valid email')
      .messages({
        'string.empty': 'The "email" field must be filled in',
      }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Password must be at least 8 characters',
      'string.empty': 'The "password" field must be filled in',
    }),
  },
});

// user router validations
const validateProfile = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name cannot have more than 30 characters',
        'string.empty': 'Please enter a name.',
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'About must be at least 2 characters',
        'string.max': 'About cannot have more than 30 characters',
        'string.empty': 'Please enter an about title.',
      }),
  },
});

const validateAvatar = celebrate({
  body: {
    avatar: Joi.string().required().custom(validURL),
  },
});

const validateCard = celebrate({
  body: {
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'The name field needs at least 2 characters',
      'string.max': 'The maximum length of the name field is 30 characters',
      'string.empty': 'The name field is empty',
    }),
    link: Joi.string().custom(validURL),
  },
});

const validateCardId = celebrate({
  params: {
    cardId: Joi.string().required().custom(validId),
  },
});

const validateHeader = celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string().required().messages({
      'string.empty': 'Authorization required',
    }),
  }).unknown(true),
});

module.exports = {
  validateUser,
  validateLogin,
  validateProfile,
  validateAvatar,
  validateCard,
  validateCardId,
  validateHeader,
};