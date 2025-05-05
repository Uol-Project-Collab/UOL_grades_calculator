require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { authenticate } = require('./middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/authRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const gradesRoutes = require('./routes/avgGradesRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public auth routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/modules', authenticate, moduleRoutes);
app.use('/api/grades', authenticate, gradesRoutes);

app.get('/api/test-firebase', async (req, res) => {
  try {
    const docRef = db.collection('test').doc('connection');
    await docRef.set({ timestamp: new Date() });
    const docSnap = await docRef.get();
    res.json({ success: true, data: docSnap.data() });
  } catch (error) {
    console.error('Firebase error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
