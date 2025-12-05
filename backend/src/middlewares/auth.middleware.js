const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // 1. Get tokenqp from header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // 2. Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // 3. Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // This attaches the { id: ... } to req.user
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};