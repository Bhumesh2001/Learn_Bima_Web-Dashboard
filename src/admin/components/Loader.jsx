import React from "react";

export default function Loader({ message = "Checking login...", size = 2 }) {
    const spinnerSize = `${size}rem`; // size in rem

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Spinner */}
            <div
                className="border-4 border-t-transparent border-indigo-500 rounded-full animate-spin shadow-lg"
                style={{ width: spinnerSize, height: spinnerSize }}
            ></div>

            {/* Text */}
            <p className="text-gray-700 dark:text-gray-200 text-lg font-medium tracking-wide animate-pulse mt-4">
                {message}
            </p>
        </div>
    );
};
