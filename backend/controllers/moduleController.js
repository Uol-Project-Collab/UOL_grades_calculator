const { db } = require('../config/firebase');

// Get all available modules (for selection)
const getModules = async (req, res) => {
  try {
    // Get all modules from the modules collection
    const modulesRef = db.collection('modules');
    const snapshot = await modulesRef.get();

    // Format response for frontend
    const modules = [];
    snapshot.forEach(doc => {
      const moduleData = doc.data();
      modules.push({
        moduleCode: moduleData.code,
        moduleName: moduleData.name,
        weight: moduleData.weight,
        level: moduleData.level
      });
    });

    res.json(modules);
    
  } catch (error) {
    console.error('Error fetching modules:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve modules',
      details: error.message 
    });
  }
};

module.exports = { getModules };