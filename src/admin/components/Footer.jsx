import React from "react";

export default function Footer() {
    return (
        <footer className="mt-auto bg-gray-50 dark:bg-gray-900 text-gray-500 py-4">
            <div className="max-w-7xl mx-auto px-4 text-sm text-center">© {new Date().getFullYear()} Learn Bima — All rights reserved.</div>
        </footer>
    );
};
