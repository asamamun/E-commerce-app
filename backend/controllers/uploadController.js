const asyncHandler = require('../middleware/asyncHandler');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(__dirname, '..', 'uploads');
    fs.mkdir(uploadDir, { recursive: true }).then(() => {
      cb(null, uploadDir);
    }).catch(err => {
      cb(err, uploadDir);
    });
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// @desc    Upload image
// @route   POST /api/upload
// @access  Private/Admin
exports.uploadImage = asyncHandler(async (req, res, next) => {
  // Check if file was uploaded
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload a file');
  }

  // Process image with sharp
  const processedFileName = `processed-${req.file.filename}`;
  const processedFilePath = path.join(__dirname, '..', 'uploads', processedFileName);
  
  await sharp(req.file.path)
    .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(processedFilePath);

  // Remove original file
  await fs.unlink(req.file.path);

  // Return file info
  res.status(200).json({
    success: true,
    data: {
      fileName: processedFileName,
      filePath: `/uploads/${processedFileName}`,
      url: `/uploads/${processedFileName}` // Use relative URL for frontend proxy
    }
  });
});

// Export upload middleware
exports.uploadMiddleware = upload.single('image');