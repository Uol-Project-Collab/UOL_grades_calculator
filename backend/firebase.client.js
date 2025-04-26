import { initializeApp } from "firebase/app";
import { getAuth, signOut, sendPasswordResetEmail, confirmPasswordReset} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
await signOut(auth);
await sendPasswordResetEmail(auth, userEmail);
alert('Password reset email sent! Check your inbox.');
const { oobCode, newPassword } = req.body;
await confirmPasswordReset(auth, oobCode, newPassword);
alert('Password has been reset—please sign in with your new password.');

export { auth };