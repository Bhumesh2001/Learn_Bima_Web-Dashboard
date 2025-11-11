import { useState, useEffect } from "react";
import logo from '../assets/LBlogo.webp';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const controlHeader = () => {
        if (typeof window !== "undefined") {
            if (window.scrollY > lastScrollY) {
                // scroll down -> hide
                setShowHeader(false);
            } else {
                // scroll up -> show
                setShowHeader(true);
            }
            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", controlHeader);
        return () => window.removeEventListener("scroll", controlHeader);
    }, [lastScrollY]);

    useEffect(() => {
        if (location.state?.scrollTo) {
            const section = document.getElementById(location.state.scrollTo);
            if (section) {
                setTimeout(() => {
                    section.scrollIntoView({ behavior: "smooth" });
                }, 200);
            }
        }
    }, [location]);

    const menuItems = ["Home", "About Us", "Academy", "Contact Us"];

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-lg shadow-md transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
                }`}
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-10 flex items-center justify-between py-3">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <div className="w-18 h-18 sm:w-20 sm:h-20 shrink-0">
                        <img
                            src={logo}
                            alt="LearnBima Logo"
                            className="w-full h-full object-contain hover:cursor-pointer"
                            draggable={false}
                            onClick={() => navigate('/')}
                        />
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
                    {menuItems.map((item, i) => (
                        <a
                            key={i}
                            href="#"
                            className="relative group transition-colors duration-300 hover:text-[#0a75a9]"
                            onClick={() => {
                                if (item === "Home") {
                                    navigate("/");
                                } else if (item === "Academy") {
                                    navigate('/academy')
                                } else if (item === "Contact Us") {
                                    navigate('/contact')
                                } else if (item === "About Us") {
                                    if (location.pathname !== "/") {
                                        navigate("/", { state: { scrollTo: "upskill-section" }, replace: true });
                                    } else {
                                        const section = document.getElementById("upskill-section");
                                        if (section) {
                                            section.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }
                                }
                            }}
                        >
                            {item}
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#0a75a9] group-hover:w-full transition-all duration-300"></span>
                        </a>
                    ))}
                </nav>

                {/* CTA Button */}
                <button
                    onClick={() => navigate("/contact")}
                    className="hidden md:block px-6 py-2 rounded-full text-white font-semibold bg-linear-to-r from-[#0a75a9] to-[#094e7a] shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer">
                    Register Now
                </button>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-800 hover:text-[#0a75a9] transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-white/70 backdrop-blur-xl border-t border-gray-200 shadow-lg overflow-hidden transform transition-all duration-500 ease-in-out ${isOpen
                    ? "max-h-[400px] opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-4"
                    }`}
            >
                <nav className="flex flex-col p-5 space-y-5 text-gray-800 font-medium">
                    {menuItems.map((item, i) => (
                        <a
                            key={i}
                            href="#"
                            className="hover:text-[#0a75a9] transition-colors duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </a>
                    ))}

                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 rounded-full text-white font-semibold bg-linear-to-r from-[#0a75a9] to-[#094e7a] shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        Register Now
                    </button>
                </nav>
            </div>
        </header>
    );
};
