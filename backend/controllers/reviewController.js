const Review = require('../models/Review');
const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
exports.getProductReviews = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  
  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  const reviews = await Review.find({ product: productId })
    .populate('user', 'name')
    .sort('-createdAt');
  
  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews
  });
});

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
exports.getReviewById = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate('user', 'name');
  
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }
  
  res.status(200).json({
    success: true,
    data: review
  });
});

// @desc    Add review for a product
// @route   POST /api/reviews
// @access  Private
exports.addReview = asyncHandler(async (req, res, next) => {
  const { productId, rating, comment } = req.body;
  
  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  // Check if user has already reviewed this product
  const existingReview = await Review.findOne({
    product: productId,
    user: req.user._id
  });
  
  if (existingReview) {
    res.status(400);
    throw new Error('You have already reviewed this product');
  }
  
  // Create review
  const review = await Review.create({
    product: productId,
    user: req.user._id,
    rating,
    comment
  });
  
  // Populate user info
  await review.populate('user', 'name');
  
  // Update product ratings
  const reviews = await Review.find({ product: productId });
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  
  product.ratings = averageRating;
  product.numReviews = reviews.length;
  await product.save();
  
  res.status(201).json({
    success: true,
    data: review
  });
});

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);
  
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }
  
  // Check if user owns the review
  if (review.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this review');
  }
  
  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  // Populate user info
  await review.populate('user', 'name');
  
  // Update product ratings
  const reviews = await Review.find({ product: review.product });
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  
  const product = await Product.findById(review.product);
  product.ratings = averageRating;
  product.numReviews = reviews.length;
  await product.save();
  
  res.status(200).json({
    success: true,
    data: review
  });
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }
  
  // Check if user owns the review or is admin
  if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to delete this review');
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