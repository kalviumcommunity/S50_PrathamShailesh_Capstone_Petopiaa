const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try{

  jwt.verify(token, "process.env.JWT_SECRET_KEY", (err, user) => {
    if (err) {
      // console.error('Token verification failed:', err);
      return res.status(403).json({ message: 'Token verification failed' });
    }
    req.user = user;
    next();
  });
  } catch(err){
    return res.status(400).json(err);
  }
};

module.exports = authenticateToken;
