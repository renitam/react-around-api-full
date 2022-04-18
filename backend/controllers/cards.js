const Card = require('../models/card');
const { serverError } = require('../utils/utils');

const sendCard = (res, card) => res.send({ data: card });

// Send all cards in db
const getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const error = new Error('No cards available');
      error.name = 'ResourceError';
      throw error;
    })
    .then((card) => sendCard(res, card))
    .catch((err) => serverError(res, err));
};

// Create card using card name and link
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => sendCard(res, card))
    .catch((err) => serverError(res, err));
};

// Delete card matching req ID
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const error = new Error(`No card found with this id: ${req.params.cardId}`);
      error.name = 'ResourceError';
      throw error;
    })
    .then((card) => sendCard(res, card))
    .catch((err) => serverError(res, err));
};

// like card matching req ID
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error(`No card found with this id: ${req.params.cardId}`);
      error.name = 'ResourceError';
      throw error;
    })
    .then((card) => sendCard(res, card))
    .catch((err) => serverError(res, err));
};

// dislike card matching req ID
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error(`No card found with this id: ${req.params.cardId}`);
      error.name = 'ResourceError';
      throw error;
    })
    .then((card) => sendCard(res, card))
    .catch((err) => serverError(res, err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
