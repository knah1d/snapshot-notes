import React, { useCallback, useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
    onFilesSelect: (files: File[]) => void;
    maxFiles?: number;
    images: File[];
    onRemove: (index: number) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onFilesSelect,
    maxFiles = 3,
    images,
    onRemove,
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const fileList = e.target.files;
            if (!fileList) return;

            const filesArray = Array.from(fileList);
            const totalFiles = images.length + filesArray.length;

            if (totalFiles > maxFiles) {
                alert(`You can only upload up to ${maxFiles} images`);
                return;
            }

            onFilesSelect(filesArray);
            // Reset input value to allow selecting the same file again
            e.target.value = "";
        },
        [images.length, maxFiles, onFilesSelect]
    );

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        
        const files = Array.from(e.dataTransfer.files);
        if (!files.length) return;
        
        // Filter only image files
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        
        if (imageFiles.length === 0) {
            alert('Please drop image files only');
            return;
        }
        
        const totalFiles = images.length + imageFiles.length;
        if (totalFiles > maxFiles) {
            alert(`You can only upload up to ${maxFiles} images`);
            return;
        }
        
        onFilesSelect(imageFiles);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="image-upload"
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 ${
                        isDragging 
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                            : "border-gray-300 border-dashed bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                    } rounded-lg cursor-pointer`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className={`w-8 h-8 mb-4 ${
                                isDragging ? "text-blue-500" : "text-gray-500 dark:text-gray-400"
                            }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className={`mb-2 text-sm ${isDragging ? "text-blue-500" : "text-gray-500 dark:text-gray-400"}`}>
                            <span className="font-semibold">
                                Click to upload
                            </span>{" "}
                            or drag and drop
                        </p>
                        <p className={`text-xs ${isDragging ? "text-blue-500" : "text-gray-500 dark:text-gray-400"}`}>
                            PNG, JPG or GIF (MAX. {maxFiles} files)
                        </p>
                    </div>
                    <input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        aria-label="Upload images"
                    />
                </label>
            </div>

            {images.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {images.map((file, index) => (
                        <div key={index} className="relative group">
                            <div className="relative h-24 w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt={`Preview ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                        console.error(
                                            `Error loading image ${index}:`,
                                            file.name
                                        );
                                        (e.target as HTMLImageElement).src =
                                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBFcnJvcjwvdGV4dD48L3N2Zz4=";
                                    }}
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                                {file.name}
                            </div>
                            <button
                                type="button"
                                onClick={() => onRemove(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                                aria-label="Remove image"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
