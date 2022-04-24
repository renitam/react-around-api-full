const router = require('express').Router();
const auth = require('../middleware/auth')

const {
  getUsers, getProfile, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/:id', getProfile);
router.patch('/:id/me', updateProfile);
router.patch('/:id/me/avatar', updateAvatar);
router.get('/users', getUsers);
router.get('/users/me', auth);

module.exports = router;
