import React from "react";

export default function ListToolbar({
    onCreate,
    search,
    setSearch,
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 w-full">
            {/* Left Side: Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title..."
                    className="flex-1 min-w-[180px] px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
            </div>

            {/* Right Side: Create Button */}
            <div className="flex justify-end sm:justify-start">
                <button
                    onClick={onCreate}
                    className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 hover:shadow-md transition-all hover:cursor-pointer"
                >
                    + Create
                </button>
            </div>
        </div>
    );
};
