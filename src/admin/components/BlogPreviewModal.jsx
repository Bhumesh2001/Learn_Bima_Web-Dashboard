import React from "react";
import { Star, Tag, User, Calendar } from "lucide-react";

export default function BlogPreviewModal({ open, onClose, blog }) {
    if (!open || !blog) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 z-20 right-3 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full px-2 py-1 transition"
                >
                    ✕
                </button>

                {/* Blog Preview */}
                <div className="group rounded-2xl overflow-hidden">
                    {/* Image + Badge */}
                    <div className="relative">
                        <img
                            src={blog.imageUrl || "https://via.placeholder.com/400x250"}
                            alt={blog.title}
                            className="w-full h-56 object-cover"
                            draggable={false}
                        />

                        {blog.latestBatch && (
                            <span className="absolute top-4 left-4 flex items-center gap-1 bg-linear-to-r from-[#0a75a9] to-[#45b3de] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                Latest
                            </span>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[70vh]">
                        <h3 className="text-2xl font-bold text-[#0a75a9] mb-2">
                            {blog.title}
                        </h3>

                        <p
                            className="text-gray-700 dark:text-gray-300 mb-4"
                            dangerouslySetInnerHTML={{
                                __html:
                                    blog.shortDescription ||
                                    "No short description available.",
                            }}
                        />

                        <p
                            className="text-gray-700 dark:text-gray-300 mb-4"
                            dangerouslySetInnerHTML={{
                                __html:
                                    blog.longDescription ||
                                    blog.shortDescription ||
                                    "No Long description available.",
                            }}
                        />

                        {/* Meta Info */}
                        <div className="flex flex-col gap-2 text-gray-500 text-sm mt-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <User size={16} className="text-[#0a75a9]" />
                                    <span>{blog.author || "Admin"}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Calendar size={16} className="text-[#0a75a9]" />
                                    <span>
                                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>

                            {blog.category && (
                                <div className="flex items-center gap-1 text-[#0a75a9] font-medium">
                                    <Tag size={14} /> {blog.category}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
