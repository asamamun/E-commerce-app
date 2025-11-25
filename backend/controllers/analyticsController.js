const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const Category = require('../models/Category');
const Review = require('../models/Review');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
exports.getDashboardAnalytics = asyncHandler(async (req, res, next) => {
  // Get total counts
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalCategories = await Category.countDocuments();
  
  // Get total revenue
  const orders = await Order.find({ isPaid: true });
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  
  // Get recent orders (last 5)
  const recentOrders = await Order.find()
    .populate('user', 'name')
    .sort('-createdAt')
    .limit(5);
  
  // Get top products by sales
  const topProducts = await Product.find()
    .sort('-sold')
    .limit(5);
  
  res.status(200).json({
    success: true,
    data: {
      totals: {
        products: totalProducts,
        orders: totalOrders,
        users: totalUsers,
        categories: totalCategories,
        revenue: totalRevenue
      },
      recentOrders,
      topProducts
    }
  });
});