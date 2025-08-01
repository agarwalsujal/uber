import jwt from 'jsonwebtoken';
import BlackListToken from '../models/blackListToken.js';
import Captain from '../models/captain.model.js';
import User from '../models/user.model.js'

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


// for captain authentication
//auth captain
const isCaptainAuthenticated = async (req, res, next) => {
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
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Check if the token is expired
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ message: 'Token has expired' });
    }
    // Check if the captain exists in the database

    // console.log(decoded);
    const captain = await Captain.findById(decoded.id);
    if (!captain) {
      return res.status(401).json({ message: 'Captain not found' });
    }
    // Attach captain information to request object
    req.captain = captain;
    req.token = token;
    next();
  } catch (err) {
    // Handle any errors that occur during token verification
    console.error('Authentication error:', err);
    return res.status(401).json({ message: err.message });
  }
};

// Export the middleware
export { isAuthenticated, isCaptainAuthenticated };
