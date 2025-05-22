import User from "../models/User.js";
import Note from "../models/Note.js";
import bcrypt from "bcryptjs";

// Get user profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update user password
export const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res
                .status(400)
                .json({
                    error: "Current password and new password are required",
                });
        }

        const user = await User.findById(req.user._id);

        // Check current password is correct
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ error: "Current password is incorrect" });
        }

        // Password strength validation
        if (newPassword.length < 6) {
            return res
                .status(400)
                .json({ error: "Password must be at least 6 characters long" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete user account
export const deleteAccount = async (req, res) => {
    try {
        // Delete all user's notes first
        await Note.deleteMany({ user: req.user._id });

        // Delete the user
        await User.findByIdAndDelete(req.user._id);

        res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get user stats
export const getUserStats = async (req, res) => {
    try {
        const notesCount = await Note.countDocuments({ user: req.user._id });

        // Get the count of notes created in the last 7 days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const recentNotesCount = await Note.countDocuments({
            user: req.user._id,
            createdAt: { $gte: oneWeekAgo },
        });

        // Get the date of the last created note
        const latestNote = await Note.findOne({ user: req.user._id })
            .sort({ createdAt: -1 })
            .select("createdAt");

        const lastActivityDate = latestNote ? latestNote.createdAt : null;

        res.status(200).json({
            count: notesCount,
            recentCount: recentNotesCount,
            lastActivity: lastActivityDate,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
