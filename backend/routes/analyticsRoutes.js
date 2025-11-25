const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getDashboardAnalytics } = require('../controllers/analyticsController');

router.route('/')
  .get(protect, authorize('admin'), getDashboardAnalytics);

module.exports = router;