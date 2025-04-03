const { db } = require('../config/firebase');
const { validateModule } = require('../models/module');
const { calculateAverages } = require('../services/gradeService');

const getModules = async (req, res) => {
  try {
    const modulesRef = db.collection('users').doc(req.userId).collection('modules');
    const snapshot = await modulesRef.get();
    
    if (snapshot.empty) {
      return res.status(404).json({ message: 'No modules found' });
    }

    const modules = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(modules);
  } catch (error) {
    console.error('Error fetching modules:', error);
    res.status(500).json({ error: 'Failed to retrieve modules' });
  }
};

const createModule = async (req, res) => {
  try {
    const { error } = validateModule(req.body);
    if (error) {
      return res.status(400).json({
        errors: error.details.map(d => d.message)
      });
    }

    const moduleRef = await db.collection('users').doc(req.userId)
      .collection('modules').add({
        ...req.body,
        createdAt: new Date().toISOString()
      });

    await calculateAverages(req.userId);

    res.status(201).json({
      id: moduleRef.id,
      ...req.body,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error creating module:', error);
    res.status(500).json({ error: 'Module creation failed' });
  }
};

const updateModule = async (req, res) => {
  try {
    const { error } = validateModule(req.body);
    if (error) {
      return res.status(400).json({
        errors: error.details.map(d => d.message)
      });
    }

    const moduleRef = db.collection('users').doc(req.userId)
      .collection('modules').doc(req.params.id);

    await moduleRef.update({
      ...req.body,
      updatedAt: new Date().toISOString()
    });

    await calculateAverages(req.userId);

    res.json({
      id: req.params.id,
      ...req.body,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating module:', error);
    res.status(500).json({ error: 'Module update failed' });
  }
};

const deleteModule = async (req, res) => {
  try {
    const moduleRef = db.collection('users').doc(req.userId)
      .collection('modules').doc(req.params.id);

    await moduleRef.delete();
    await calculateAverages(req.userId);

    res.json({ message: 'Module deleted successfully' });
  } catch (error) {
    console.error('Error deleting module:', error);
    res.status(500).json({ error: 'Module deletion failed' });
  }
};

module.exports = {
  getModules,
  createModule,
  updateModule,
  deleteModule
};