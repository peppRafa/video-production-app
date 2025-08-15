const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Mock tasks data
let tasks = [
  { id: 1, phaseId: 3, title: "Film main scenes", description: "Capture all primary footage", status: "in_progress", priority: "high", dueDate: "2024-08-20", assignedTo: 2 },
  { id: 2, phaseId: 3, title: "Record B-roll footage", description: "Additional supporting footage", status: "pending", priority: "medium", dueDate: "2024-08-22", assignedTo: 3 },
  { id: 3, phaseId: 4, title: "Video editing", description: "Edit and assemble final video", status: "pending", priority: "high", dueDate: "2024-09-05", assignedTo: 4 }
];

// GET /api/tasks/phase/:phaseId - Get tasks for a phase
router.get('/phase/:phaseId', (req, res) => {
  try {
    const phaseTasks = tasks.filter(t => t.phaseId === parseInt(req.params.phaseId));
    
    res.json({
      success: true,
      data: phaseTasks,
      count: phaseTasks.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tasks',
      error: error.message
    });
  }
});

// POST /api/tasks - Create new task
router.post('/', [
  body('phaseId').isInt().withMessage('Phase ID is required'),
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('dueDate').isISO8601().withMessage('Valid due date is required'),
  body('priority').isIn(['low', 'medium', 'high']).withMessage('Invalid priority')
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

    const newTask = {
      id: tasks.length + 1,
      ...req.body,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating task',
      error: error.message
    });
  }
});

// PUT /api/tasks/:id - Update task
router.put('/:id', [
  body('status').optional().isIn(['pending', 'in_progress', 'completed']).withMessage('Invalid status'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority')
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

    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: tasks[taskIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating task',
      error: error.message
    });
  }
});

module.exports = router;
