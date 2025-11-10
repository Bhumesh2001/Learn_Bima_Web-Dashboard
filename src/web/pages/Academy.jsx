import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Academy = () => {
    return (
        <>
            <Header />

            <section className="pt-32 pb-15 bg-gradient-to-b from-[#f9fcff] to-[#e6f4ff] min-h-screen px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0a75a9] mb-6">
                        🎓 LearnBima Academy
                    </h1>
                    <p className="text-gray-600 max-w-3xl mx-auto text-lg mb-12">
                        Unlock your potential with LearnBima Academy — your trusted destination for
                        comprehensive learning on Insurance, Finance, and Digital Transformation.
                    </p>

                    <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
                        {[
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
                        ].map((course, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
                            >
                                <h3 className="text-xl font-semibold text-[#0a75a9] mb-2">{course.title}</h3>
                                <p className="text-gray-600 text-sm">{course.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16">
                        <a
                            // href="/courses"
                            className="px-6 py-3 bg-[#0a75a9] text-white font-semibold rounded-xl hover:bg-[#095d88] transition hover:cursor-pointer"
                        >
                            Explore Courses
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Academy;
