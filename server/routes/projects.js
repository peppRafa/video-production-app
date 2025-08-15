const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Mock data - will be replaced with database queries
let projects = [
  {
    id: 1,
    title: "Summer Campaign 2024",
    description: "A comprehensive summer marketing campaign featuring multiple video assets",
    status: "Production",
    createdAt: "2024-07-01",
    dueDate: "2024-09-15",
    ownerId: 1,
    teamMembers: [1, 2, 3, 4, 5, 6, 7, 8],
    phases: [
      { id: 1, name: "Development", status: "completed", progress: 100 },
      { id: 2, name: "Pre-production", status: "completed", progress: 100 },
      { id: 3, name: "Production", status: "in_progress", progress: 65 },
      { id: 4, name: "Post-production", status: "pending", progress: 0 }
    ]
  },
  {
    id: 2,
    title: "Corporate Training Video",
    description: "Internal training video for new employee onboarding",
    status: "Pre-production",
    createdAt: "2024-07-15",
    dueDate: "2024-08-30",
    ownerId: 1,
    teamMembers: [1, 2, 3, 4, 5],
    phases: [
      { id: 1, name: "Development", status: "completed", progress: 100 },
      { id: 2, name: "Pre-production", status: "in_progress", progress: 30 },
      { id: 3, name: "Production", status: "pending", progress: 0 },
      { id: 4, name: "Post-production", status: "pending", progress: 0 }
    ]
  }
];

// GET /api/projects - Get all projects
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
});

// GET /api/projects/:id - Get single project
router.get('/:id', (req, res) => {
  try {
    const project = projects.find(p => p.id === parseInt(req.params.id));
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
});

// POST /api/projects - Create new project
router.post('/', [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
  body('dueDate').isISO8601().withMessage('Valid due date is required')
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

    const { title, description, dueDate } = req.body;
    
    const newProject = {
      id: projects.length + 1,
      title,
      description,
      status: "Development",
      createdAt: new Date().toISOString().split('T')[0],
      dueDate,
      ownerId: 1, // Will be replaced with authenticated user ID
      teamMembers: [1],
      phases: [
        { id: 1, name: "Development", status: "in_progress", progress: 0 },
        { id: 2, name: "Pre-production", status: "pending", progress: 0 },
        { id: 3, name: "Production", status: "pending", progress: 0 },
        { id: 4, name: "Post-production", status: "pending", progress: 0 }
      ]
    };

    projects.push(newProject);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
});

// PUT /api/projects/:id - Update project
router.put('/:id', [
  body('title').optional().trim().isLength({ min: 1 }).withMessage('Title cannot be empty'),
  body('description').optional().trim().isLength({ min: 1 }).withMessage('Description cannot be empty'),
  body('dueDate').optional().isISO8601().withMessage('Valid due date is required'),
  body('status').optional().isIn(['Development', 'Pre-production', 'Production', 'Post-production', 'Completed']).withMessage('Invalid status')
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

    const projectIndex = projects.findIndex(p => p.id === parseInt(req.params.id));
    
    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const updatedProject = {
      ...projects[projectIndex],
      ...req.body,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    projects[projectIndex] = updatedProject;

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
});

// DELETE /api/projects/:id - Delete project
router.delete('/:id', (req, res) => {
  try {
    const projectIndex = projects.findIndex(p => p.id === parseInt(req.params.id));
    
    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const deletedProject = projects.splice(projectIndex, 1)[0];

    res.json({
      success: true,
      message: 'Project deleted successfully',
      data: deletedProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
});

module.exports = router;
