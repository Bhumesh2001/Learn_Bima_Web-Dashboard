import Slider from "react-slick";
import { Star } from "lucide-react";

export default function Testimonials() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2500,
        speed: 600,
        slidesToShow: 3, // 3 cards on desktop
        slidesToScroll: 1, // scroll 1 card at a time
        arrows: false,
        responsive: [
            {
                breakpoint: 1024, // tablet
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 640, // mobile
                settings: { slidesToShow: 1 },
            },
        ],
    };

    const testimonials = [
        {
            text: `"Obviously, I was a little hesitant when I was first "encouraged" to pursue the insurance career as an agent. But now after a week into the course, I'm looking forward to start my insurance business. Thanks to LB."`,
            name: "Sunil Singh Rana",
            college: "Chandigarh University",
        },
        {
            text: `"All I wanted to say was thanks for the insurance course. That was a great experience, and the exams and quizzes ensure that you fully understand the concepts before you submit. I was successful the first time around! Thank you, LearnBima!"`,
            name: "Komal Khale",
            college: "Saket Gyanpeet of Management",
        },
        {
            text: `"LearnBima offers the terrific way to pass Insurance exam. Easy, flexible scheduling courses. I was able to take courses at home and my office. I really enjoyed the quizzes, kept it very interesting, which does help."`,
            name: "Osheen Gupta",
            college: "St John's College Agra",
        },
        {
            text: `"This platform makes learning easy and effective. The content is straightforward and the flow is excellent."`,
            name: "Ravi Sharma",
            college: "Delhi University",
        },
        {
            text: `"The course gave me confidence to crack the exam in one go. Highly recommended."`,
            name: "Priya Mehta",
            college: "Mumbai University",
        },
    ];

    return (
        <section className="py-20 md:px-15 sm:px-10 bg-gray-50">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-12">
                    What Our <span className="text-blue-500">Students Say</span>
                </h2>

                <Slider {...settings}>
                    {testimonials.map((t, index) => (
                        <div key={index} className="p-4">
                            <div className="p-6 rounded-xl border border-gray-200 shadow-lg relative bg-white h-[400px] flex flex-col justify-between max-w-xl mx-auto">
                                {/* Rating */}
                                <div className="flex mb-3 text-yellow-400 justify-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={20}
                                            fill="currentColor"
                                            stroke="currentColor"
                                        />
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="italic text-gray-700 mb-4 flex-1 overflow-hidden">
                                    {t.text}
                                </p>

                                {/* User Info */}
                                <div className="flex items-center justify-center space-x-4 mt-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0"></div>
                                    <div>
                                        <h2 className="font-bold text-lg">{t.name}</h2>
                                        <p className="text-sm text-gray-500">{t.college}</p>
                                    </div>
                                </div>

                                {/* Quote Mark */}
                                <div className="absolute -bottom-2 -right-2 text-7xl font-extrabold text-gray-200 opacity-50">
                                    "
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}
