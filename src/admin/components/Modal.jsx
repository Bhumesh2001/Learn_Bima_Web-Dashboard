import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function Modal({ children, onClose }) {
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay - no onClick now */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Modal content */}
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="relative bg-gradient-to-r from-sky-600 to-indigo-600 rounded-lg shadow-xl p-4 max-h-[90vh] overflow-auto"
            >
                <button
                    onClick={onClose}
                    className="absolute top-9 right-10 font-bold text-gray-300 hover:cursor-pointer"
                >
                    ✕
                </button>
                {children}
            </motion.div>
        </div>
    );
};
