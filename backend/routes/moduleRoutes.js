const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth');
const validateModule = require('../middlewares/validateModule');
const { 
  getModules, 
  createModule, 
  updateModule, 
  deleteModule 
} = require('../controllers/moduleController');

// Apply authentication to all module routes
router.use(authenticate);

// GET all modules + POST new module
router.route('/modules')
  .get(getModules)
  .post(validateModule, createModule); // Add validation middleware

// PUT update + DELETE specific module
router.route('/modules/:id')
  .put(validateModule, updateModule) // Validate before update
  .delete(deleteModule);

module.exports = router;