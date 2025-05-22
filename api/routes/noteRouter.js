import express from 'express';
import { getNotes, createNote } from '../controllers/noteController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.use(protect); // Protect all routes in this router


router.post('/', createNote);
router.get('/', getNotes);


export default router;