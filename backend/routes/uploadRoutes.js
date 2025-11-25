const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { uploadMiddleware, uploadImage } = require('../controllers/uploadController');

const router = express.Router();

router.route('/')
  .post(protect, authorize('admin'), uploadMiddleware, uploadImage);

module.exports = router;