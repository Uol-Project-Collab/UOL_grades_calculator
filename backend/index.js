require('dotenv').config();
const { db } = require('./config/firebase'); // Import Admin Firestore instance
const express = require('express');
const cors = require('cors');
const moduleRoutes = require('./routes/moduleRoutes');
const gradesRoutes = require("./routes/avgGradesRoutes");
const emailRoutes = require("./routes/emailRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', moduleRoutes);
app.use("/api", gradesRoutes);
app.use("/api", emailRoutes);

app.get('/api/test-firebase', async (req, res) => {
  try {
    // Use Admin SDK syntax (no need for collection/doc imports)
    const docRef = db.collection('test').doc('connection');
    await docRef.set({ timestamp: new Date() });
    const docSnap = await docRef.get();
    res.json({ success: true, data: docSnap.data() });
  } catch (error) {
    console.error('Firebase error:', error);
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});