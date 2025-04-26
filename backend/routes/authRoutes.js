const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const Joi = require("joi");
const { signUp, signIn } = require("../services/authService");

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// SIGN UP -> use authService.signUp + Firestore `students` doc
router.post('/signup', async (req, res) => {
    const { error } = signupSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
  
    const { email, password } = req.body;
    try {
      // delegate to authService
      const user = await signUp(email, password);
      // write to Firestore under students
      await admin.firestore().collection('students').doc(user.uid).set({
        email,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      // generate custom token for client
      const token = await admin.auth().createCustomToken(user.uid);
      res.status(201).json({ uid: user.uid, email, token });
    } catch (err) {
      console.error('Signup error:', err);
      res.status(400).json({ error: err.message });
    }
  });
  
  // LOGIN -> sign in via authService and return ID token
  router.post('/login', async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
  
    try {
      const user = await signIn(req.body.email, req.body.password);
      const token = await user.getIdToken();
      res.json({ uid: user.uid, email: user.email, token });
    } catch (err) {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
  
  module.exports = router;