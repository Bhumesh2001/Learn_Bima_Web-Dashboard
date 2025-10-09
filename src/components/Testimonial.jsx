import Slider from "react-slick";
import { Star } from "lucide-react";

export default function Testimonials() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    const testimonials = [
        {
            text: "Obviously, I was hesitant initially, but after a week into the course, I'm excited to start my insurance business. Thanks, LB!",
            name: "Sunil Singh Rana",
            college: "Chandigarh University",
        },
        {
            text: "The course was amazing! Exams and quizzes ensured I fully understood the concepts. I passed the first time. Thank you, LearnBima!",
            name: "Komal Khale",
            college: "Saket Gyanpeet of Management",
        },
        {
            text: "LearnBima is flexible and easy. The quizzes are engaging and fun, helping me master the content.",
            name: "Osheen Gupta",
            college: "St John's College Agra",
        },
        {
            text: "This platform makes learning easy and effective. The content is straightforward and well-structured.",
            name: "Ravi Sharma",
            college: "Delhi University",
        },
        {
            text: "The course gave me confidence to crack the exam in one go. Highly recommended!",
            name: "Priya Mehta",
            college: "Mumbai University",
        },
    ];

    return (
        <section className="py-15 bg-gradient-to-b from-[#f5f9ff] to-[#e0f4ff] relative">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0a75a9]">
                    What Our <span className="text-[#45b3de]">Students Say</span>
                </h2>

                <Slider {...settings}>
                    {testimonials.map((t, index) => (
                        <div key={index} className="px-4 py-15">
                            <div className="relative p-6 rounded-3xl shadow-2xl transform hover:-translate-y-2 transition-all duration-500 h-[260px] flex flex-col space-y-4 bg-gradient-to-br from-[#0a75a9]/10 to-[#45b3de]/10">
                                {/* Star Rating */}
                                <div className="flex justify-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={20} className="text-yellow-400" />
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="italic text-gray-700 overflow-hidden text-ellipsis line-clamp-3">
                                    {t.text}
                                </p>

                                {/* User Info */}
                                <div className="flex items-center justify-center space-x-4 mt-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#0a75a9] to-[#45b3de] flex-shrink-0 shadow-lg"></div>
                                    <div>
                                        <h3 className="font-bold text-lg">{t.name}</h3>
                                        <p className="text-sm text-gray-500">{t.college}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};
