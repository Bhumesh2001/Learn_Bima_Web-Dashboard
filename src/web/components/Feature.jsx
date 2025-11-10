import React from "react";
import { Clipboard, MessageSquare, Shield, Zap, BookOpen, Layers } from "lucide-react";

export default function FeaturesSection() {
    const features = [
        {
            icon: Clipboard,
            title: "Psychometric Evaluation",
            caption: "Learn how to evaluate personality traits.\nUnderstand cognitive skills assessment."
        },
        {
            icon: MessageSquare,
            title: "Selling Strategies",
            caption: "Master the art of selling insurance.\nBoost your performance and reach clients effectively."
        },
        {
            icon: Shield,
            title: "Essentials",
            caption: "Understand core insurance concepts.\nHandle client requirements confidently."
        },
        {
            icon: Zap,
            title: "Objection Handling",
            caption: "Handle client objections professionally.\nGain confidence and increase conversions."
        },
        {
            icon: BookOpen,
            title: "Corporate Basics",
            caption: "Understand business trends in insurance.\nStay updated with the corporate landscape."
        },
        {
            icon: Layers,
            title: "Domain Knowledge",
            caption: "Gain deep knowledge of insurance products.\nLearn concepts that drive results."
        },
    ];

    return (
        <section id="vision-section" className="py-15 px-6 sm:px-12 bg-gradient-to-b from-[#f0f8ff] to-[#e0f4ff]">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-[#0a75a9]">
                    The <span className="text-[#45b3de] hover:text-black transition-colors">Learn Bima</span> upskill vision goes <span className="text-[#45b3de] hover:text-black transition-colors">beyond</span> careers
                </h2>
                <p className="text-gray-700 mb-12 max-w-2xl mx-auto text-lg sm:text-xl">
                    We offer top-notch digital learning experiences to equip employees with the ability to leverage data-driven knowledge to drive results.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-500 bg-gradient-to-br from-white/80 to-white/90 backdrop-blur-md flex flex-col items-center text-center"
                        >
                            {/* Gradient Icon Circle */}
                            <div className="relative mb-5 w-20 h-20 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0a75a9]/50 via-[#45b3de]/40 to-[#094e7a]/50 blur-xl animate-animateGradient"></div>
                                <div className="relative z-10 p-5 rounded-full bg-gradient-to-r from-[#0a75a9] to-[#094e7a] text-white flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                                    <item.icon size={40} />
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl sm:text-2xl font-extrabold mb-3 text-[#0a75a9] group-hover:text-[#45b3de] transition-colors duration-300">
                                {item.title}
                            </h3>

                            {/* Caption */}
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                {item.caption}
                            </p>

                            {/* Decorative gradient shape */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-16 bg-gradient-to-r from-[#0a75a9]/20 via-[#45b3de]/20 to-[#094e7a]/20 rounded-full blur-3xl opacity-70 z-0"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
