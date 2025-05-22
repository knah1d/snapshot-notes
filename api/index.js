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
app.use('/api', limiter);

// CORS middleware
app.use(cors({
  origin: "http://localhost:3000", // or your frontend domain
  credentials: true, // to allow cookies
}));

// Body parsing middleware
app.use(express.json());

// Cookie parsing middleware
app.use(cookieParser());

// Routes
app.use("/api/notes", noteRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.get("/", (req, res) => {
  res.send("✅ Server is running with secure headers");
});
// Global error handler (after routes)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
