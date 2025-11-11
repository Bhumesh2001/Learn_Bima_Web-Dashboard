import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Search } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <>
            <Header />

            <section className="flex flex-col justify-center items-center min-h-[80vh] bg-linear-to-b from-[#f0faff] to-[#dceeff] text-center px-6 pt-28 pb-16">
                <div className="max-w-lg">
                    <h1 className="text-[120px] font-extrabold text-[#0a75a9] leading-none drop-shadow-md">
                        404
                    </h1>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-gray-600 mt-3 mb-8">
                        The page you’re looking for might have been moved, deleted, or
                        doesn’t exist. Let’s get you back on track.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 bg-[#0a75a9] hover:bg-[#095c86] text-white px-6 py-3 rounded-full font-medium shadow-md transition-all"
                        >
                            <Home size={18} />
                            Back to Home
                        </button>

                        <button
                            onClick={() => navigate("/blog")}
                            className="flex items-center gap-2 border border-[#0a75a9] text-[#0a75a9] hover:bg-[#e9f6ff] px-6 py-3 rounded-full font-medium shadow-md transition-all"
                        >
                            <Search size={18} />
                            Explore Blogs
                        </button>
                    </div>
                </div>

                <div className="mt-10">
                    <img
                        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
                        alt="Not Found Illustration"
                        className="w-80 h-auto mx-auto rounded-xl shadow-lg"
                    />
                </div>
            </section>

            <Footer />
        </>
    );
};
