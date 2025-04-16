const { db } = require("../config/firebase");
const admin = require("firebase-admin");
const { validateModule } = require("../models/module"); // Import validation function

// 1. Get all modules with level filtering
const getModules = async (req, res) => {
  try {
    let query = db.collection("modules");

    // Handle level filtering
    if (req.query.level) {
      const levels = req.query.level
        .split(",")
        .map((level) => parseInt(level, 10))
        .filter((level) => !isNaN(level));

      if (levels.length > 0) {
        query = query.where("level", "in", levels);
      }
    }

    const modulesSnapshot = await query.get();

    const modules = modulesSnapshot.docs.map((doc) => ({
      moduleCode: doc.id,
      moduleName: doc.data().moduleName,
      level: doc.data().level,
    }));

    res.json(modules);
  } catch (error) {
    console.error("Error fetching modules:", error);
    res.status(500).json({
      error: "Failed to retrieve modules",
      details: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};

// 2. Add module to student
const addModule = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    if (!studentId) return res.status(400).json({ error: "Student ID required" });

    // Validate request body structure
    const { modules } = req.body;
    if (!Array.isArray(modules) || modules.length === 0) {
      return res.status(400).json({ error: "Modules array required" });
    }

    // Validate individual module format
    const invalidModules = modules.filter(m => 
      !m.moduleCode || typeof m.grade !== "string"
    );
    
    if (invalidModules.length > 0) {
      return res.status(400).json({
        error: "Invalid module format",
        details: "Each module must contain moduleCode (string) and grade (string)"
      });
    }

    const studentRef = db.collection("students").doc(studentId);
    const studentDoc = await studentRef.get();
    if (!studentDoc.exists) return res.status(404).json({ error: "Student not found" });

    // Get existing modules
    const existingModules = studentDoc.data().modules || [];
    const existingModuleCodes = new Set(existingModules.map(m => m.moduleCode));

    // Process modules in transaction
    const { updatedModules, errors } = await db.runTransaction(async (transaction) => {
      const newModules = [];
      const errorList = [];

      for (const { moduleCode, grade } of modules) {
        try {
          // Format and validate grade
          const formattedGrade = grade.trim().toUpperCase();
          
          if (!validateModule(formattedGrade)) {
            errorList.push(`${moduleCode}: Invalid grade '${grade}'. Must be 'RPL' or 0.00-100.00`);
            continue;
          }

          // Check duplicate in current request
          if (newModules.some(m => m.moduleCode === moduleCode)) {
            errorList.push(`${moduleCode}: Duplicate in request`);
            continue;
          }

          // Check existing student modules
          if (existingModuleCodes.has(moduleCode)) {
            errorList.push(`${moduleCode}: Already exists for student`);
            continue;
          }

          // Verify module exists in system
          const moduleDoc = await transaction.get(db.collection("modules").doc(moduleCode));
          if (!moduleDoc.exists) {
            errorList.push(`${moduleCode}: Module not found`);
            continue;
          }

          // Validate module data integrity
          const moduleData = moduleDoc.data();
          if (!moduleData.moduleName || !moduleData.level) {
            errorList.push(`${moduleCode}: Corrupted module data`);
            continue;
          }

          // Add valid module
          newModules.push({
            moduleCode,
            moduleName: moduleData.moduleName,
            level: moduleData.level,
            grade: formattedGrade
          });
        } catch (error) {
          errorList.push(`${moduleCode}: Processing error - ${error.message}`);
        }
      }

      if (errorList.length > 0) return { errors: errorList };

      // Update student document
      transaction.update(studentRef, {
        modules: [...existingModules, ...newModules]
      });

      return { updatedModules: newModules };
    });

    if (errors) {
      return res.status(400).json({
        error: "Partial success: Some modules failed",
        details: errors,
        addedCount: updatedModules?.length || 0
      });
    }

    return res.status(201).json({
      message: `${updatedModules.length} modules added successfully`,
      addedModules: updatedModules,
      totalModules: existingModules.length + updatedModules.length
    });

  } catch (error) {
    console.error("POST /students/:id/modules error:", error);
    return res.status(500).json({
      error: "Failed to add modules",
      details: process.env.NODE_ENV === "development" ? error.message : null
    });
  }
};

// 3. Get student's modules
const getUserModules = async (req, res) => {
  try {
    // Check username
    const studentId = req.params.studentId;
    if (!studentId)
      return res.status(400).json({ error: "Student username required" });

    // Get student document by username
    const studentRef = db.collection("students").doc(studentId);
    const studentDoc = await studentRef.get();
    if (!studentDoc.exists)
      return res.status(404).json({ error: "Student not found" });

    const studentData = studentDoc.data();

    // Get modules of the student
    const studentModules = studentData.modules || [];

    // Return the list of modules with code, name, level and grade
    const modulesResponse = studentModules.map((module) => ({
      moduleCode: module.moduleCode,
      moduleName: module.moduleName,
      level: module.level,
      grade: module.grade,
    }));

    res.status(200).json(modulesResponse);
  } catch (error) {
    console.error("GET /students/:id/modules error:", error);
    res.status(500).json({
      error: "Failed to retrieve modules",
      details: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};

// 4. Edit student's modules
const editModule = async (req, res) => {
  try {
    // Get params and body
    const { params, body } = req;
    const { studentId, moduleCode } = params;

    const updatedModule = await db.runTransaction(async (transaction) => {
      // Get student
      const studentRef = db.collection("students").doc(studentId);
      const studentDoc = await transaction.get(studentRef);
      if (!studentDoc.exists) {
        const err = new Error("Student not found");
        err.statusCode = 404;
        throw err;
      }

      // Find the module to update
      const { modules } = studentDoc.data();
      if (!modules || !Array.isArray(modules)) {
        const err = new Error("Modules data is corrupt or missing");
        err.statusCode = 500;
        throw err;
      }

      const moduleIdx = modules.findIndex((m) => m.moduleCode === moduleCode);
      if (moduleIdx === -1) {
        const err = new Error("Module not found");
        err.statusCode = 404;
        throw err;
      }

      // Update module
      const updatedModules = [...modules];
      updatedModules[moduleIdx] = {
        ...updatedModules[moduleIdx],
        ...body,
      };

      transaction.update(studentRef, { modules: updatedModules });
      return updatedModules[moduleIdx];
    });

    res.status(200).json({
      message: "Module updated successfully",
      module: updatedModule,
    });
  } catch (error) {
    console.error(
      "PUT /students/:studentId/modules/:moduleCode error:",
      error.message
    );

    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "An unexpected error occurred";
    const respJson = { error: errorMessage };
    if (process.env.NODE_ENV === "development") respJson.details = error;

    res.status(statusCode).json(respJson);
  }
};

// 5. Delete the student's modules
const deleteModule = async (req, res) => {
  try {
    // Get params and body
    const { params } = req;
    const { studentId, moduleCode } = params;

    await db.runTransaction(async (transaction) => {
      // Get student
      const studentRef = db.collection("students").doc(studentId);
      const studentDoc = await transaction.get(studentRef);
      if (!studentDoc.exists) {
        const err = new Error("Student not found");
        err.statusCode = 404;
        throw err;
      }

      // Find the module to delete
      const { modules } = studentDoc.data();
      if (!modules || !Array.isArray(modules)) {
        const err = new Error("Modules data is corrupt or missing");
        err.statusCode = 500;
        throw err;
      }

      const hasModule = modules.some((m) => m.moduleCode === moduleCode);
      if (!hasModule) {
        const err = new Error("Module not found");
        err.statusCode = 404;
        throw err;
      }

      // Delete module
      const updatedModules = modules.filter((m) => m.moduleCode !== moduleCode);
      transaction.update(studentRef, { modules: updatedModules });
    });

    res.status(204).end();
  } catch (error) {
    console.error(
      "DELETE /students/:studentId/modules/:moduleCode error:",
      error.message
    );

    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "An unexpected error occurred";
    const respJson = { error: errorMessage };
    if (process.env.NODE_ENV === "development") respJson.details = error;

    res.status(statusCode).json(respJson);
  }
};

module.exports = {
  getModules,
  addModule,
  getUserModules,
  editModule,
  deleteModule,
};

// cspell: ignore firestore
