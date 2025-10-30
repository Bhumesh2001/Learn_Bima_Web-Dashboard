import React, { useEffect, useMemo, useState, useCallback } from "react";
import { formatDate } from "../utils/helper";
import Pagination from "../components/Pagination";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../components/Modal";
import BlogForm from "../components/BlogForm";
import { Edit3, Trash2 } from "lucide-react";
import DeleteModal from "../components/DeleteModal";
import Loader from "../components/Loader";
import {
    getAllBlogs,
    addBlog,
    updateBlog,
    deleteBlog,
    uploadAvatar,
} from "../services/api";
import { notify } from "../utils/notify";
import { getErrorMessage } from "../utils/helper";
import useDebounce from '../hooks//UseDebounce';

export default function BlogPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit] = useState(12);
    const [search, setSearch] = useState("");
    const [filterDateFrom, setFilterDateFrom] = useState("");
    const [filterDateTo, setFilterDateTo] = useState("");
    const [filterAuthor, setFilterAuthor] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [Total, setTotal] = useState(0);

    // ✅ Debounced value for search
    const debouncedSearch = useDebounce(search, 500);

    // ✅ Fetch blogs (with or without filters)
    const fetchBlogs = useCallback(async () => {
        try {
            setLoading(true);
            const params = {
                page,
                limit,
                ...(debouncedSearch && { title: debouncedSearch }),
                ...(filterAuthor && { author: filterAuthor }),
                ...(filterCategory && { category: filterCategory }),
                ...(filterDateFrom && { startDate: filterDateFrom }),
                ...(filterDateTo && { endDate: filterDateTo }),
            };

            const res = await getAllBlogs({ params });
            setBlogs(res.data.data || []);            
            setTotal(res.data.total || 0);
        } catch (err) {
            console.error("Failed to fetch blogs:", err);
            notify.error(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, [debouncedSearch, filterAuthor, filterCategory, filterDateFrom, filterDateTo, page, limit]);

    // ✅ Fetch when filters, debounced search, or page change
    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const authors = useMemo(
        () => Array.from(new Set(blogs.map((b) => b.author).filter(Boolean))),
        [blogs]
    );

    const categories = useMemo(
        () => Array.from(new Set(blogs.map((b) => b.category).filter(Boolean))),
        [blogs]
    );

    useEffect(() => setPage(1), [search, filterDateFrom, filterDateTo, filterAuthor, filterCategory]);

    const totalPages = Math.ceil(Total / limit);

    const create = () => {
        setEditing({ title: "", shortDescription: "", longDescription: "", author: "", category: "" });
        setShowForm(true);
    };

    const uploadAvatarFun = async (data) => {
        if (!data.file) return;
        const formData = new FormData();
        formData.append("file", data.file);
        formData.append("tableName", data.tableName);
        formData.append("columnId", data.columnId);
        formData.append("flag", data.flag);

        return await uploadAvatar(formData);
    };

    // ✅ Optimized Create or Update Blog
    const save = async (data) => {
        try {
            const isEdit = !!data.id;

            const { file, ...filterData } = data;

            // ✅ 1. Create or Update Blog
            const res = isEdit
                ? await updateBlog(data.id, filterData)
                : await addBlog(filterData);

            const blog = res.data?.blog;
            if (!blog) throw new Error("No blog data returned from API.");

            // ✅ 2. Upload file only if present
            if (file instanceof File) {
                const fileData = {
                    file,
                    tableName: "Blog",
                    columnId: isEdit ? data.id : blog.id, // use new blog id when creating
                    flag: !isEdit,
                };
                await uploadAvatarFun(fileData);
            };

            notify.success('Blog created or updated successfully...!');

            // ✅ 3. Refresh Blog List
            await fetchBlogs();

        } catch (err) {
            console.error("Failed to save blog:", err);
            notify.error(getErrorMessage(err));
        } finally {
            setShowForm(false);
            setEditing(null);
        }
    };

    // ✅ Delete blog
    const del = async (id) => {
        try {
            await deleteBlog(id);
            notify.success("Blog Deleted Successfully...");
            await fetchBlogs();
        } catch (err) {
            console.error("Failed to delete blog:", err);
            notify.error(getErrorMessage(err));
        } finally {
            setShowDelete(false);
            setSelectedId(null);
        }
        await fetchBlogs();
    };

    if (loading) return <Loader message="Loading Blogs..." size={2} />;

    return (
        <motion.div className="p-4 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    Blogs <span className="text-sm text-gray-500">({Total})</span>
                </h2>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col xl:flex-row sm:flex-row lg:flex-col md:flex-col sm:items-center sm:justify-between gap-3 mb-6 w-full">
                <div className="flex flex-wrap gap-2 w-full sm:w-auto overflow-x-auto sm:overflow-visible">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by title..."
                        className="flex-1 min-w-[180px] px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />

                    <select
                        value={filterAuthor}
                        onChange={(e) => setFilterAuthor(e.target.value)}
                        className="flex-1 min-w-[140px] px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    >
                        <option value="">All authors</option>
                        {authors.map((a) => (
                            <option key={a} value={a}>
                                {a}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="flex-1 min-w-[140px] px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    >
                        <option value="">All categories</option>
                        {categories.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>

                    <input
                        type="date"
                        value={filterDateFrom || ""}
                        onChange={(e) => setFilterDateFrom(e.target.value)}
                        className="flex-1 min-w-[140px] px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />

                    <input
                        type="date"
                        value={filterDateTo || ""}
                        onChange={(e) => setFilterDateTo(e.target.value)}
                        className="flex-1 min-w-[140px] px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                </div>

                <div className="flex justify-end sm:justify-start">
                    <button
                        onClick={create}
                        className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 hover:shadow-md transition-all hover:cursor-pointer"
                    >
                        + Create Blog
                    </button>
                </div>
            </div>

            {/* Blog Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {blogs.map((b) => (
                    <motion.article
                        key={b.id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border hover:shadow-xl transition-all overflow-hidden flex flex-col"
                    >
                        {b.imageUrl && (
                            <img
                                src={b.imageUrl}
                                alt={b.title}
                                className="w-full h-48 md:h-52 object-cover"
                                draggable={false}
                            />
                        )}

                        <div className="p-4 flex flex-col flex-1 justify-between">
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                    {b.title}
                                </h3>
                                <div className="text-sm text-gray-500 mb-2">
                                    {b.author} • {b.category} • {formatDate(b.createdAt)}
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                                    {b.excerpt}
                                </p>
                            </div>

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    onClick={() => {
                                        setEditing(b);
                                        setShowForm(true);
                                    }}
                                    className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition hover:cursor-pointer"
                                    title="Edit"
                                >
                                    <Edit3 size={18} />
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedId(b.id);
                                        setShowDelete(true);
                                    }}
                                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition hover:cursor-pointer"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>

            {/* delete modal */}
            <DeleteModal
                isOpen={showDelete}
                onClose={() => setShowDelete(false)}
                onConfirm={async () => {
                    setFormLoading(true); // reuse formLoading or create a deleteLoading state
                    try {
                        await del(selectedId);
                    } finally {
                        setFormLoading(false);
                    }
                }}
                loading={formLoading}
                title="Delete Blog"
                message="Are you sure you want to delete this Blog?"
            />

            {/* pagination */}
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />

            <AnimatePresence>
                {showForm && (
                    <Modal
                        onClose={() => {
                            setShowForm(false);
                            setEditing(null);
                        }}
                    >
                        <BlogForm
                            initial={editing}
                            onSave={async (data) => {
                                setFormLoading(true);
                                try {
                                    await save(data);
                                } catch (err) {
                                    console.error(err);
                                } finally {
                                    setFormLoading(false);
                                }
                            }}
                            loading={formLoading}
                        />
                    </Modal>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
