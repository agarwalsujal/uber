import jwt from 'jsonwebtoken';
import BlackListToken from '../models/blackListToken.js';

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
  
  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  try {
    // Check if token is blacklisted
    const blacklistedToken = await BlackListToken.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({ message: 'Token has been revoked' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.token = token; // Store the token for later use (like in logout)
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default isAuthenticated;
