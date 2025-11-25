const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getAllReviews,
  deleteReview
} = require('../controllers/adminController');

// Admin routes for reviews
router.route('/reviews')
  .get(protect, authorize('admin'), getAllReviews);

router.route('/reviews/:id')
  .delete(protect, authorize('admin'), deleteReview);

module.exports = router;