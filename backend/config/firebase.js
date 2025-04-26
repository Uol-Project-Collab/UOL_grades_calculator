const admin = require('firebase-admin');

// Load service account JSON directly
const serviceAccount = require('../firebase-service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL || `https://${serviceAccount.project_id}.firebaseio.com`,
  });
}

const db = admin.firestore();
const auth = admin.auth();

// 2) Optional Firebase Client SDK (for server-side email/password flows)
let clientAuth;
try {
  const { initializeApp } = require('firebase/app');
  const { getAuth } = require('firebase/auth');

  const clientApp = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: serviceAccount.project_id,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID
  });
  clientAuth = getAuth(clientApp);
} catch (err) {
  console.warn('Firebase client SDK not initialized:', err.message);
}

module.exports = { admin, db, auth, clientAuth };
