const router = require('express').Router();

const {
  getUsers, getProfile, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getProfile);
router.patch('/:id/me', updateProfile);
router.patch('/:id/me/avatar', updateAvatar);




module.exports = router;
