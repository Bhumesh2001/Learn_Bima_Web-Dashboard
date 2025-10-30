import React, { useMemo } from "react";

// ---------- Hooks ----------
export default function usePaginated(data, page, limit) {
    return useMemo(() => {
        const total = data.length;
        const totalPages = Math.max(1, Math.ceil(total / limit));
        const start = (page - 1) * limit;
        const items = data.slice(start, start + limit);
        return { items, total, totalPages };
    }, [data, page, limit]);
};
