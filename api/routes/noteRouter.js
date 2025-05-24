import express from "express";
import {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
} from "../controllers/noteController.js";
import { protect } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.use(protect); // Protect all routes in this router

router.post("/", upload.array("images", 3), createNote);
router.get("/", getNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
