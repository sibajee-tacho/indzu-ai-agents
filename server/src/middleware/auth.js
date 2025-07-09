// Authentication middleware
// Validates JWT tokens issued by account-service. If verification succeeds,
// attaches the user information to the request object.

const jwt = require('jsonwebtoken');

const PUBLIC_KEY = process.env.ACCOUNT_SERVICE_PUBLIC_KEY || null;

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const token = header.split(' ')[1];
  try {
    // Verify token signature using account-service public key
    const payload = jwt.verify(token, PUBLIC_KEY);
    req.user = payload; // attach claims to request
    next();
  } catch (err) {
    console.error('Token verification failed', err);
    res.status(401).json({ error: 'Invalid token' });
  }
};
