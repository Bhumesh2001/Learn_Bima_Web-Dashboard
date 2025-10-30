import React from "react";

// ---------- Pagination ----------
export default function Pagination({ page, setPage, totalPages }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div className="flex gap-1 items-center justify-center mt-6">
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 rounded-md border hover:cursor-pointer"
            >
                Prev
            </button>
            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1 rounded-md border hover:cursor-pointer ${p === page ? "bg-indigo-600 text-white" : ""
                        }`}
                >
                    {p}
                </button>
            ))}
            <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 rounded-md border hover:cursor-pointer"
            >
                Next
            </button>
        </div>
    );
};
