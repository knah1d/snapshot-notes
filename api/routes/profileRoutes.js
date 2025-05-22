
import express from 'express';
import { protect } from '../middlewares/auth.js';
import { getProfile, updatePassword, deleteAccount, getUserStats } from '../controllers/profileController.js';

const router = express.Router();

// Get user profile
router.get('/me', protect, getProfile);

// Update user password
router.put('/update-password', protect, updatePassword);

// Delete user account
router.delete('/delete-account', protect, deleteAccount);

// Get user stats
router.get('/stats', protect, getUserStats);

export default router;
