require('dotenv').config();
const db = require('./config/firebase');
const express = require('express');
const cors = require('cors');
const moduleRoutes = require('./routes/moduleRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', moduleRoutes);

// Error handling
app.use(errorHandler);

app.get('/api/test-firebase', async (req, res) => {
    try {
      const docRef = db.collection('test').doc('connection');
      await docRef.set({ timestamp: new Date() });
      const doc = await docRef.get();
      res.json({ success: true, data: doc.data() });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});