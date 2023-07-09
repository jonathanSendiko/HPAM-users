import jwt from "jsonwebtoken"
import config from "../config.js";

const authenticateToken = (requiredRole = "user") => (req, res, next) => {
  try {
    // Get the token from the request header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token not provided' });
    }

    // Verify the token
    jwt.verify(token, config.secret_key, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid authorization token' });
      }

      // Check if the user has the required role
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      // User is authenticated, attach the user ID and role to the request object
      req.userId = decoded.userId;
      req.userRole = decoded.role;

      next();
    });
  } catch (error) {
    return res.status(500).json({ message: 'Authentication failed' });
  }
};

export { authenticateToken}