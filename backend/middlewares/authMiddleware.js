const { db, auth } = require('../config/firebase');

exports.authenticate = async (req, res, next) => {
  // Get token from either cookies or Authorization header
  let token;
  
  // Check cookies first (for web clients)
  if (req.cookies && req.cookies.authToken) {
    token = req.cookies.authToken;
  } 
  // Fall back to Authorization header (for API clients)
  else if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token, /* checkRevoked */ true);
    const userDoc = await db.collection('students').doc(decodedToken.uid).get();
    if (!userDoc.exists) return res.status(403).json({ error: 'Student not registered' });

    req.user = { uid: decodedToken.uid, email: decodedToken.email };
    next();
  } catch (err) {
    console.error('[AUTH ERROR]', err.message);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};