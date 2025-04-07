const express = require('express');
const router = express.Router();
const { getModules } = require('../controllers/moduleController');

// Get all available modules
router.get('/modules', getModules);

module.exports = router;