const router = require('express').Router();

const { validateCardId, validateCard } = require('../middleware/validation');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCard, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/likes/:cardId', validateCardId, likeCard);
router.delete('/likes/:cardId', validateCardId, dislikeCard);

module.exports = router;
