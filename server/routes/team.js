const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Mock team data
let teamMembers = [
  { id: 1, projectId: 1, userId: 1, role: "admin", joinedAt: "2024-07-01" },
  { id: 2, projectId: 1, userId: 2, role: "editor", joinedAt: "2024-07-02" },
  { id: 3, projectId: 1, userId: 3, role: "viewer", joinedAt: "2024-07-03" }
];

// GET /api/team/project/:projectId - Get team members for a project
router.get('/project/:projectId', (req, res) => {
  try {
    const projectTeam = teamMembers.filter(t => t.projectId === parseInt(req.params.projectId));
    
    res.json({
      success: true,
      data: projectTeam,
      count: projectTeam.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team members',
      error: error.message
    });
  }
});

// POST /api/team/invite - Invite team member
router.post('/invite', [
  body('projectId').isInt().withMessage('Project ID is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('role').isIn(['admin', 'editor', 'viewer']).withMessage('Invalid role')
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

    const { projectId, email, role } = req.body;
    
    // Mock invitation - in real app, would send email invitation
    const invitation = {
      id: Date.now(),
      projectId: parseInt(projectId),
      email,
      role,
      status: 'pending',
      invitedBy: 1, // Current user ID
      invitedAt: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      message: 'Invitation sent successfully',
      data: invitation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending invitation',
      error: error.message
    });
  }
});

// PUT /api/team/:id/role - Update team member role
router.put('/:id/role', [
  body('role').isIn(['admin', 'editor', 'viewer']).withMessage('Invalid role')
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

    const memberIndex = teamMembers.findIndex(t => t.id === parseInt(req.params.id));
    
    if (memberIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    teamMembers[memberIndex].role = req.body.role;
    teamMembers[memberIndex].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'Role updated successfully',
      data: teamMembers[memberIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating role',
      error: error.message
    });
  }
});

module.exports = router;
