const { db } = require("../config/firebase");
const admin = require("firebase-admin");

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
    // Check username
    const studentId = req.params.studentId;
    if (!studentId)
      return res.status(400).json({ error: "Student ID required" });

    // Validate request body
    const { moduleCode, grade } = req.body;
    if (!moduleCode || grade === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Get student document by username
    const studentRef = db.collection("students").doc(studentId);
    const studentDoc = await studentRef.get();
    if (!studentDoc.exists)
      return res.status(404).json({ error: "Student not found" });

    // Get module document
    const moduleDoc = await db.collection("modules").doc(moduleCode).get();
    if (!moduleDoc.exists) {
      console.error(`Module ${moduleCode} not found`);
      return res.status(400).json({ error: "Invalid module code" });
    }

    const moduleData = moduleDoc.data();
    if (!moduleData.moduleName || !moduleData.level) {
      return res.status(500).json({
        error: "Module data is corrupted in Firestore",
        details: `Missing fields in module ${moduleCode}`,
      });
    }

    // Check if student already has this module
    const studentData = studentDoc.data();
    const currentModules = studentData.modules || [];
    const duplicate = currentModules.find((m) => m.moduleCode === moduleCode);
    if (duplicate) {
      return res.status(409).json({ error: "Module already added" });
    }

    // Create new module object
    const newModule = {
      moduleCode,
      moduleName: moduleData.moduleName,
      level: moduleData.level,
      grade,
    };

    // Add the new module to the student's modules array
    await studentRef.update({
      modules: admin.firestore.FieldValue.arrayUnion(newModule),
    });

    res.status(201).json({
      message: "Module added successfully",
      module: newModule,
    });
  } catch (error) {
    console.error("POST /students/:id/modules error:", error);
    res.status(500).json({
      error: "Failed to add module",
      details: process.env.NODE_ENV === "development" ? error.message : null,
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

    // Return the list of modules with code, name, and grade
    const modulesResponse = studentModules.map((module) => ({
      moduleCode: module.moduleCode,
      moduleName: module.moduleName,
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
    const { studentId, moduleId } = params;

    await db.runTransaction(async (transaction) => {
      // Get student
      const studentRef = db.collection("students").doc(studentId);
      const studentDoc = await transaction.get(studentRef);
      if (!studentDoc.exists)
        return res.status(404).json({ error: "Student not found" });

      // Find the module to update
      const { modules } = studentDoc.data();
      if (!modules || !Array.isArray(modules)) {
        return res
          .status(500)
          .json({ error: "Modules data is corrupt or missing" });
      }

      const moduleIdx = modules.findIndex((m) => m.moduleCode === moduleId);
      if (moduleIdx === -1) {
        return res.status(404).json({ error: "Module not found" });
      }

      // Update module
      const updatedModules = [...modules];
      updatedModules[moduleIdx] = {
        ...updatedModules[moduleIdx],
        ...body,
      };

      transaction.update(studentRef, { modules: updatedModules });

      return res.status(200).json({
        message: "Module updated successfully",
        module: updatedModules[moduleIdx],
      });
    });
  } catch (error) {
    console.error("PUT /students/:studentId/modules/:moduleId error:", error);
    res.status(500).json({
      error: "Failed to edit module",
      details: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};

module.exports = { getModules, addModule, getUserModules, editModule };

// cspell: ignore firestore
