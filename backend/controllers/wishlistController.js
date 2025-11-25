const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
exports.getWishlist = asyncHandler(async (req, res, next) => {
  let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('items.product');

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user._id, items: [] });
  }

  res.status(200).json({
    success: true,
    data: wishlist
  });
});

// @desc    Add item to wishlist
// @route   POST /api/wishlist
// @access  Private
exports.addToWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Find or create wishlist
  let wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user._id, items: [] });
  }

  // Check if product is already in wishlist
  const itemExists = wishlist.items.find(item => item.product.toString() === productId);

  if (itemExists) {
    res.status(400);
    throw new Error('Product already in wishlist');
  }

  // Add product to wishlist
  wishlist.items.push({ product: productId });
  await wishlist.save();

  // Populate product details
  await wishlist.populate('items.product');

  res.status(200).json({
    success: true,
    data: wishlist
  });
});

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
exports.removeFromWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  // Find wishlist
  let wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    res.status(404);
    throw new Error('Wishlist not found');
  }

  // Check if product is in wishlist
  const itemExists = wishlist.items.find(item => item.product.toString() === productId);

  if (!itemExists) {
    res.status(400);
    throw new Error('Product not in wishlist');
  }

  // Remove product from wishlist
  wishlist.items = wishlist.items.filter(item => item.product.toString() !== productId);
  await wishlist.save();

  // Populate product details
  await wishlist.populate('items.product');

  res.status(200).json({
    success: true,
    data: wishlist
  });
});