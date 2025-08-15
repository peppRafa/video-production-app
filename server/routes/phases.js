const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Mock phases data
let phases = [
  { id: 1, projectId: 1, name: "Development", status: "completed", progress: 100, startDate: "2024-07-01", endDate: "2024-07-14" },
  { id: 2, projectId: 1, name: "Pre-production", status: "completed", progress: 100, startDate: "2024-07-15", endDate: "2024-07-28" },
  { id: 3, projectId: 1, name: "Production", status: "in_progress", progress: 65, startDate: "2024-07-29", endDate: "2024-08-25" },
  { id: 4, projectId: 1, name: "Post-production", status: "pending", progress: 0, startDate: "2024-08-26", endDate: "2024-09-15" }
];

// GET /api/phases/:projectId - Get phases for a project
router.get('/:projectId', (req, res) => {
  try {
    const projectPhases = phases.filter(p => p.projectId === parseInt(req.params.projectId));
    
    res.json({
      success: true,
      data: projectPhases,
      count: projectPhases.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching phases',
      error: error.message
    });
  }
});

// PUT /api/phases/:id - Update phase
router.put('/:id', [
  body('status').optional().isIn(['pending', 'in_progress', 'completed']).withMessage('Invalid status'),
  body('progress').optional().isInt({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 100')
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

    const phaseIndex = phases.findIndex(p => p.id === parseInt(req.params.id));
    
    if (phaseIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Phase not found'
      });
    }

    phases[phaseIndex] = {
      ...phases[phaseIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Phase updated successfully',
      data: phases[phaseIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating phase',
      error: error.message
    });
  }
});

module.exports = router;
