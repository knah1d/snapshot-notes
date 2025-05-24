import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads directory if it doesn't exist
const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Filter to accept only images
const fileFilter = (req, file, cb) => {
    console.log("Processing file:", file.originalname, file.mimetype);
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        console.log(
            "File rejected - not an image:",
            file.originalname,
            file.mimetype
        );
        cb(new Error("Not an image! Please upload only images."), false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});
