const { db } = require('../config/firebase');
const { validateModule } = require('../models/module');

// TODO Get all modules

// Get all modules from one user
const getModules = async (req, res) => {
  try {
    // access the users and modules database entities and make a snapshot of it
    const modulesRef = db.collection('users').doc(req.userId).collection('modules');
    const snapshot = await modulesRef.get();
    
    // if no modules are found return 404 message
    if (snapshot.empty) {
      return res.status(404).json({ message: 'No modules found' });
    }

    // if modules are found, put them in the response
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

// Assigns modules to one user
const createModule = async (req, res) => {
  try {
    // validates module using the validateModule function declared in module.js
    const { error } = validateModule(req.body);
    if (error) {
      return res.status(400).json({
        errors: error.details.map(d => d.message)
      });
    }
    
    //add the module (obtained from the request's body) with userId to the modules collection
    const moduleRef = await db.collection('users').doc(req.userId)
      .collection('modules').add({
        ...req.body,
        createdAt: new Date().toISOString()
      });

  
    // send result of module created succesfully
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

// Updates modules to one user
const updateModule = async (req, res) => {
  try {
    // validates module using module.js
    const { error } = validateModule(req.body);
    if (error) {
      return res.status(400).json({
        errors: error.details.map(d => d.message)
      });
    }

    // take parameters from the request (module and user info)
    const moduleRef = db.collection('users').doc(req.userId)
      .collection('modules').doc(req.params.id);

    // update them in database
    await moduleRef.update({
      ...req.body,
      updatedAt: new Date().toISOString()
    });

    // send response
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

// Delete modules to one user
const deleteModule = async (req, res) => {
  try {
    const moduleRef = db.collection('users').doc(req.userId)
      .collection('modules').doc(req.params.id);

    await moduleRef.delete();

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