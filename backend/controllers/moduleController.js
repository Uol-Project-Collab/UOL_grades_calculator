const { db, admin } = require('../config/firebase');

// 1. Get all modules with optional level filtering
exports.getModules = async (req, res) => {
  let query = db.collection('modules');
  if (req.query.level) {
    const levels = req.query.level.split(',').map(l => parseInt(l, 10)).filter(n => !isNaN(n));
    if (levels.length) query = query.where('level', 'in', levels);
  }
  const snapshot = await query.get();
  const modules = snapshot.docs.map(doc => ({ moduleCode: doc.id, ...doc.data() }));
  res.json({ success: true, modules });
};

// 2. Add module to student
exports.addModule = async (req, res) => {
  const studentId = req.user.uid;
  const { modules } = req.body; // array of { moduleCode, moduleInfo: { name, level }, grade }

  // Validate the payload
  if (!Array.isArray(modules) || modules.length === 0) {
    return res.status(400).json({ error: "Invalid payload: 'modules' must be a non-empty array." });
  }
  
  const studentRef = db.collection('students').doc(studentId);
  const studentDoc = await studentRef.get();

  if (!studentDoc.exists) {
    const err = new Error('Student not found');
    err.statusCode = 404;
    throw err;
  }

  const existing = studentDoc.data().modules || [];
  const newModules = [];

  modules.forEach(m => {
    if (!existing.some(e => e.moduleCode === m.moduleCode)) {
      newModules.push({
        moduleCode: m.moduleCode,
        moduleName: m.moduleInfo.name, // Extract name from moduleInfo
        level: m.moduleInfo.level,    // Extract level from moduleInfo
        grade: m.grade,
        createdAt: new Date().toISOString(),
      });
    }
  });

  if (newModules.length === 0) {
    const err = new Error('No new modules to add');
    err.statusCode = 400;
    throw err;
  }

  await studentRef.update({ modules: [...existing, ...newModules] });
  res.status(201).json({ success: true, addedModules: newModules });
};

// 3. Get student modules
exports.getUserModules = async (req, res) => {
  const studentId = req.user.uid;
  const studentDoc = await db.collection('students').doc(studentId).get();
  if (!studentDoc.exists) return res.status(404).json({ error: 'Student not found' });
  res.json({ success: true, modules: studentDoc.data().modules || [] });
};

// 4. Edit module
exports.editModule = async (req, res) => {
  const studentId = req.user.uid;
  const { moduleCode } = req.params;
  const updates = req.body;
  const studentRef = db.collection('students').doc(studentId);
  const studentDoc = await studentRef.get();
  if (!studentDoc.exists) return res.status(404).json({ error: 'Student not found' });
  const mods = studentDoc.data().modules || [];
  const idx = mods.findIndex(m => m.moduleCode === moduleCode);
  if (idx === -1) return res.status(404).json({ error: 'Module not found' });
  mods[idx] = { ...mods[idx], ...updates };
  await studentRef.update({ modules: mods });
  res.json({ success: true, module: mods[idx] });
};

// 5. Delete module
exports.deleteModule = async (req, res) => {
  const studentId = req.user.uid;
  const { moduleCode } = req.params;
  const studentRef = db.collection('students').doc(studentId);
  const studentDoc = await studentRef.get();
  if (!studentDoc.exists) return res.status(404).json({ error: 'Student not found' });
  const mods = studentDoc.data().modules || [];
  const updated = mods.filter(m => m.moduleCode !== moduleCode);
  await studentRef.update({ modules: updated });
  res.status(204).end();
};