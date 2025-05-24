"use client";

import React from "react";

interface ButtonProps {
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

const Button = ({
    variant = "primary",
    size = "md",
    children,
    onClick,
    className = "",
    disabled = false,
    type = "button",
}: ButtonProps) => {
    // Base styling
    const baseStyle =
        "font-medium rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center";

    // Variant styling
    const variantStyles = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary:
            "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
        outline:
            "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
    };

    // Size styling
    const sizeStyles = {
        sm: "text-sm py-1.5 px-3",
        md: "text-base py-2 px-4",
        lg: "text-lg py-2.5 px-5",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${variantStyles[variant]} ${
                sizeStyles[size]
            } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
