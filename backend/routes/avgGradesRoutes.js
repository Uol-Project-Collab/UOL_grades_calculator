const express = require("express");
const router = express.Router();
const {
  updateAverageGrade,
  getOrCreateAverage
} = require("../controllers/avgGradeController");

// Update avgGrade (called by frontend)
router.put("/students/:studentId/average", updateAverageGrade);

// Get avgGrade (with fallback calculation)
router.get("/students/:studentId/average", getOrCreateAverage);

module.exports = router;