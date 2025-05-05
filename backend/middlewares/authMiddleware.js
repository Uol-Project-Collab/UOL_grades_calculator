const { db, auth } = require('../config/firebase');

exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];
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