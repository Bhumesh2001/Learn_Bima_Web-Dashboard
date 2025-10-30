import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formatDate } from "../utils/helper";
import { getPodcasts, getAllBlogs } from "../services/api";
import Loader from "../components/Loader";
import { notify } from "../utils/notify";
import { getErrorMessage } from "../utils/helper";

export default function Dashboard() {
    const [podcasts, setPodcasts] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const statCards = [
        { label: "Total Podcasts", value: podcasts.length, color: "from-indigo-500 to-indigo-600" },
        { label: "Total Blogs", value: blogs.length, color: "from-pink-500 to-rose-500" },
        { label: "Active Subscriptions", value: "—", color: "from-emerald-500 to-teal-500" },
        { label: "Site Visitors (30d)", value: "—", color: "from-yellow-500 to-orange-500" },
    ];

    // ✅ Fetch podcasts and blogs
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [podcastRes, blogRes] = await Promise.all([
                    getPodcasts(),
                    getAllBlogs(),
                ]);
                setPodcasts(podcastRes.data.data || []);
                setBlogs(blogRes.data.data || []);                
            } catch (err) {
                console.error("Failed to load dashboard data:", err);
                notify.error(getErrorMessage(err));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Loader message="Loading data..." size={2} />;

    return (
        <div className="p-4 sm:p-6">
            {/* Header */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Dashboard Overview
            </h1>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {statCards.map((card, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`p-5 rounded-xl shadow-sm bg-gradient-to-r ${card.color} text-white flex flex-col justify-between`}
                    >
                        <div className="text-sm opacity-90">{card.label}</div>
                        <div className="text-3xl font-semibold mt-1">{card.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Podcasts */}
                <motion.div
                    className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-100 border-b pb-2">
                        Recent Podcasts
                    </h3>
                    {podcasts.length > 0 ? (
                        <ul className="space-y-2 text-sm">
                            {podcasts.slice(0, 5).map((p) => (
                                <li
                                    key={p.id}
                                    className="flex justify-between items-center py-1 border-b last:border-b-0 border-gray-100 dark:border-gray-700"
                                >
                                    <span className="text-gray-700 dark:text-gray-200 truncate">{p.title}</span>
                                    <span className="text-gray-400 text-xs">{formatDate(p.createdAt)}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-400">No podcasts available.</p>
                    )}
                </motion.div>

                {/* Recent Blogs */}
                <motion.div
                    className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-100 border-b pb-2">
                        Recent Blogs
                    </h3>
                    {blogs.length > 0 ? (
                        <ul className="space-y-2 text-sm">
                            {blogs.slice(0, 5).map((b) => (
                                <li
                                    key={b.id}
                                    className="flex justify-between items-center py-1 border-b last:border-b-0 border-gray-100 dark:border-gray-700"
                                >
                                    <span className="text-gray-700 dark:text-gray-200 truncate">{b.title}</span>
                                    <span className="text-gray-400 text-xs">{formatDate(b.createdAt)}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-400">No blogs available.</p>
                    )}
                </motion.div>
            </div>
        </div>
    );
};
