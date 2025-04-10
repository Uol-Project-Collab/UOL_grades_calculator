const express = require('express');
const router = express.Router();
const { 
  getModules, 
  addModule, 
  getUserModules 
} = require('../controllers/moduleController');

// 1. Get modules (with optional level filtering)
router.get('/modules', getModules); 

// 2. Add module to a specific student (using student ID)
router.post('/students/:studentId/modules', addModule); 

// 3. Get modules for a specific student (using student ID) TODO: what's the studentId in DB??
router.get('/students/:studentId/modules', getUserModules); 

module.exports = router;