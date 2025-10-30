import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/api";
import { notify } from "../utils/notify";
import { getErrorMessage } from "../utils/helper";

export default function Header({ onToggleSidebar, admin }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();
    const navigate = useNavigate();

    const handleProfileClick = () => {
        setDropdownOpen(false);
        navigate("/admin/profile");
    };

    const handleLogoutClick = async () => {
        setDropdownOpen(false);
        try {
            await logout();
            notify.success('Logged out successful!');
            navigate("/admin/login");
        } catch (error) {
            console.error("Logout failed:", error);
            notify.error(getErrorMessage(error));
            navigate("/admin/login");
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white sticky top-0 z-50 shadow-md">
            <div className="mx-auto px-4 py-3 flex items-center justify-between">
                {/* Left section: Sidebar toggle + Logo */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 rounded-md bg-white/20 hover:bg-white/30 md:hidden transition"
                        aria-label="Toggle sidebar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className="flex flex-col leading-tight">
                        <span className="font-bold text-lg">Learn Bima</span>
                        <span className="text-xs opacity-80">Admin Panel</span>
                    </div>
                </div>

                {/* Right section: User avatar dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-xl shadow-md focus:outline-none hover:ring-2 hover:ring-white transition hover:cursor-pointer"
                    >
                        {admin?.imageUrl ? (
                            <img src={admin.imageUrl} alt="avatar" draggable={false} className="w-full h-full object-cover rounded-full" />
                        ) : (
                            "👩‍💻"
                        )}
                    </button>

                    {/* Dropdown */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl text-gray-800 overflow-hidden z-50 ring-1 ring-gray-200 animate-fadeIn">
                            {/* Admin Info */}
                            <div className="px-4 py-3 bg-indigo-50 border-b border-gray-200">
                                <div className="font-semibold text-gray-900">{admin?.name || "Admin"}</div>
                                <div className="text-xs text-gray-500 truncate">{admin?.email || "admin@example.com"}</div>
                            </div>

                            {/* Dropdown Items */}
                            <button
                                onClick={() => { setDropdownOpen(false); handleProfileClick(); }}
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-indigo-100 hover:scale-105 transform transition-all duration-150 hover:cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A4 4 0 0112 15a4 4 0 016.879 2.804M12 11a4 4 0 100-8 4 4 0 000 8z" />
                                </svg>
                                Profile
                            </button>

                            <button
                                onClick={() => { setDropdownOpen(false); handleLogoutClick(); }}
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-100 hover:scale-105 transform transition-all duration-150 hover:cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
