import express from "express";
import {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
} from "../controllers/noteController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.use(protect); // Protect all routes in this router

router.post("/", createNote);
router.get("/", getNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
