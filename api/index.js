// External imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Internal imports
import { errorHandler } from "./middlewares/errorHandler.js";
import connectDB from "./config/db.js";
import noteRouter from "./routes/noteRouter.js";
import authRouter from "./routes/authRouter.js";
import profileRouter from "./routes/profileRoutes.js";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware (should come early)
app.use(helmet());

// Rate limiting (early to protect all routes)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use("/api", limiter);

// CORS middleware
app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin
            // (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            // Allow all origins during development
            return callback(null, true);

            // For production, restrict to specific origin
            // if(allowedOrigins.indexOf(origin) === -1){
            //   return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
            // }
            // return callback(null, true);
        },
        credentials: true, // to allow cookies
    })
);

// Body parsing middleware
app.use(express.json());

// Cookie parsing middleware
app.use(cookieParser());

// Routes
app.use("/api/notes", noteRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);

// Health check endpoint for testing API connectivity
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "API is healthy",
        timestamp: new Date().toISOString(),
    });
});
app.get("/", (req, res) => {
    res.send("✅ Server is running with secure headers");
});
// Global error handler (after routes)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
