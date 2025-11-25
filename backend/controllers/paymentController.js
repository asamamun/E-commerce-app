const asyncHandler = require('../middleware/asyncHandler');
const Order = require('../models/Order');

// @desc    Process payment
// @route   POST /api/payment/process
// @access  Private
exports.processPayment = asyncHandler(async (req, res, next) => {
  const { orderId, paymentMethod, paymentData } = req.body;

  // In a real application, you would integrate with a payment gateway like SSLCommerz
  // For now, we'll simulate a successful payment

  // Find the order
  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Verify the order belongs to the user
  if (order.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // Simulate payment processing
  // In a real application, you would call the payment gateway API here
  const paymentResult = {
    id: `payment_${Date.now()}`,
    status: 'completed',
    update_time: new Date().toISOString(),
    email_address: req.user.email,
    payer: {
      email_address: req.user.email
    }
  };

  // Update order with payment information
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = paymentResult;

  const updatedOrder = await order.save();

  res.status(200).json({
    success: true,
    data: updatedOrder
  });
});

// @desc    Get payment configuration
// @route   GET /api/payment/config
// @access  Public
exports.getPaymentConfig = asyncHandler(async (req, res, next) => {
  // Return payment configuration
  res.status(200).json({
    success: true,
    data: {
      // In a real application, you would return actual payment gateway configuration
      sandbox: process.env.PAYMENT_SANDBOX === 'true',
      currency: 'USD'
    }
  });
});