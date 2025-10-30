import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.webp";
import sideImage from "../assets/illustration.jpg";
import { login, getProfile } from '../services/api';
import { notify } from "../utils/notify";

export default function LoginPage({ setLoggedIn }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await login({ email, password });
            if (res.data.success) {
                setLoggedIn(true);
                notify.info("Logged in successful...!");
                navigate("/admin/dashboard");
            } else {
                setError(res.data.message || "Login failed");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const { data } = await getProfile();
                if (data?.admin) {
                    setLoggedIn(true);
                    navigate("/admin/dashboard");
                }
            } catch (err) { }
        };
        checkLogin();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-500 to-indigo-600 p-4">
            {/* Centered container */}
            <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl">
                {/* Left: Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hidden md:flex flex-1"
                >
                    <img
                        src={sideImage}
                        alt="Learn Bima Illustration"
                        className="object-cover w-full h-full"
                    />
                </motion.div>

                {/* Right: Login Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex-1 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14"
                >
                    {/* Logo */}
                    <div className="flex flex-col items-center mb-6">
                        <img src={logo} alt="Learn Bima Logo" className="mb-6" />
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2 text-center">
                            Learn Bima Admin <span className="text-xl sm:text-2xl">✨</span>
                        </h1>
                        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2 text-center">
                            Sign in to your account
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-red-100 text-center mx-6 text-red-700 px-4 py-2 rounded mb-4 text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4 m-6">
                        <div className="relative">
                            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
                                Email
                            </label>
                            <FiMail className="absolute left-3 top-9 text-gray-400 dark:text-gray-300" />
                            <input
                                type="email"
                                id="email"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                placeholder="admin@learnbima.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password with toggle */}
                        <div className="relative">
                            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">
                                Password
                            </label>
                            <FiLock className="absolute left-3 top-9 text-gray-400 dark:text-gray-300" />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className="absolute right-3 top-12 -translate-y-1/2 text-gray-400 hover:cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Sign In Button */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-all font-medium hover:cursor-pointer flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                            ) : null}
                            {loading ? "Signing In..." : "Sign In"}
                        </motion.button>
                    </form>

                    <div className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Learn Bima. All rights reserved.
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
