import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signupSchema, loginSchema } from "../validators/authValidator.js";

const createSendToken = (user, res) => {
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_SECRET,
        {
            expiresIn: "7d",
        }
    );

    // Set secure HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return accessToken;
};

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw new Error("No refresh token");

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const user = await User.findById(decoded.id);

        const newAccessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m",
            }
        );

        res.json({ token: newAccessToken });
    } catch (err) {
        res.status(401).json({ error: "Invalid refresh token" });
    }
};

export const signup = async (req, res, next) => {
    try {
        const { error } = signupSchema.validate(req.body);
        if (error) throw new Error(error.details[0].message);

        const { email, password, name } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Parse full name into first and last name
        let firstName = "John";
        let lastName = "Doe";

        if (name) {
            const nameParts = name.trim().split(" ");
            firstName = nameParts[0] || "John";
            lastName = nameParts.slice(1).join(" ") || "Doe";
        }

        const user = await User.create({
            email,
            password,
            firstName,
            lastName,
        });

        if (!user) {
            return res.status(400).json({ error: "User creation failed" });
        }

        const accessToken = createSendToken(user, res);

        // Create a user object to return, excluding sensitive data
        const userData = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            initials: (
                user.firstName.charAt(0) + user.lastName.charAt(0)
            ).toUpperCase(),
            createdAt: user.createdAt,
        };

        res.status(201).json({
            token: accessToken,
            user: userData,
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) throw new Error(error.details[0].message);

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const accessToken = createSendToken(user, res);

        // Create a user object to return, excluding sensitive data
        const userData = {
            id: user._id,
            email: user.email,
            firstName: user.firstName || "John",
            lastName: user.lastName || "Doe",
            initials:
                user.firstName && user.lastName
                    ? (
                          user.firstName.charAt(0) + user.lastName.charAt(0)
                      ).toUpperCase()
                    : "JD",
            createdAt: user.createdAt,
        };

        res.status(200).json({
            token: accessToken,
            user: userData,
        });
    } catch (err) {
        next(err);
    }
};
