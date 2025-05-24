import React from "react";
import Card from "./Card";

interface NoteCardProps {
    title: string;
    content: string;
    createdAt: string;
    tags?: string[];
    images?: string[];
    onEdit?: () => void;
    onDelete?: () => void;
}

const NoteCard = ({
    title,
    content,
    createdAt,
    tags = [],
    images = [],
    onEdit,
    onDelete,
}: NoteCardProps) => {
    // Use environment variable or default to localhost for API URL
    const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    return (
        <Card className="h-full">
            <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {title}
                    </h3>
                    <div className="flex space-x-2">
                        {onEdit && (
                            <button
                                onClick={onEdit}
                                className="text-gray-400 hover:text-blue-500 transition-colors"
                                aria-label="Edit note"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={onDelete}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                                aria-label="Delete note"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {content}
                </p>

                {images && images.length > 0 && (
                    <div className="flex overflow-x-auto gap-2 mb-4 pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="relative min-w-[80px] w-[80px] h-[60px] rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0"
                            >
                                <img
                                    src={`${API_BASE_URL.replace(
                                        "/api",
                                        ""
                                    )}/${image}`}
                                    alt={`Note image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    onError={(e) => {
                                        console.error(
                                            `Error loading image ${index}:`,
                                            image
                                        );
                                        e.currentTarget.src =
                                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZTwvdGV4dD48L3N2Zz4=";
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-md dark:bg-blue-900 dark:text-blue-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-auto pt-2 flex items-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        <svg
                            className="h-3 w-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        {new Date(createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}{" "}
                        •{" "}
                        {new Date(createdAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default NoteCard;
