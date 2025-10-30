import React, { useState, useEffect, useRef } from "react";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";

export default function BlogForm({ initial = {}, onSave, loading }) {
    const [form, setForm] = useState(initial);
    const [preview, setPreview] = useState(initial.file || "");
    const fileInputRef = useRef();

    useEffect(() => {
        setForm(initial);
        setPreview(initial.file || "");
    }, [initial]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, file }); // store actual File object
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result); // only for preview
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-6 w-full bg-white dark:bg-gray-900 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-5 text-gray-800 dark:text-gray-100">
                {form.id ? "Edit Blog" : "Create Blog"}
            </h3>

            <div className="space-y-4">
                <input
                    value={form.title || ""}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Title"
                />

                <div className="grid sm:grid-cols-2 gap-3">
                    <input
                        value={form.author || ""}
                        onChange={(e) => setForm({ ...form, author: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Author"
                    />
                    <input
                        value={form.category || ""}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Category"
                    />
                </div>

                <textarea
                    value={form.shortDescription || ""}
                    onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Short excerpt (1-2 lines)"
                    rows={2}
                />

                <textarea
                    value={form.longDescription || ""}
                    onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Full content..."
                    rows={4}
                />

                {/* Image Upload Section */}
                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                    <label className="block font-medium mb-2 text-gray-700 dark:text-gray-200">
                        Featured Image
                    </label>

                    {preview ? (
                        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3 border">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-lg text-gray-500 dark:text-gray-300">
                            <ImageIcon className="mr-2" /> No image selected
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 mt-3">
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="flex items-center justify-center hover:cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            <Upload className="mr-2 w-4 h-4" /> Upload Image
                        </button>
                        <input
                            type="text"
                            value={form.file || ""}
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
                        onClick={() => onSave(form)}
                        disabled={loading}
                        className={`px-6 py-2 rounded-lg hover:cursor-pointer text-white flex items-center gap-2 ${loading
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

