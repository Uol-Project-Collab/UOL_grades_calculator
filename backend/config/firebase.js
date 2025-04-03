const admin = require('firebase-admin');
const serviceAccount = require('../firebase-service-account.json'); // Path to JSON file


const initializeFirebase = () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });    
    console.log('🔥 Firebase initialized');
    return admin.firestore();
  } catch (error) {
    console.error('🚨 Firebase initialization failed:', error);
    process.exit(1);
  }
};

const db = initializeFirebase();
module.exports = db;