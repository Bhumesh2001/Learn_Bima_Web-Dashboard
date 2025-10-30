import React from "react";

// ---------- UI Components ----------
export default function Icon({ name, className = "" }) {
    const map = {
        dashboard: "📊",
        podcast: "🎧",
        blog: "📝",
        profile: "👤",
        settings: "⚙️",
    };
    return <span className={`inline-block mr-2 ${className}`}>{map[name] || "🔹"}</span>;
};
