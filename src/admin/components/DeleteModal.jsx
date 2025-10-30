import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function DeleteModal({
    isOpen,
    onClose,
    onConfirm,
    loading = false, // new prop
    title = "Confirm Delete",
    message = "Are you sure you want to delete this item?"
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-black/20 to-black/30 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm w-full p-6 relative"
            >
                <div className="flex flex-col items-center text-center">
                    <svg className="w-12 h-12 text-red-500 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <h2 className="text-lg font-semibold mb-2">{title}</h2>
                    <p className="text-sm text-gray-400 mb-4">{message}</p>
                </div>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`px-4 py-2 bg-red-600 text-white rounded-md transition hover:cursor-pointer ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-red-700"}`}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 size={16} className="animate-spin" /> Deleting...
                            </div>
                        ) : (
                            "Delete"
                        )}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className={`px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md transition hover:cursor-pointer ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-300 dark:hover:bg-gray-600"}`}
                    >
                        Cancel
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
