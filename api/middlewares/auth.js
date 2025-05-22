import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    // 1. Get token from headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Not authorized');

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Get user (without password)
    req.user = await User.findById(decoded.id).select('-password');
    next();

  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};