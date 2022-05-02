const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middleware/auth');
const { validateHeader } = require('../middleware/validation');


router.use('/users', validateHeader, auth, userRouter);
router.use('/cards', validateHeader, auth, cardRouter);
router.use((req, res, next) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

module.exports = router;
