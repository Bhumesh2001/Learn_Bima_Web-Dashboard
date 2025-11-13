import { Facebook, Linkedin, Instagram, Mail, Phone } from "lucide-react";
import logo from '../assets/LBlogo.webp';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();
    return (
        <footer className="bg-gray-900 text-white pt-10 relative overflow-hidden">
            {/* Wave Shape */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-0">
                <svg
                    className="relative block w-full h-20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-current text-gray-900"
                    ></path>
                </svg>
            </div>

            {/* Footer Grid */}
            <div className="container mx-auto px-6 sm:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                {/* Logo & About */}
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <img
                        src={logo}
                        alt="LearnBima Logo"
                        className="w-28 h-28 object-contain hover:cursor-pointer"
                        draggable={false}
                    />
                    <p className="text-gray-300 font-medium hover:text-white text-center md:text-left">
                        LearnBima provides top-notch insurance training, career guidance, and recruitment support for aspiring agents.
                    </p>

                    {/* Social Icons */}
                    <div className="flex space-x-4 mt-2">
                        <a
                            href="https://www.facebook.com/Sentientia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full border border-gray-600 hover:border-blue-500 transition-all duration-300"
                        >
                            <Facebook
                                size={20}
                                className="text-gray-300 hover:text-blue-500 transition-colors duration-300"
                            />
                        </a>

                        <a
                            href="https://x.com"  // ✅ Corrected URL
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full border border-gray-600 hover:border-white transition-all duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="text-gray-300 hover:text-white transition-colors duration-300 w-5 h-5"
                            >
                                <path d="M18.9 2H22l-9.9 11.5L22 22h-3.1l-7.7-8.5L3.5 22H.4l10.7-12.4L.4 2h3.2l7.2 8.1L18.9 2z" />
                            </svg>
                        </a>

                        <a
                            href="https://www.linkedin.com/company/sentientia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full border border-gray-600 hover:border-blue-600 transition-all duration-300"
                        >
                            <Linkedin
                                size={20}
                                className="text-gray-300 hover:text-blue-600 transition-colors duration-300"
                            />
                        </a>

                        <a
                            href="https://www.instagram.com/sentientia.ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full border border-gray-600 hover:border-pink-500 transition-all duration-300"
                        >
                            <Instagram
                                size={20}
                                className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
                            />
                        </a>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <h3 className="text-xl font-bold text-[#26a5d8] mb-2">Contact Us</h3>
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center gap-3">
                            <Mail size={20} className="text-[#26a5d8]" />
                            <a href="mailto:info@learnbima.com" className="text-gray-300 font-medium hover:text-white hover:underline">
                                info@learnbima.com
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone size={20} className="text-[#26a5d8]" />
                            <a href="tel:+917981563903" className="text-gray-300 font-medium hover:text-white hover:underline">
                                +91-7981563903
                            </a>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <h3 className="text-xl font-bold text-[#26a5d8] mb-2">Quick Links</h3>
                    <ul className="space-y-2 text-gray-300 font-medium text-center md:text-left">
                        <li>
                            <a
                                href="#"
                                onClick={() => navigate('/')}
                                className="hover:text-white transition-colors"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="/#upskill-section"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/#upskill-section");
                                }}
                                className="hover:text-white transition-colors"
                            >
                                About Us
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => navigate('/academy')}
                                className="hover:text-white transition-colors"
                            >
                                Academy
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => navigate('/contact')}

                                className="hover:text-white transition-colors"
                            >
                                Contact
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => navigate('/')}

                                className="hover:text-white transition-colors"
                            >
                                Register
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <h3 className="text-xl font-bold text-[#26a5d8] mb-2">Subscribe</h3>
                    <p className="text-gray-300 font-medium hover:text-white text-center md:text-left">
                        Get updates, career tips & latest courses directly to your inbox.
                    </p>
                    <div className="mt-2 w-full flex flex-col md:flex-col sm:flex-row gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            // onClick={() => navigate('/contact')}
                            className="px-6 py-2 bg-[#2b6aa4] rounded-md text-white font-semibold hover:bg-[#186ca2] transition-colors hover:cursor-pointer">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-10 border-t border-gray-700 py-3 text-center bg-linear-to-r from-[#0a75a9]/10 to-[#45b3de]/10 relative z-10">
                <p className="text-gray-400 font-medium">
                    &copy; {new Date().getFullYear()} LearnBima. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
