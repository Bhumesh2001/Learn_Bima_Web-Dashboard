import { useState, useEffect } from "react";

import slide1 from '../assets/E1.jpeg';
import slide2 from '../assets/S2.jpeg';
import slide3 from '../assets/I3.jpeg';

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    const slides = [
        {
            id: 1,
            // image: "https://picsum.photos/id/1015/800/400",
            image: slide1,
            title: "Empower Your Future with LearnBima",
            description: "Upskill in insurance and financial planning to build a stable career.",
            link: "#"
        },
        {
            id: 2,
            // image: "https://picsum.photos/id/1016/800/400",
            image: slide2,
            title: "Start Your Journey to Financial Freedom",
            description: "Join our courses and earn passive income through knowledge.",
            link: "#"
        },
        {
            id: 3,
            // image: "https://picsum.photos/id/1018/800/400",
            image: slide3,
            title: "India's Leading Insurance Learning Platform",
            description: "Learn from experts, get certified, and secure your professional growth.",
            link: "#"
        }
    ];

    // Auto scroll
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000); // 5 seconds

        return () => clearInterval(interval); // cleanup
    }, [slides.length]);

    return (
        <div className="relative w-full mx-auto overflow-hidden rounded-2xl shadow-2xl h-[650px]">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === current ? "opacity-100 scale-100 z-20" : "opacity-0 scale-105 z-10"
                        }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-[650px] object-cover animate-slowZoom"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end items-start p-8">
                        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 drop-shadow-lg">
                            {slide.title}
                        </h2>
                        <p className="text-gray-200 text-lg max-w-2xl mb-6 drop-shadow-md">
                            {slide.description}
                        </p>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                const section = document.getElementById("vision-section");
                                if (section) {
                                    section.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                            className="mt-2 px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-[#0a75a9] to-[#094e7a] shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};
