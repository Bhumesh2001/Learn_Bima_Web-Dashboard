import { useState, useEffect } from "react";
import { Search, Calendar, User, Tag, X } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllBlogs, getBlogById } from "../../admin/services/api";

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const blogsPerPage = 12;

    // ✅ Fetch blogs with filters
    const fetchBlogs = async () => {
        try {
            setLoading(true);

            const params = {
                title: search || undefined,
                category: category || undefined,
                author: author || undefined,
                startDate: date || undefined,
                endDate: date || undefined,
                page: currentPage,
                limit: blogsPerPage,
            };

            const response = await getAllBlogs({ params });
            if (response.data.success) {
                setBlogs(response.data.data);
                setTotal(response.data.total);
            }
        } catch (err) {
            console.error("Failed to fetch blogs:", err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Re-fetch blogs when filters or pagination change
    useEffect(() => {
        fetchBlogs();
        window.scrollTo(0, 0);
    }, [search, category, author, date, currentPage]);

    // ✅ Fetch single blog when modal opens
    const handleBlogClick = async (id) => {
        try {
            setLoading(true);
            const res = await getBlogById(id);
            if (res.data.success) setSelectedBlog(res.data.data);
        } catch (err) {
            console.error("Error fetching blog details:", err);
        } finally {
            setLoading(false);
        }
    };

    const totalPages = Math.ceil(total / blogsPerPage);

    return (
        <>
            <Header />

            <section className="pb-15 pt-33 px-6 bg-gradient-to-b from-[#f9fcff] to-[#e6f4ff] min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0a75a9] mb-3">
                            📚 LearnBima Blog Hub
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Explore the latest insights on insurance, finance, and smart learning.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 justify-center mb-10">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by title..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0a75a9] outline-none"
                            />
                        </div>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0a75a9]"
                        >
                            <option value="">All Categories</option>
                            <option value="Finance">Finance</option>
                            <option value="Health">Health</option>
                            <option value="Insurance">Insurance</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0a75a9]"
                        />

                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0a75a9]"
                        />
                    </div>

                    {/* Blog List */}
                    {loading ? (
                        <p className="text-center text-gray-500">Loading blogs...</p>
                    ) : blogs.length === 0 ? (
                        <p className="text-center text-gray-500">No blogs found.</p>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                            {blogs.map((blog) => (
                                <div
                                    key={blog.id}
                                    onClick={() => handleBlogClick(blog.id)}
                                    className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                                >
                                    <img
                                        src={blog.imageUrl}
                                        alt={blog.title}
                                        draggable={false}
                                        className="w-full h-48 object-cover rounded-2xl relative z-10"
                                    />
                                    <div className="p-5 flex flex-col justify-between h-[220px] relative z-10">
                                        <h3 className="text-xl font-bold text-[#0a75a9] mb-2 line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-3">{blog.shortDescription}</p>
                                        <div className="mt-3 flex items-center justify-between text-gray-500 text-sm">
                                            <span className="flex items-center gap-1">
                                                <User size={16} /> {blog.author}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar size={16} /> {blog.date}
                                            </span>
                                        </div>
                                        <div className="mt-1 flex items-center gap-1 text-[#0a75a9] text-sm font-medium">
                                            <Tag size={16} /> {blog.category}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="flex justify-center mt-10 space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${currentPage === i + 1
                                    ? "bg-[#0a75a9] text-white"
                                    : "bg-white text-gray-700 hover:bg-[#eaf6ff]"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blog Modal */}
                {selectedBlog && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
                            <button
                                onClick={() => setSelectedBlog(null)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-[#0a75a9]"
                            >
                                <X size={24} />
                            </button>

                            <img
                                src={selectedBlog.imageUrl}
                                alt={selectedBlog.title}
                                draggable={false}
                                className="w-full h-56 object-cover rounded-xl mb-5"
                            />
                            <h2 className="text-2xl font-bold text-[#0a75a9] mb-2">
                                {selectedBlog.title}
                            </h2>
                            <div className="flex flex-wrap items-center gap-3 text-gray-500 text-sm mb-4">
                                <span className="flex items-center gap-1">
                                    <User size={16} /> {selectedBlog.author}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar size={16} /> {selectedBlog.date}
                                </span>
                                <span className="flex items-center gap-1 text-[#0a75a9] font-medium">
                                    <Tag size={16} /> {selectedBlog.category}
                                </span>
                            </div>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {selectedBlog.longDescription}
                            </p>
                        </div>
                    </div>
                )}
            </section>

            <Footer />
        </>
    );
};

export default BlogPage;
