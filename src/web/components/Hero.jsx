import React from "react";
import image1 from "../assets/lb1.webp";
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
    const navigate = useNavigate();
    return (
        <section id="upskill-section" className="relative bg-linear-to-b from-[#f0f9ff] to-[#ffffff] text-gray-800 overflow-hidden py-10">
            <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
                {/* Left Content */}
                <div className="md:w-1/2 text-center md:text-left space-y-6">
                    {/* Main Heading */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-linear-to-r from-[#0a75a9] to-[#45b3de] tracking-tight">
                        Learn Bima UpSkill
                    </h1>

                    {/* Subtitle / Highlight */}
                    <p className="text-2xl sm:text-3xl font-semibold text-gray-700 tracking-wide">
                        Insurance Licensing Course
                    </p>

                    {/* Description with emphasis */}
                    <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg">
                        <span className="font-semibold text-[#0a75a9]">Grind now, sparkle later.</span>{" "}
                        Be financially independent today and build a steady stream of passive income for your future.
                    </p>

                    {/* Mission Statement */}
                    <p className="text-gray-800 text-lg sm:text-xl font-medium max-w-lg">
                        Our mission is to expand your learning horizon and help aspiring generations
                        plan their careers toward <span className="text-[#45b3de] font-semibold">self-reliance</span>.
                    </p>

                    {/* Call-to-Action Button */}
                    <div className="mt-6">
                        <a
                            href="#"
                            onClick={() => navigate("/contact")}
                            className="inline-block px-8 py-4 bg-linear-to-r from-[#0a75a9] to-[#45b3de] text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            Explore Courses
                        </a>
                    </div>
                </div>

                {/* Right Image */}
                <div className="md:w-1/2 flex justify-center relative">
                    {/* Decorative Blur Circle */}
                    <div className="absolute -top-20 -right-16 w-[450px] h-[450px] bg-[#0a75a9]/10 rounded-full blur-3xl"></div>

                    {/* Animated Image */}
                    <img
                        src={image1}
                        alt="Illustration"
                        className="relative z-10 w-[90%] sm:w-md md:w-136 lg:w-160 object-contain drop-shadow-2xl rounded-2xl animate-float"
                        draggable={false}
                    />
                </div>
            </div>
        </section>
    );
};
