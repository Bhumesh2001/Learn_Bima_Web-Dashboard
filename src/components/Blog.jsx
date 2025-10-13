import { Calendar, User } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function BlogSection() {
    const navigate = useNavigate();
    const blogs = [
        {
            title: "Understanding Life Insurance Basics",
            desc: "Learn the essential concepts of life insurance, how it works, and why it’s an important financial decision.",
            image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5",
            author: "Ravi Sharma",
            date: "Oct 8, 2025",
            tag: "Insurance 101",
        },
        {
            title: "How to Choose the Right Policy for You",
            desc: "A step-by-step guide to selecting the best insurance policy based on your income, needs, and long-term goals.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
            author: "Priya Mehta",
            date: "Sep 25, 2025",
            tag: "Financial Tips",
        },
        {
            title: "Top 5 Mistakes People Make While Buying Insurance",
            desc: "Avoid these common pitfalls when purchasing insurance to make sure you get the best benefits possible.",
            image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c",
            author: "Sunil Rana",
            date: "Sep 12, 2025",
            tag: "Expert Advice",
        },
    ];

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
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((blog, i) => (
                        <div
                            key={i}
                            className="group bg-white rounded-2xl shadow-xl overflow-hidden border border-white/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <span className="absolute top-4 left-4 bg-gradient-to-r from-[#0a75a9] to-[#45b3de] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                                    {blog.tag}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col justify-between h-[220px]">
                                <div>
                                    <h3 className="text-xl font-bold text-[#0a75a9] mb-2 line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-3">{blog.desc}</p>
                                </div>

                                <div className="mt-4 flex items-center justify-between text-gray-500 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <User size={16} className="text-[#0a75a9]" />
                                        <span>{blog.author}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Calendar size={16} className="text-[#0a75a9]" />
                                        <span>{blog.date}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Read More Button */}
                            {/* <div className="px-6 pb-6">
                                <button className="mt-3 w-full py-2 rounded-full bg-gradient-to-r from-[#0a75a9] to-[#094e7a] text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition-all hover:cursor-pointer"
                                    onClick={() => navigate('/blog')}
                                >
                                    Read More
                                </button>
                            </div> */}
                        </div>
                    ))}
                </div>

                {/* View All Blogs Button */}
                <div className="mt-12 text-center">
                    <button
                        onClick={() => navigate('/blog')}
                        className="px-8 py-3 bg-[#0a75a9] hover:bg-[#094e7a] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:cursor-pointer"
                    >
                        View All Blogs
                    </button>
                </div>
            </div>
        </section>
    );
};
