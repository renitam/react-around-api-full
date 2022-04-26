const router = require('express').Router();
const auth = require('../middleware/auth');

const { validateProfile, validateAvatar } = require('../middleware/validation');
const {
  getProfile, updateProfile, updateAvatar,
} = require('../controllers/users');

// GET /users/me - returns profile data when loading page
router.get('/me', getProfile);

// PATCH /users/me - updates profile name and about sections
router.patch('/me', validateProfile, updateProfile);

// PATCH /users/me/avatar - updates avatar url
router.patch('/me/avatar', validateAvatar, updateAvatar);

// router.get('/', getUsers); Deprecated endpoint from around-express


module.exports = router;
