const express = require("express");
const router = express.Router();
const {
  updateAverageGrade,
  getOrCreateAverage
} = require("../controllers/avgGradeController");
const { authenticate } = require("../middlewares/authMiddleware");
const catchAsync = require('../utils/catchAsync');

// Apply authentication to all average-grade routes
router.use(authenticate);

// Update current user’s average grade
// PUT /api/grades/average
router.put('/average', catchAsync(updateAverageGrade));

// Get current user’s average grade (existing or calculated)
// GET /api/grades/average
router.get('/average', catchAsync(getOrCreateAverage));

module.exports = router;