import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, User, Tag, ArrowLeft, Star } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getBlogById } from "../../admin/services/api";
import Loader from "../components/ui/Loader";

const BlogDetailsPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await getBlogById(id);
                if (res.data.success) setBlog(res.data.data);
            } catch (err) {
                console.error("Error fetching blog details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    return (
        <>
            <Header />

            {loading ? (
                <div className="min-h-screen flex items-center justify-center bg-black/90">
                    <Loader text="Loading blog details..." />
                </div>
            ) : !blog ? (
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <p className="text-gray-500 text-lg">Blog not found.</p>
                </div>
            ) : (
                <section className="min-h-screen pt-32 pb-20 px-6 bg-linear-to-b from-[#f9fcff] to-[#e6f4ff]">
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 mb-6 text-[#0a75a9] font-medium hover:underline hover:cursor-pointer"
                        >
                            <ArrowLeft size={18} /> Back
                        </button>

                        {/* Blog image */}
                        <div className="relative mb-5">
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-full h-96 object-cover rounded-xl"
                            />

                            {/* ✅ Latest Batch tag */}
                            {blog.latestBatch && (
                                <span className="absolute top-3 left-3 flex items-center gap-1 bg-linear-to-r from-[#0a75a9] to-[#094e7a] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                    Latest
                                </span>
                            )}
                        </div>

                        {/* blog title */}
                        <h1 className="text-3xl font-bold text-[#0a75a9] mb-3">{blog.title}</h1>

                        {/* ✅ Short Description */}
                        {blog.shortDescription && (
                            <p className="text-gray-600 text-lg mb-4 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        blog.shortDescription ||
                                        "No short description available.",
                                }}>
                            </p>
                        )}

                        {/* long description */}
                        <div className="flex flex-wrap items-center gap-3 text-gray-500 text-sm mb-4">
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
                            <span className="flex items-center gap-1 text-[#0a75a9] font-medium">
                                <Tag size={16} /> {blog.category}
                            </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line"
                            dangerouslySetInnerHTML={{
                                __html:
                                    blog.longDescription ||
                                    "No long description available.",
                            }}>
                        </p>
                    </div>
                </section>
            )}

            <Footer />
        </>
    );
};

export default BlogDetailsPage;
