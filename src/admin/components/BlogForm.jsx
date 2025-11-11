import React, { useState, useEffect, useRef } from "react";
import { Upload, Image as ImageIcon, Plus } from "lucide-react";
import { useQuill } from "react-quilljs";
import { getBlogCategories } from "../services/api";

export default function BlogForm({ initial = {}, onSave, loading }) {
    const [form, setForm] = useState(initial);
    const [preview, setPreview] = useState(initial.imageUrl || "");
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
    const fileInputRef = useRef(null);

    // ✅ Shared toolbar options
    const modules = {
        toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["link", "image"],
            ["clean"],
        ],
    };

    const { quill, quillRef } = useQuill({
        theme: "snow",
        modules,
        placeholder: "Write content...",
    });

    // ✅ Short Description Editor (Minimal Toolbar)
    const { quill: shortQuill, quillRef: shortQuillRef } = useQuill({
        theme: "snow",
        modules,
        placeholder: "Write a short summary (1–2 lines)...",
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

    // ✅ Sync Short Description
    useEffect(() => {
        if (shortQuill) {
            shortQuill.root.innerHTML = form.shortDescription || "";
            shortQuill.on("text-change", () => {
                setForm((prev) => ({
                    ...prev,
                    shortDescription: shortQuill.root.innerHTML,
                }));
            });
        }
    }, [shortQuill, setForm]);

    // ✅ Load categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getBlogCategories();
                setCategories(res?.data?.data || []);
            } catch (err) {
                console.error("Error fetching blog categories:", err.message);
                setCategories([]);
            }
        };

        fetchCategories();
    }, []);

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
                    {/* author */}
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

                    {/* ✅ Category Dropdown with Create Option */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
                            Category
                        </label>
                        <div className="flex gap-2">
                            <select
                                value={form.category || ""}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>

                            {/* ✅ Hide Add button while editing */}
                            {!form.id && (
                                <button
                                    onClick={() => setShowNewCategoryInput(!showNewCategoryInput)}
                                    className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition hover:cursor-pointer"
                                    type="button"
                                >
                                    <Plus size={18} />
                                </button>
                            )}
                        </div>

                        {showNewCategoryInput && !form.id && (
                            <div className="mt-2 flex gap-2">
                                <input
                                    type="text"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
                                    placeholder="Enter new category name"
                                />
                                <button
                                    className="px-2 py-1 hover:cursor-pointer bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
                                >
                                    Add
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Short Description */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
                        Short Description
                    </label>
                    <div
                        ref={shortQuillRef}
                        className="bg-white dark:bg-gray-800 dark:text-white border rounded-lg"
                        style={{ minHeight: "150px" }}
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
                            className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition hover:cursor-pointer"
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
                        className={`px-6 py-2 hover:cursor-pointer rounded-lg text-white flex items-center gap-2 ${loading
                            ? "bg-indigo-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};
