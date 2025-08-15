const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Mock media data
let media = [
  {
    id: 1,
    projectId: 1,
    filename: "location-scout-1.jpg",
    originalName: "downtown_rooftop.jpg",
    type: "image",
    category: "location",
    size: 2048576,
    url: "/uploads/location-scout-1.jpg",
    uploadedBy: 1,
    uploadedAt: "2024-07-15"
  }
];

// GET /api/media/project/:projectId - Get media for a project
router.get('/project/:projectId', (req, res) => {
  try {
    const { category } = req.query;
    let projectMedia = media.filter(m => m.projectId === parseInt(req.params.projectId));
    
    if (category) {
      projectMedia = projectMedia.filter(m => m.category === category);
    }
    
    res.json({
      success: true,
      data: projectMedia,
      count: projectMedia.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching media',
      error: error.message
    });
  }
});

// POST /api/media/upload - Upload media file
router.post('/upload', upload.single('file'), [
  body('projectId').isInt().withMessage('Project ID is required'),
  body('category').isIn(['location', 'cast', 'props', 'script', 'other']).withMessage('Invalid category')
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { projectId, category, description } = req.body;
    
    const newMedia = {
      id: media.length + 1,
      projectId: parseInt(projectId),
      filename: req.file.filename,
      originalName: req.file.originalname,
      type: req.file.mimetype.startsWith('image/') ? 'image' : 
            req.file.mimetype.startsWith('video/') ? 'video' : 'document',
      category,
      description: description || '',
      size: req.file.size,
      url: `/uploads/${req.file.filename}`,
      uploadedBy: 1, // Will be replaced with authenticated user ID
      uploadedAt: new Date().toISOString().split('T')[0]
    };

    media.push(newMedia);

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: newMedia
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading file',
      error: error.message
    });
  }
});

// DELETE /api/media/:id - Delete media file
router.delete('/:id', (req, res) => {
  try {
    const mediaIndex = media.findIndex(m => m.id === parseInt(req.params.id));
    
    if (mediaIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Media not found'
      });
    }

    const deletedMedia = media.splice(mediaIndex, 1)[0];

    res.json({
      success: true,
      message: 'Media deleted successfully',
      data: deletedMedia
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting media',
      error: error.message
    });
  }
});

module.exports = router;
