const Review = require('../models/Review');
const Product = require('../models/Product');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all reviews (admin)
// @route   GET /api/admin/reviews
// @access  Private/Admin
exports.getAllReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find()
    .populate('product', 'name')
    .populate('user', 'name')
    .sort('-createdAt');
  
  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews
  });
});

// @desc    Delete review (admin)
// @route   DELETE /api/admin/reviews/:id
// @access  Private/Admin
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }
  
  await review.remove();
  
  // Update product ratings
  const reviews = await Review.find({ product: review.product });
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
  
  const product = await Product.findById(review.product);
  product.ratings = averageRating;
  product.numReviews = reviews.length;
  await product.save();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});