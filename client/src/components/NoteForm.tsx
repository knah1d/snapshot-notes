"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { NoteService } from "@/services/noteService";
import ImageUpload from "./ImageUpload";
import Button from "./Button";

interface NoteFormProps {
    onSuccess?: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSuccess }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!title.trim()) {
            setError("Please enter a title for your note");
            return;
        }
        
        setIsLoading(true);
        setError("");
        setIsUploading(!!images.length);

        try {
            console.log("Submitting form with:", { 
                title, 
                content, 
                images: images.map(img => ({name: img.name, type: img.type, size: img.size}))
            });
            
            await NoteService.createNote({
                title,
                content,
                images,
            });

            setTitle("");
            setContent("");
            setImages([]);

            if (onSuccess) {
                onSuccess();
            }

            router.push("/notes");
            router.refresh();
        } catch (err: any) {
            console.error("Error creating note:", err);
            setError(err.message || "Failed to create note");
        } finally {
            setIsLoading(false);
            setIsUploading(false);
        }
    };

    const handleImagesSelect = (files: File[]) => {
        setImages((prev) => [...prev, ...files]);
    };

    const handleImageRemove = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    {error}
                </div>
            )}

            <div>
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                    Content
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={5}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Images (Optional)
                </label>
                <ImageUpload
                    onFilesSelect={handleImagesSelect}
                    images={images}
                    onRemove={handleImageRemove}
                />
            </div>

            <div className="flex justify-end">
                <Button
                    disabled={isLoading}
                    className="w-full sm:w-auto"
                    type="submit"
                >
                    {isLoading 
                        ? (isUploading 
                            ? "Uploading Images..." 
                            : "Creating...") 
                        : "Create Note"}
                </Button>
            </div>
        </form>
    );
};

export default NoteForm;
