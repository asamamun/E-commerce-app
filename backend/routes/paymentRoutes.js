const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { processPayment, getPaymentConfig } = require('../controllers/paymentController');

const router = express.Router();

router.route('/config')
  .get(getPaymentConfig);

router.route('/process')
  .post(protect, processPayment);

module.exports = router;