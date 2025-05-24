export const errorHandler = (err, req, res, next) => {
    console.error("Error details:", err);
    console.error(err.stack);

    // Handle Multer errors
    if (err.name === "MulterError") {
        return res.status(400).json({
            status: "error",
            error: `File upload error: ${err.message}`,
            code: err.code,
        });
    }

    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? "Server error" : err.message;

    res.status(statusCode).json({
        status: "error",
        error: message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
