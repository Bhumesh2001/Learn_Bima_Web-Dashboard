import { useEffect, useState } from "react";
import { Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllBlogs } from "../../admin/services/api";

export default function BlogSection() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await getAllBlogs({ params: { limit: 3 } }); // ✅ Fetch only 3 blogs
            if (res.data && Array.isArray(res.data.data)) {
                setBlogs(res.data.data);
            } else if (Array.isArray(res.data)) {
                setBlogs(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-[#0a75a9] text-lg font-semibold">Loading blogs...</p>
            </div>
        );
    };

    return (
        <section className="py-15 bg-gradient-to-b from-[#eaf6ff] to-[#d6efff]">
            <div className="max-w-7xl mx-auto px-6 sm:px-10">
                {/* Title */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0a75a9] mb-3">
                        Latest <span className="text-[#45b3de]">Insights & Articles</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Stay informed with expert-written blogs on insurance, finance, and career development.
                    </p>
                </div>

                {/* Blog Cards */}
                {blogs.length > 0 ? (
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {blogs.map((blog, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-2xl shadow-xl overflow-hidden border border-white/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={blog.imageUrl || "https://via.placeholder.com/400x250"}
                                        alt={blog.title}
                                        draggable={false}
                                        className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {blog.category && (
                                        <span className="absolute top-4 left-4 bg-gradient-to-r from-[#0a75a9] to-[#45b3de] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                                            {blog.category}
                                        </span>
                                    )}
                                </div>

                                <div className="p-6 flex flex-col justify-between h-[220px]">
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0a75a9] mb-2 line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-3">
                                            {blog.shortDescription || "No Description"}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between text-gray-500 text-sm">
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
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No blogs found.</p>
                )}

                {/* View All Blogs Button */}
                <div className="mt-12 text-center">
                    <button
                        onClick={() => navigate("/blog")}
                        className="px-8 py-3 bg-[#0a75a9] hover:bg-[#094e7a] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:cursor-pointer"
                    >
                        View All Blogs
                    </button>
                </div>
            </div>
        </section>
    );
};
