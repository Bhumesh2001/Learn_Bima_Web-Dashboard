import React from "react";
import team from '../assets/team.webp'

export default function AccessLearningSection() {
    const stats = [
        { value: "300K", label: "Students Registered", gradient: "from-[#0a75a9] to-[#45b3de]" },
        { value: "95%", label: "Training Completed", gradient: "from-[#45b3de] to-[#0a75a9]" },
        { value: "20K", label: "Students Placed", gradient: "from-[#0a75a9] to-[#45b3de]" },
    ];

    return (
        <section className="py-15 px-5 sm:px-10 md:px-20 bg-linear-to-b from-[#f5f9ff] to-[#e0f4ff]">
            <div className="container mx-auto flex flex-col items-center gap-10">
                {/* Top: Image + Text */}
                <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* Image */}
                    <div className="w-full lg:w-1/2 relative h-80 sm:h-96 flex justify-center">
                        <div className="absolute -inset-5 bg-linear-to-tr from-[#0a75a9]/20 via-[#45b3de]/20 to-[#0a75a9]/20 rounded-2xl blur-3xl animate-animateGradient"></div>
                        <img
                            src={team}
                            alt="Three people collaborating"
                            className="w-full h-full object-cover rounded-2xl shadow-2xl relative z-10"
                        />
                    </div>

                    {/* Text */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start gap-6">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0a75a9] leading-snug">
                            Access the learning <br /> platform & explore endless opportunities
                        </h2>
                        <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl">
                            Selling insurance has no earning limit if you are passionate and dedicated. Explore a wide range of insurance products—life, health, auto, accident, home, and more. Nothing is more rewarding than providing peace of mind. Access our platform and join the clan of high earners.
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 w-full max-w-5xl">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 text-center flex flex-col items-center gap-2 transition-all duration-500"
                        >
                            <div className={`text-3xl sm:text-4xl md:text-5xl font-extrabold bg-linear-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                                {stat.value}
                            </div>
                            <p className="text-gray-700 font-semibold text-sm sm:text-base">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
