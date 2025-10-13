import { useState, useEffect } from "react";
import { Search, Calendar, User, Tag, X } from "lucide-react";

const BlogPage = () => {
    const blogsData = [
        {
            id: 1,
            title: "Understanding Life Insurance Basics",
            category: "Insurance",
            author: "Ankit Sharma",
            date: "2025-09-15",
            image: "https://images.unsplash.com/photo-1556740758-90de374c12ad",
            excerpt:
                "Learn the fundamentals of life insurance, types of policies, and why it’s essential for your financial security.",
            content: `Life insurance provides a financial safety net for your loved ones in case of your untimely death. 
It ensures they can maintain their lifestyle and meet essential needs. There are two main types of life insurance: 
term and whole life. Term insurance offers coverage for a specific period, while whole life covers you for life and builds cash value.`,
        },
        {
            id: 2,
            title: "Top 5 Investment Tips for Beginners",
            category: "Finance",
            author: "Neha Gupta",
            date: "2025-08-20",
            image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
            excerpt:
                "If you're just starting out with investing, these practical tips will help you build a strong foundation.",
            content: `Before you start investing, set clear goals and understand your risk appetite. 
Diversify your portfolio, avoid emotional decisions, and focus on long-term gains. 
Always invest only what you can afford to lose and regularly review your portfolio.`,
        },
        {
            id: 3,
            title: "Health Insurance: What You Should Know",
            category: "Health",
            author: "Ravi Mehta",
            date: "2025-07-10",
            image: "https://images.unsplash.com/photo-1588776814546-ec7e63f12b9f",
            excerpt:
                "Health insurance can be confusing. Here’s what to consider before choosing a plan that suits your needs.",
            content: `Health insurance helps cover medical expenses and protects you from unexpected financial strain. 
Compare policies based on coverage, premium, hospital network, and claim process before making a decision.`,
        },
        {
            id: 4,
            title: "How to Choose the Right Term Plan",
            category: "Insurance",
            author: "Sonal Verma",
            date: "2025-08-05",
            image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad",
            excerpt:
                "Confused between multiple term plans? Here’s how to pick the one that fits your life goals and budget.",
            content: `When choosing a term plan, assess your family's financial needs, your income, and existing debts. 
Pick a sum assured that covers 15–20 times your annual income. Don’t forget to check claim settlement ratio and policy exclusions.`,
        },
        {
            id: 5,
            title: "Smart Budgeting for Young Professionals",
            category: "Finance",
            author: "Ravi Patel",
            date: "2025-09-01",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
            excerpt:
                "Learn how to manage your income smartly and save for future goals while still enjoying your present.",
            content: `Create a monthly budget that allocates money for essentials, savings, and leisure. 
Use the 50-30-20 rule: 50% for needs, 30% for wants, and 20% for savings or debt repayment.`,
        },
        {
            id: 6,
            title: "Why Financial Planning Matters in Your 20s",
            category: "Finance",
            author: "Priya Nair",
            date: "2025-07-25",
            image: "https://images.unsplash.com/photo-1565373671977-7f82f18c6016",
            excerpt:
                "Starting financial planning early can change your future. Learn why your 20s are the best time to begin.",
            content: `Early financial planning lets you take advantage of compounding and avoid debt traps. 
Start with an emergency fund, health insurance, and long-term investments like SIPs.`,
        },
        {
            id: 7,
            title: "Top Myths About Insurance Busted",
            category: "Insurance",
            author: "Ankit Sharma",
            date: "2025-06-30",
            image: "https://images.unsplash.com/photo-1504691342899-7f58d56e8dc1",
            excerpt:
                "Insurance is often misunderstood. Here are the most common myths and the truth behind them.",
            content: `Many people think insurance is unnecessary if they are healthy or young. 
In reality, the earlier you buy, the cheaper the premium. Insurance isn’t an investment — it’s a financial safety net.`,
        },
        {
            id: 8,
            title: "How to Build a Long-Term Investment Strategy",
            category: "Finance",
            author: "Neha Gupta",
            date: "2025-05-18",
            image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5",
            excerpt:
                "Planning your investments for the next 10 years? Here’s how to balance growth and safety.",
            content: `Diversify across asset classes — stocks, bonds, mutual funds, and real estate. 
Rebalance annually to maintain your risk level and keep emotions out of investment decisions.`,
        },
        {
            id: 9,
            title: "How Health Insurance Premiums Are Calculated",
            category: "Health",
            author: "Ravi Mehta",
            date: "2025-04-10",
            image: "https://images.unsplash.com/photo-1615461066841-611d0f8b9cc3",
            excerpt:
                "Ever wondered why two people pay different premiums? Here's how insurance companies decide your premium.",
            content: `Factors like age, pre-existing conditions, lifestyle, and policy type affect your premium. 
Choosing a higher deductible or family floater plan can help you reduce costs.`,
        },
        {
            id: 10,
            title: "Protecting Your Family with Critical Illness Cover",
            category: "Insurance",
            author: "Sonal Verma",
            date: "2025-03-22",
            image: "https://images.unsplash.com/photo-1521790797524-b2497295b8a0",
            excerpt:
                "Critical illness insurance provides a lump sum when you’re diagnosed with a major illness. Here’s why it’s worth it.",
            content: `A critical illness plan supports you financially during serious health conditions like cancer or stroke. 
It covers expenses not included in health insurance, allowing you to focus on recovery rather than bills.`,
        },
    ];

    const [blogs, setBlogs] = useState(blogsData);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBlog, setSelectedBlog] = useState(null);

    const blogsPerPage = 6;

    useEffect(() => {
        const filtered = blogsData.filter((blog) => {
            return (
                blog.title.toLowerCase().includes(search.toLowerCase()) &&
                (category ? blog.category === category : true) &&
                (author ? blog.author === author : true) &&
                (date ? blog.date === date : true)
            );
        });
        setBlogs(filtered);
        setCurrentPage(1);
    }, [search, category, author, date]);

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to top on mount
    }, []);

    const indexOfLast = currentPage * blogsPerPage;
    const indexOfFirst = indexOfLast - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    return (
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
                        {[...new Set(blogsData.map((b) => b.category))].map((cat, i) => (
                            <option key={i}>{cat}</option>
                        ))}
                    </select>

                    <select
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0a75a9]"
                    >
                        <option value="">All Authors</option>
                        {[...new Set(blogsData.map((b) => b.author))].map((a, i) => (
                            <option key={i}>{a}</option>
                        ))}
                    </select>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0a75a9]"
                    />
                </div>

                {/* Blog Cards */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {currentBlogs.map((blog) => (
                        <div
                            key={blog.id}
                            onClick={() => setSelectedBlog(blog)}
                            className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                        >
                            {/* Gradient overlay behind image */}
                            <div className="absolute -inset-1 bg-gradient-to-tr from-[#0a75a9]/20 via-[#45b3de]/20 to-[#0a75a9]/20 rounded-2xl blur-3xl animate-animateGradient"></div>

                            {/* Image */}
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-48 object-cover rounded-2xl relative z-10"
                            />

                            {/* Content */}
                            <div className="p-5 flex flex-col justify-between h-[220px] relative z-10">
                                <h3 className="text-xl font-bold text-[#0a75a9] mb-2 line-clamp-2">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-3">{blog.excerpt}</p>
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

                {/* Pagination */}
                <div className="flex justify-center mt-10 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 hover:cursor-pointer rounded-lg border text-sm font-medium transition-all ${currentPage === i + 1
                                ? "bg-[#0a75a9] text-white"
                                : "bg-white text-gray-700 hover:bg-[#eaf6ff]"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Popup Modal */}
            {selectedBlog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setSelectedBlog(null)}
                            className="absolute top-2 hover:cursor-pointer right-2 text-gray-500 hover:text-[#0a75a9]"
                        >
                            <X size={24} />
                        </button>

                        <img
                            src={selectedBlog.image}
                            alt={selectedBlog.title}
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
                            {selectedBlog.content}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default BlogPage;
