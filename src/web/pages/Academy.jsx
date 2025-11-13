import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Academy = () => {
    const academyData = [
        {
            title: "Insurance Fundamentals",
            desc: "Understand the key concepts of life, health, and general insurance with real-world examples.",
        },
        {
            title: "Financial Literacy",
            desc: "Master personal finance, investment basics, and smart money management techniques.",
        },
        {
            title: "Digital Insurance Tools",
            desc: "Explore the future of insurance through digital innovation and emerging technologies.",
        },
        {
            title: "Industry Certification",
            desc: "Prepare for IRDAI and other financial sector certifications with expert-led training.",
        },
        {
            title: "Interactive Courses",
            desc: "Learn with engaging videos, quizzes, and practice sessions designed for all levels.",
        },
        {
            title: "Expert Webinars",
            desc: "Join live sessions hosted by professionals and thought leaders from the industry.",
        },
    ];
    const navigate = useNavigate();

    return (
        <>
            <Header />

            <section className="pt-33 pb-20 bg-linear-to-b from-[#f9fcff] to-[#e3f3ff] min-h-screen px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl font-extrabold text-[#0a75a9] mb-6"
                    >
                        🎓 LearnBima Academy
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-600 max-w-3xl mx-auto text-lg mb-14"
                    >
                        Unlock your potential with LearnBima Academy — your trusted destination for
                        comprehensive learning on Insurance, Finance, and Digital Transformation.
                    </motion.p>

                    <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
                        {academyData.map((course, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-transparent hover:border-[#0a75a9]/20 transition-all transform hover:-translate-y-1 duration-500"
                            >
                                <h3 className="text-xl font-semibold text-[#0a75a9] mb-2">
                                    {course.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {course.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-10">
                        <a
                            onClick={() => navigate('/courses')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a75a9] text-white font-semibold rounded-xl hover:bg-[#095d88] transition-all hover:cursor-pointer"
                        >
                            Explore Courses <ArrowRight size={18} />
                        </a>
                    </div>

                    {/* Try Our Platform Section */}
                    <div className="mt-10 bg-white shadow-xl rounded-2xl p-8 max-w-2xl mx-auto border border-[#0a75a9]/10">
                        <h2 className="text-2xl font-bold text-[#0a75a9] mb-4">
                            🚀 Try Our Platform
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Get hands-on experience with LearnBima’s learning platform.
                            Use the demo credentials below to explore our features:
                        </p>

                        <div className="bg-[#f0f8ff] rounded-xl p-5 text-left mb-6">
                            <p className="text-sm text-gray-800">
                                <span className="font-semibold">Username:</span> student
                            </p>
                            <p className="text-sm text-gray-800 mt-2">
                                <span className="font-semibold">Password:</span> Student@12345
                            </p>
                        </div>

                        <a
                            href="https://demo.learnbima.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a75a9] text-white rounded-xl font-semibold hover:bg-[#095d88] transition-all"
                        >
                            Go to <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Academy;
