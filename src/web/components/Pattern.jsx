import React from "react";
import bgimg from '../assets/bgimg.jpg';

export default function PatternSection() {
    return (
        <section className="relative py-15 px-6 sm:px-12 bg-[#050D1C] overflow-hidden">
            {/* Animated Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center animate-slowZoom opacity-40"
                style={{
                    backgroundImage: `url('${bgimg}')`,
                }}
            ></div>

            {/* Subtle Grid Overlay */}
            <div
                className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            ></div>

            {/* Content */}
            <div className="relative container mx-auto text-center z-10">
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                    Learn. Train. Get Certified.
                </h2>
                <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                    Our platform gives you unlimited access to insurance licensing courses, practical training, and a job-ready recruitment portal — all for one simple registration price.
                </p>
            </div>
        </section>
    );
};
