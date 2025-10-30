import React from "react";
import { Monitor, Users, GraduationCap, BriefcaseBusiness } from "lucide-react";

export default function FourCardSection() {
    const cards = [
        {
            icon: Monitor,
            title: "Screening",
            desc: "Every candidate is expected to go through a psychometric and basic domain knowledge evaluation before enrolling.",
        },
        {
            icon: Users,
            title: "Training",
            desc: "Study with a partner. Receive personalized guidance from our highly qualified staff, who provide in-depth knowledge of insurance products and processes.",
        },
        {
            icon: GraduationCap,
            title: "Program",
            desc: "We teach complicated concepts in a clear, jargon-free manner through our government-approved insurance licensure and exam prep courses.",
        },
        {
            icon: BriefcaseBusiness,
            title: "Job Portal",
            desc: "We offer plenty of opportunities to grow your career. Choose from becoming an insurance professional to a salaried financial advisor in banking sector.",
        },
    ];

    return (
        <section className="py-15 px-6 sm:px-12 bg-gradient-to-b from-[#f5faff] to-[#e0f0ff]">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-[#0a75a9]">
                    DREAM BIG! ACT NOW!
                </h1>
                <p className="text-gray-700 mb-2 max-w-2xl mx-auto text-xl font-semibold">
                    We provide an exclusive career platform for
                </p>
                <h2 className="text-[#0a75a9] hover:text-black text-2xl font-bold mb-12 italic transition-colors duration-300">
                    Building Insurance Agents
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                    {cards.map((item, index) => (
                        <div
                            key={index}
                            className="relative group p-8 rounded-3xl bg-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 text-center flex flex-col items-center"
                        >
                            {/* Icon with gradient hover */}
                            <div className="relative mb-5 w-20 h-20 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0a75a9]/40 via-[#45b3de]/30 to-[#094e7a]/40 blur-xl opacity-70 transition-all duration-500 group-hover:scale-110"></div>
                                <div className="relative z-10 p-5 rounded-full bg-gradient-to-r from-[#0a75a9] to-[#094e7a] text-white flex items-center justify-center group-hover:from-[#45b3de] group-hover:to-[#0a75a9] transition-all duration-500">
                                    <item.icon size={40} />
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[#0a75a9] group-hover:text-[#45b3de] transition-colors duration-300">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-700 text-base leading-relaxed">{item.desc}</p>

                            {/* Decorative Glow Shape */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-16 bg-gradient-to-r from-[#0a75a9]/20 via-[#45b3de]/20 to-[#094e7a]/20 rounded-full blur-3xl opacity-50 z-0"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
