const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ServerError = require('../errors/server-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const BadRequestError = require('../errors/bad-request-err');

const sendCard = (res, card) => res.send({ data: card });

// Send all cards in db
const getCards = (req, res, next) => {
  Card.find({})
    .orFail(() => new NotFoundError('No cards available'))
    .then((card) => sendCard(res, card))
    .catch((err) => next(new ServerError(`An error has occurred on the server. ${err}`)));
};

// Create card using card name and link
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => sendCard(res, card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(`${err.message}`))
      } else {
        next(new ServerError(`An error has occurred on the server. ${err}`));
      }
    });
};

// Delete card matching req ID
const deleteCard = (req, res, next) => {
  const { id } = req.params.cardId;
  Card.findById(id)
    .orFail(() => next(new NotFoundError(`No card found with this id: ${req.params.cardId}`)))
    .then((card) => {
      // If the requester doesn't own the card, reject request
      if (req.user._id !== card.owner._id) {
        return next(new UnauthorizedError('You cannot delete a card you don\'t own'))
      // Otherwise, delete the card and return the result.
      } else {
        Card.deleteOne(card)
          .then((card) => sendCard(res, card))
      }
    })
    .catch((err) => next(new ServerError(`An error has occurred on the server. ${err}`)));
};

// like card matching req ID
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => next(new NotFoundError(`No card found with this id: ${req.params.cardId}`)))
    .then((card) => sendCard(res, card))
    .catch((err) => next(new ServerError(`An error has occurred on the server. ${err}`)));
};

// dislike card matching req ID
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => next(new NotFoundError(`No card found with this id: ${req.params.cardId}`)))
    .then((card) => sendCard(res, card))
    .catch((err) => next(new ServerError(`An error has occurred on the server. ${err}`)));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
