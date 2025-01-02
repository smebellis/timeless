const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied: Admins only' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

