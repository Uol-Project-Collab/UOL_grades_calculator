const { clientAuth } = require('../config/firebase');
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} = require('firebase/auth');

async function signUp(email, password) {
   try {
    const userCredential = await createUserWithEmailAndPassword(clientAuth, email, password);
     return userCredential.user;
   } catch (error) {
     throw new Error(error.code);
   }
 }

async function signIn(email, password) {
   const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
   return userCredential.user;
 }

async function resetPassword(email) {
   await sendPasswordResetEmail(clientAuth, email);
 }

module.exports = { signUp, signIn, resetPassword };
