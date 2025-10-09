import { useState, useEffect, useRef } from "react";

export default function VideoPodcastGallery() {
    const videos = [
        {
            title: "Podcast with Developers",
            id: "tgbNymZ7vqY",
            thumbnail: "https://img.youtube.com/vi/tgbNymZ7vqY/hqdefault.jpg",
        },
        {
            title: "Tech Talk: Future of AI",
            id: "sBws8MSXN7A",
            thumbnail: "https://img.youtube.com/vi/sBws8MSXN7A/hqdefault.jpg",
        },
        {
            title: "Design Thinking for Developers",
            id: "VYOjWnS4cMY",
            thumbnail: "https://img.youtube.com/vi/VYOjWnS4cMY/hqdefault.jpg",
        },
        {
            title: "Scaling with Cloud",
            id: "ScMzIvxBSi4",
            thumbnail: "https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg",
        },
        {
            title: "How Startups Win",
            id: "kffacxfA7G4",
            thumbnail: "https://img.youtube.com/vi/kffacxfA7G4/hqdefault.jpg",
        },
    ];

    const [current, setCurrent] = useState(0);
    const carouselRef = useRef(null);
    const scrollIndex = useRef(0);

    // Auto-scroll thumbnails only (no main video change)
    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current) {
                scrollIndex.current = (scrollIndex.current + 1) % videos.length;
                const child = carouselRef.current.children[scrollIndex.current];
                if (child) {
                    child.scrollIntoView({
                        behavior: "smooth",
                        inline: "center",
                        block: "nearest",
                    });
                }
            }
        }, 6000);
        return () => clearInterval(interval);
    }, [videos.length]);

    return (
        <section className="py-15 px-5 sm:px-10 bg-gradient-to-b from-[#eaf6ff] to-[#d6efff] relative overflow-hidden">
            {/* Title */}
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a75a9] mb-3 tracking-tight">
                    🎥 Explore Our Insurance Learning Podcasts
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Gain insights from industry experts, master insurance concepts, and boost your career with actionable knowledge.
                </p>
            </div>

            {/* Featured Video */}
            <div
                className="relative max-w-5xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-white/20 transition-all duration-700"
            >
                <iframe
                    src={`https://www.youtube.com/embed/${videos[current].id}?enablejsapi=1&rel=0&modestbranding=1`}
                    title={videos[current].title}
                    className="w-full h-[400px] sm:h-[500px]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>

                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-6">
                    <h3 className="text-lg sm:text-2xl font-semibold">
                        {videos[current].title}
                    </h3>
                </div>
            </div>

            {/* Carousel Container */}
            <div className="relative max-w-6xl mx-auto">
                {/* Left Gradient Blur */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#eaf6ff] via-[#eaf6ff]/80 to-transparent pointer-events-none z-10"></div>
                {/* Right Gradient Blur */}
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#eaf6ff] via-[#eaf6ff]/80 to-transparent pointer-events-none z-10"></div>

                {/* Thumbnails */}
                <div
                    ref={carouselRef}
                    className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-8"
                >
                    {videos.map((video, idx) => (
                        <div
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`cursor-pointer flex-shrink-0 w-[240px] sm:w-[280px] rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-105 ${idx === current
                                ? "ring-4 ring-[#0a75a9]/80 shadow-[0_0_25px_#0a75a988]"
                                : "opacity-80 hover:opacity-100"
                                }`}
                        >
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-[150px] object-cover"
                            />
                            <div className="p-3 bg-white text-center">
                                <h4 className="text-gray-800 font-semibold text-sm sm:text-base line-clamp-1">
                                    {video.title}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
