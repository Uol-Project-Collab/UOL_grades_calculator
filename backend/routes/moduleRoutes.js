const express = require('express');
const router = express.Router();
const { 
  getModules, 
  createModule, 
  updateModule, 
  deleteModule 
} = require('../controllers/moduleController');

// GET all modules + POST new module
router.route('/modules')
  .get(getModules)
  .post(createModule);

// PUT update + DELETE specific module
router.route('/modules/:id')
  .put(updateModule)
  .delete(deleteModule);

module.exports = router;


// !!! Endpoint for this task: !!!

// To show the list of modules in the form
// GET/.../modules -> get ALL modules as json object


// For the next tasks:

// To assign modules to a particular user
// POST/.../users/add-module/:{userId, [{1, ITP1, 4, T, 100}]} -> add to db
// To send modules from that particular user (as json object)
// GET/.../users/get-modules/:userId