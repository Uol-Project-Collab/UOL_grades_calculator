const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const Joi = require("joi");
const { signUp, signIn } = require("../services/authService");
const { authenticate } = require("../middlewares/authMiddleware");
const catchAsync = require("../utils/catchAsync");
const { clientAuth } = require("../config/firebase");
const { sendPasswordResetEmail, confirmPasswordReset } = require("firebase/auth");

options = {
  httpOnly: true,
  secure: true,
  sameSite: 'Strict',
  // maxAge: 15 * 60 * 1000,
}

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// SIGN UP -> use authService.signUp + Firestore `students` doc
router.post("/signup", async (req, res) => {
  const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = req.body;
  try {
    // delegate to authService
    const user = await signUp(email, password);
    // write to Firestore under students
    await admin.firestore().collection("students").doc(user.uid).set({
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    // generate custom token for client
    const token = await admin.auth().createCustomToken(user.uid);
    // Store in HttpOnly cookie
    res.cookie('authToken', token, options);
    res.status(201).json({ uid: user.uid, email }); // Do not send the token here
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).json({ error: err.message });
  }
});

// LOGIN -> sign in via authService and return ID token
router.post("/login", async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const user = await signIn(req.body.email, req.body.password);
    const token = await user.getIdToken();
    // Store in HttpOnly cookie
    res.cookie('authToken', token, options);
    res.json({ uid: user.uid, email: user.email }); // Do not send the token here
  } catch (err) {
    res.status(401).json({ error: "Invalid credentials" });
  }
});


// LOGOUT -> revoke this user’s refresh tokens
router.post("/logout", authenticate, async (req, res, next) => {
  try {
    const uid = req.user.uid;
    // Revoke all future tokens
    await admin.auth().revokeRefreshTokens(uid);
    // Clear the auth token cookie
    res.clearCookie("authToken", options);
    // Clear the CSRF token cookie
    res.clearCookie("_csrf", options);
    // res.json({ success: true, message: "User logged out, tokens revoked." });
  } catch (err) {
    next(err);
  }
});

// VERIFY AUTHENTICATION STATUS
router.get("/verify-session", async (req, res) => {
  try {
    const authToken = req.cookies.authToken;
    
    if (!authToken) {
      return res.status(200).json({ 
        authenticated: false,
      });
    }
    
    // Verify the token
    try {
      const decodedToken = await admin.auth().verifyIdToken(authToken);
      
      res.json({ 
        authenticated: true,
        user: {
          uid: decodedToken.uid,
          email: decodedToken.email
        }
      });
    } catch (tokenError) {
      // Token validation failed, but we'll still use 200 with authenticated:false
      return res.status(200).json({ 
        authenticated: false,
      });
    }
  } catch (error) {
    res.status(500).json({ 
      authenticated: false, 
    });
  }
});


// PASSWORD RELATED

// 1) Trigger “forgot password” email
// POST /api/auth/forgot-password
// Body: { "email": "user@example.com" }
router.post(
  '/forgot-password',
  catchAsync(async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    await sendPasswordResetEmail(clientAuth, email);
    res.json({ success: true, message: 'Password reset email sent' });
  })
);

// 2) Confirm password reset, THIS PORTION IS REDUNDANT IT IS THERE IN CASE WE USE IN THE FUTURE
// POST /api/auth/reset-password
// Body: { "oobCode": "...", "newPassword": "NewP@ssw0rd" }
router.post(
  '/reset-password',
  catchAsync(async (req, res) => {
    const { oobCode, newPassword } = req.body;
    if (!oobCode || !newPassword) {
      return res.status(400).json({ error: 'oobCode and newPassword are both required' });
    }
    await confirmPasswordReset(clientAuth, oobCode, newPassword);
    res.json({ success: true, message: 'Password has been reset' });
  })
);

module.exports = router;
