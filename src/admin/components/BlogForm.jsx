import React, { useState, useEffect, useRef } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function BlogForm({ initial = {}, onSave, loading }) {
    const [form, setForm] = useState(initial);
    const [preview, setPreview] = useState(initial.imageUrl || "");
    const fileInputRef = useRef(null);

    const { quill, quillRef } = useQuill({
        theme: "snow",
        modules: {
            toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
            ],
        },
        placeholder: "Write content...",
    });

    useEffect(() => {
        setForm(initial);
        setPreview(initial.imageUrl || "");
    }, [initial]);

    useEffect(() => {
        if (quill) {
            quill.root.innerHTML = form.longDescription || "";
            quill.on("text-change", () => {
                setForm((prev) => ({
                    ...prev,
                    longDescription: quill.root.innerHTML,
                }));
            });
        }
    }, [quill]);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm({ ...form, file });
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (!form.title || !form.shortDescription || !form.longDescription) {
            alert("Please fill out all required fields before saving.");
            return;
        }
        onSave(form);
    };

    return (
        <div className="p-6 w-full bg-white dark:bg-gray-900 rounded-xl shadow-md max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-5 text-gray-800 dark:text-gray-100">
                {form.id ? "Edit Blog" : "Create Blog"}
            </h3>

            <div className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
                        Title
                    </label>
                    <input
                        value={form.title || ""}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Enter blog title"
                    />
                </div>

                {/* Author & Category */}
                <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
                            Author
                        </label>
                        <input
                            value={form.author || ""}
                            onChange={(e) => setForm({ ...form, author: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                            placeholder="Enter author name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
                            Category
                        </label>
                        <input
                            value={form.category || ""}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                            placeholder="Enter category"
                        />
                    </div>
                </div>

                {/* Short Description */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
                        Short Description
                    </label>
                    <textarea
                        value={form.shortDescription || ""}
                        onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Write a short summary (1–2 lines)"
                        rows={2}
                    />
                </div>

                {/* Long Description */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
                        Long Description
                    </label>
                    <div
                        ref={quillRef}
                        className="bg-white dark:bg-gray-800 dark:text-white border rounded-lg"
                        style={{ minHeight: "180px" }}
                    />
                </div>

                {/* Image Upload */}
                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-200">
                        Featured Image
                    </label>

                    {preview ? (
                        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3 border">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-lg text-gray-500 dark:text-gray-300">
                            <ImageIcon className="mr-2" /> No image selected
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 mt-3">
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            <Upload className="mr-2 w-4 h-4" /> Upload Image
                        </button>

                        <input
                            type="text"
                            value={form.imageUrl || ""}
                            onChange={(e) => {
                                setForm({ ...form, imageUrl: e.target.value });
                                setPreview(e.target.value);
                            }}
                            placeholder="Or paste image URL"
                            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className={`px-6 py-2 rounded-lg text-white flex items-center gap-2 ${loading
                                ? "bg-indigo-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                    >
                        {loading ? "Saving..." : "Save Blog"}
                    </button>
                </div>
            </div>
        </div>
    );
};
