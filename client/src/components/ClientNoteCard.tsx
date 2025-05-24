"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NoteCard from "./NoteCard";
import { NoteService } from "@/services/noteService";
import Card from "./Card";
import ErrorMessage from "./ErrorMessage";

interface ClientNoteCardProps {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    tags?: string[];
    images?: string[];
    onUpdate?: () => void;
    onDelete?: () => void;
}

const ClientNoteCard = ({
    id,
    title: initialTitle,
    content: initialContent,
    createdAt,
    tags = [],
    images = [],
    onUpdate,
    onDelete,
}: ClientNoteCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const router = useRouter();

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!title.trim()) {
            setError("Title is required");
            return;
        }

        setIsLoading(true);
        try {
            await NoteService.updateNote({ id, title, content });
            setIsEditing(false);

            // Call the callback function if provided
            if (onUpdate) {
                onUpdate();
            }

            // Still call router.refresh() for compatibility
            router.refresh();
        } catch (error) {
            console.error("Error updating note:", error);

            if (error instanceof Error) {
                if (
                    error.message.includes("Network error") ||
                    error.message.includes("Failed to fetch")
                ) {
                    setError(
                        "Network error occurred. Please check your internet connection and try again."
                    );
                } else if (error.message.includes("timeout")) {
                    setError(
                        "Request timed out. The server is taking too long to respond. Please try again later."
                    );
                } else if (error.message.includes("Not authenticated")) {
                    setError("Your session has expired. Please log in again.");
                    // Redirect to login after a short delay
                    setTimeout(() => {
                        router.push("/auth/login");
                    }, 2000);
                } else {
                    setError(
                        error.message ||
                            "Failed to update note. Please try again."
                    );
                }
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = () => {
        setIsDeleting(true);
    };

    const confirmDelete = async () => {
        setIsLoading(true);
        try {
            await NoteService.deleteNote(id);

            // Call the callback function if provided
            if (onDelete) {
                onDelete();
            }

            // Still call router.refresh() for compatibility
            router.refresh();
        } catch (error) {
            console.error("Error deleting note:", error);

            if (error instanceof Error) {
                if (
                    error.message.includes("Network error") ||
                    error.message.includes("Failed to fetch")
                ) {
                    setError(
                        "Network error occurred. Please check your internet connection and try again."
                    );
                } else if (error.message.includes("timeout")) {
                    setError(
                        "Request timed out. The server is taking too long to respond. Please try again later."
                    );
                } else if (error.message.includes("Not authenticated")) {
                    setError("Your session has expired. Please log in again.");
                    // Redirect to login after a short delay
                    setTimeout(() => {
                        router.push("/auth/login");
                    }, 2000);
                } else {
                    setError(
                        error.message ||
                            "Failed to delete note. Please try again."
                    );
                }
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
            setIsDeleting(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {!isEditing && !isDeleting ? (
                <NoteCard
                    title={title}
                    content={content}
                    createdAt={createdAt}
                    tags={tags}
                    images={images}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ) : isEditing ? (
                <Card className="p-6">
                    <form onSubmit={handleUpdate}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Edit Note
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {error && (
                            <ErrorMessage
                                message={error}
                                onRetry={() => setError("")}
                            />
                        )}

                        <div className="mb-4">
                            <label
                                htmlFor="edit-title"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="edit-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="edit-content"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Content
                            </label>
                            <textarea
                                id="edit-content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                    isLoading
                                        ? "opacity-70 cursor-not-allowed"
                                        : ""
                                }`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Saving...
                                    </span>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    </form>
                </Card>
            ) : (
                <Card className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Delete Note
                        </h2>
                        <button
                            type="button"
                            onClick={() => setIsDeleting(false)}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {error && (
                        <ErrorMessage
                            message={error}
                            onRetry={() => setError("")}
                        />
                    )}

                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        Are you sure you want to delete this note? This action
                        cannot be undone.
                    </p>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => setIsDeleting(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={confirmDelete}
                            className={`px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                                isLoading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Deleting...
                                </span>
                            ) : (
                                "Delete Note"
                            )}
                        </button>
                    </div>
                </Card>
            )}
        </>
    );
};

export default ClientNoteCard;
