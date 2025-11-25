const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getProductReviews,
  addReview,
  updateReview,
  deleteReview,
  getReviewById
} = require('../controllers/reviewController');

// Public routes
router.route('/product/:productId')
  .get(getProductReviews);

router.route('/:id')
  .get(getReviewById);

// Protected routes
router.route('/')
  .post(protect, addReview);

router.route('/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;