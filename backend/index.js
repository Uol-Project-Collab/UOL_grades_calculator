require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const { authenticate } = require('./middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/authRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const gradesRoutes = require('./routes/avgGradesRoutes');

const app = express();

const allowedOrigins = ["http://localhost:3001", "https://your-production-url.com"];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CSRF protection
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: true, //process.env.NODE_ENV === 'production', // Secure cookies only in production
    sameSite: 'strict'
  }
});
app.use(csrfProtection);

// Public auth routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/modules', authenticate, moduleRoutes);
app.use('/api/grades', authenticate, gradesRoutes);

// CSRF token endpoint
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

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
