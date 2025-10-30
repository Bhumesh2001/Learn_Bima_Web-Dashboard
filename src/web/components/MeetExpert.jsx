import React from "react";
import { Linkedin } from "lucide-react";

export default function MeetExpertsSection() {
    const experts = [
        {
            name: "Dilip Kumar Sharma",
            role: "Author, L&D Solutions People Manager, E-learning Content Consulting Sales and Development mentoring",
            img: "https://placehold.co/300x300/1D4ED8/FFFFFF?text=Dilip",
            linkedin: "#"
        },
        {
            name: "Deepak Bhardwaj",
            role: "Freelance Trainer & Founder Deknutterts Learning Solutions",
            img: "https://placehold.co/300x300/1D4ED8/FFFFFF?text=Deepak",
            linkedin: "#"
        },
        {
            name: "Coach Nitin Rishi",
            role: "PHD | Head coach CLUNICE CCE Certified Life and Executive Coach - Leadership Development Coach - Author",
            img: "https://placehold.co/300x300/1D4ED8/FFFFFF?text=Coach",
            linkedin: "#"
        }
    ];

    return (
        <section className="py-15 px-5 sm:px-10 md:px-20 bg-gradient-to-b from-[#f5f9ff] to-[#e0f4ff] relative overflow-hidden">
            {/* Background Pattern */}
            <div
                className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            ></div>

            <div className="container mx-auto text-center relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-[#0a75a9]">
                    Our Knowledge Partners
                </h2>
                <p className="text-gray-700 mb-12 sm:mb-16 max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
                    Meet our trainers, creators, designers, subject matter experts & world-class problem solvers.
                </p>

                {/* Experts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
                    {experts.map((expert, idx) => (
                        <div
                            key={idx}
                            className="relative p-6 rounded-3xl bg-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center"
                        >
                            {/* Gradient Overlay */}
                            <div className="absolute -top-8 -left-8 w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-tr from-[#0a75a9] via-[#45b3de] to-[#0a75a9] rounded-full opacity-30 blur-3xl animate-animateGradient"></div>

                            <img
                                src={expert.img}
                                alt={expert.name}
                                className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full border-4 border-white shadow-lg mb-4 object-cover relative z-10"
                            />

                            <h3 className="text-lg sm:text-xl font-bold text-[#0a75a9] hover:text-[#45b3de] mb-2 transition-colors">
                                {expert.name}
                            </h3>
                            <p className="text-gray-600 text-sm sm:text-sm md:text-base mb-4">{expert.role}</p>

                            <div className="mt-4 flex justify-center space-x-4">
                                <a
                                    href={expert.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-3 rounded-full border border-gray-300 hover:border-[#0a75a9] transition-all duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin
                                        size={28}
                                        className="text-gray-600 group-hover:text-[#0a75a9] transition-colors duration-300"
                                    />
                                    <span className="absolute inset-0 rounded-full bg-[#0a75a9]/10 scale-0 group-hover:scale-110 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500"></span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
