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

        const formattedNotes = notes.map((note) => ({
            id: note._id.toString(),
            title: note.title,
            content: note.content,
            createdAt: note.createdAt.toISOString(),
            updatedAt: note.updatedAt.toISOString(),
            userId: note.user.toString(),
        }));

        res.status(200).json({
            notes: formattedNotes,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalNotes: total,
            hasMore: skip + notes.length < total,
        });
    } catch (err) {
        console.error("Error in getNotes:", err);
        res.status(500).json({ error: "Failed to fetch notes" });
    }
};

// Create a note
export const createNote = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({ error: "Title is required" });
    }

    try {
        const newNote = await Note.create({
            title: title.trim(),
            content: content || "",
            user: req.user._id,
        });

        res.status(201).json({
            id: newNote._id.toString(),
            title: newNote.title,
            content: newNote.content,
            createdAt: newNote.createdAt.toISOString(),
            updatedAt: newNote.updatedAt.toISOString(),
            userId: newNote.user.toString(),
        });
    } catch (err) {
        console.error("Error in createNote:", err);
        res.status(400).json({ error: "Failed to create note" });
    }
};

// Update a note
export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({ error: "Title is required" });
    }

    try {
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        // Check if the note belongs to the user
        if (note.user.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .json({ error: "Not authorized to update this note" });
        }

        note.title = title.trim();
        note.content = content || "";
        note.updatedAt = new Date();
        await note.save();

        res.status(200).json({
            id: note._id.toString(),
            title: note.title,
            content: note.content,
            createdAt: note.createdAt.toISOString(),
            updatedAt: note.updatedAt.toISOString(),
            userId: note.user.toString(),
        });
    } catch (err) {
        console.error("Error in updateNote:", err);
        res.status(400).json({ error: "Failed to update note" });
    }
};

// Delete a note
export const deleteNote = async (req, res) => {
    const { id } = req.params;

    try {
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        // Check if the note belongs to the user
        if (note.user.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .json({ error: "Not authorized to delete this note" });
        }

        await note.deleteOne();
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (err) {
        console.error("Error in deleteNote:", err);
        res.status(500).json({ error: "Failed to delete note" });
    }
};
