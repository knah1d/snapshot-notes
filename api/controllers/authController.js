import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signupSchema, loginSchema } from "../validators/authValidator.js";


const createSendToken = (user, res) => {
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1m",
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
        
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        
        const user = await User.create({ email, password });
        if (!user) {
            return res.status(400).json({ error: "User creation failed" });
        }

        const accessToken = createSendToken(user, res);
        
        res.status(201).json({ token: accessToken });
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
        
        res.status(200).json({ token: accessToken });
    } catch (err) {
        next(err);
    }
};
