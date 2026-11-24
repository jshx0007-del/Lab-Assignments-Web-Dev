const { verifyToken, extractToken } = require('../utils/token');

function authenticate(req, res, next) {
  const token = extractToken(req.headers);
  if (!token) return res.status(403).json({ message: 'No token provided' });

  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    const message = err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
    res.status(401).json({ message });
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }
    next();
  };
}

module.exports = { authenticate, authorize };
