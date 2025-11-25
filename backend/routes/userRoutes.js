const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin'), getUsers);

router.route('/profile')
  .put(protect, updateProfile);

router.route('/:id')
  .get(protect, authorize('admin'), getUserById)
  .put(protect, authorize('admin'), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

module.exports = router;