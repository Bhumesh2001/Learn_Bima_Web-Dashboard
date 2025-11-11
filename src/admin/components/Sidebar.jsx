import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "../components/Icon";

export default function Sidebar({ collapsed }) {
    const links = [
        { id: "dashboard", label: "Dashboard", icon: "dashboard", path: "/admin/dashboard" },
        { id: "podcast", label: "Podcasts", icon: "podcast", path: "/admin/podcast" },
        { id: "blog", label: "Blogs", icon: "blog", path: "/admin/blog" },
        { id: "profile", label: "Profile", icon: "profile", path: "/admin/profile" },
        { id: "settings", label: "Settings", icon: "settings", path: "/admin/settings" },
    ];

    const headerHeight = 64;

    return (
        <aside
            className={`fixed left-0 top-[${headerHeight}px] z-40 h-[calc(100vh-${headerHeight}px)] 
        transition-all duration-500 ease-in-out 
        ${collapsed ? "w-0 opacity-0" : "w-64 opacity-100"} 
        bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-r shadow-lg overflow-hidden`}
        >
            <div className="flex flex-col h-full pt-6">
                {/* Navigation Links */}
                <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                    {links.map((l) => (
                        <NavLink
                            key={l.id}
                            to={l.path}
                            draggable={false}
                            className={({ isActive }) =>
                                `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 text-sm group
                            ${isActive
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400"}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <div
                                        draggable={false}
                                        className={`flex items-center justify-center w-8 h-8 rounded-md transition-all duration-300
                                            ${isActive
                                                ? "bg-indigo-500 text-white"
                                                : "bg-gray-100 dark:bg-gray-700 group-hover:bg-indigo-100 dark:group-hover:bg-gray-600"
                                            }`}
                                    >
                                        <Icon name={l.icon} />
                                    </div>
                                    <span className="font-medium">{l.label}</span>
                                </>
                            )}
                        </NavLink>

                    ))}
                </nav>

                {/* Footer Info */}
                <div className="px-4 py-4 text-xs text-center text-gray-500 dark:text-gray-400 border-t dark:border-gray-700">
                    <p>Version 1.0</p>
                    <p className="italic mt-1 text-[11px] text-gray-300 dark:text-gray-400">
                        Keep improving every day ✨
                    </p>
                </div>
            </div>
        </aside>
    );
};
