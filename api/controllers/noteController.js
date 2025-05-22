import Note from "../models/Note.js";

// Get all notes
export const getNotes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const notes = await Note.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Note.countDocuments({ user: req.user._id });

        res.status(200).json({
            notes,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalNotes: total,
            hasMore: skip + notes.length < total,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a note
export const createNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        const newNote = await Note.create({
            title,
            content,
            user: req.user._id,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content, updatedAt: Date.now() },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.status(200).json(updatedNote);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a note
export const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Get a single note
export const getNote = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
