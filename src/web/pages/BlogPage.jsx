import { useState, useEffect } from "react";
import { Search, Calendar, User, Tag, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllBlogs, getBlogCategories } from "../../admin/services/api";

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const blogsPerPage = 12;
    const navigate = useNavigate();

    // ✅ Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getBlogCategories();
                if (res.data.success) setCategories(res.data.data);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        };
        fetchCategories();
    }, []);

    // ✅ Fetch blogs with filters
    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const params = {};

            if (search.trim()) params.title = search.trim();
            if (category) params.category = category;
            if (author.trim()) params.author = author.trim();

            params.page = currentPage;
            params.limit = blogsPerPage;

            const response = await getAllBlogs({ params });
            if (response.data.success) {
                setBlogs(response.data.data);
                setTotal(response.data.total);
            } else {
                setBlogs([]);
            }
        } catch (err) {
            console.error("Failed to fetch blogs:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
        window.scrollTo(0, 0);
    }, [search, category, author, currentPage]);

    const totalPages = Math.ceil(total / blogsPerPage);

    return (
        <>
            <Header />

            <section className="pb-20 pt-32 px-6 bg-linear-to-b from-[#f9fcff] to-[#e6f4ff] min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0a75a9] mb-3">
                            📚 LearnBima Blog Hub
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Explore the latest insights on insurance, finance, and smart learning.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
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
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="Author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
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
                                    onClick={() => navigate(`/blogs/${blog.id}`)}
                                    className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                                >
                                    {/* Image + Batch Label */}
                                    <div className="relative">
                                        <img
                                            src={blog.imageUrl}
                                            alt={blog.title}
                                            draggable={false}
                                            className="w-full h-48 object-cover rounded-t-2xl"
                                        />

                                        {/* ✅ Show “Latest Batch” if applicable */}
                                        {blog.latestBatch && (
                                            <span className="absolute top-3 left-3 flex items-center gap-1 bg-linear-to-r from-[#0a75a9] to-[#094e7a] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                                Latest
                                            </span>
                                        )}
                                    </div>

                                    {/* blog info */}
                                    <div className="p-5 flex flex-col justify-between h-[220px]">
                                        <h3 className="text-xl font-bold text-[#0a75a9] mb-2 line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-2"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    blog.shortDescription ||
                                                    "No short description available.",
                                            }}>
                                        </p>
                                        <div className="mt-3 flex items-center justify-between text-gray-500 text-sm">
                                            <span className="flex items-center gap-1">
                                                <User size={16} /> {blog.author}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar size={16} />{" "}
                                                {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
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
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${currentPage === 1
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-[#eaf6ff]"
                                }`}
                        >
                            Prev
                        </button>

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

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${currentPage === totalPages
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-[#eaf6ff]"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default BlogPage;
