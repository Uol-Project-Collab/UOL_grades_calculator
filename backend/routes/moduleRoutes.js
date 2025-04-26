const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {
  validateAddModules,
  validateModuleUpdate,
} = require("../validators/moduleValidator");
const {
  getModules,
  addModule,
  getUserModules,
  editModule,
  deleteModule,
} = require("../controllers/moduleController");

// public list of all modules, optional ?level=
router.get("/", catchAsync(getModules));

// add one or more modules for the authenticated user
router.post(
  "/",
  validateAddModules, // <— now matches moduleValidator export
  catchAsync(addModule)
);

// list my modules
router.get("/mine", catchAsync(getUserModules));

// edit a single module by code
router.put(
  "/:moduleCode",
  validateModuleUpdate, // <— new name
  catchAsync(editModule)
);

// delete a module by code
router.delete("/:moduleCode", catchAsync(deleteModule));

module.exports = router;
