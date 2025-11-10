import React, { useState, useEffect, useCallback } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PodcastForm from "../components/PodcastForm";
import Pagination from "../components/Pagination";
import ListToolbar from "../components/ListToolbar";
import Modal from "../components/Modal";
import { formatDate } from "../utils/helper";
import DeleteModal from '../components/DeleteModal';
import Loader from "../components/Loader";
import {
    getPodcasts,
    addPodcast,
    updatePodcast,
    deletePodcast,
} from "../services/api";
import { notify } from "../utils/notify";
import { getErrorMessage } from "../utils/helper";
import useDebounce from '../hooks//UseDebounce';

export default function PodcastPage() {
    const [podcasts, setPodcasts] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(9);
    const [search, setSearch] = useState("");
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [Total, setTotal] = useState(0);

    // ✅ Debounce search to reduce API calls
    const debouncedSearch = useDebounce(search, 500);

    // ✅ Fetch podcasts from backend (with filters)
    const fetchPodcasts = useCallback(async () => {
        try {
            setLoading(true);
            const params = {
                page,
                limit,
                ...(debouncedSearch && { title: debouncedSearch }),
            };
            const res = await getPodcasts({ params });
            setPodcasts(res.data.data || []);
            setTotal(res.data.total || 0);
        } catch (error) {
            console.error("Failed to fetch podcasts:", error);
            notify.error(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }, [debouncedSearch, page, limit]);

    // ✅ Trigger fetch when dependencies change
    useEffect(() => {
        fetchPodcasts();
    }, [fetchPodcasts]);

    // ✅ Reset page when filters change
    useEffect(() => setPage(1), [search]);

    // ✅ Create new podcast
    const create = () => {
        setEditing({ title: "", description: "", url: "" });
        setShowForm(true);
    };

    // save podcast
    const save = async (data) => {
        try {
            if (data.id) {
                await updatePodcast(data.id, data);
                notify.info("Podcast Updated Successfully...!");
            } else {
                await addPodcast(data);
                notify.success("Podcast Created Successfully...!");
            }
        } catch (error) {
            console.error("Failed to save podcast:", error);
            notify.error(getErrorMessage(error));
        } finally {
            setShowForm(false);
            setEditing(null);
        }
        await fetchPodcasts();
    };

    // ✅ Delete podcast
    const del = async (id) => {
        try {
            await deletePodcast(id);
            notify.success("Podcast Deleted Sucessfully...!");
        } catch (error) {
            console.error("Failed to delete podcast:", error);
            notify.error(getErrorMessage(error));
        } finally {
            setShowDelete(false);
            setSelectedId(null);
        }
        await fetchPodcasts();
    };

    const totalPages = Math.ceil(Total / limit);

    if (loading) return <Loader message="Loading Podcast..." size={2} />;

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-6"
        >
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    Podcasts <span className="text-sm text-gray-500">({Total})</span>
                </h2>
            </div>

            {/* Toolbar */}
            <ListToolbar
                onCreate={create}
                search={search}
                setSearch={setSearch}
            />

            {/* Podcast Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-4">
                {podcasts.length > 0 ? (
                    podcasts.map((p) => (
                        <motion.article
                            key={p.id}
                            className="p-5 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 transition-transform hover:-translate-y-1 hover:shadow-md"
                            whileHover={{ y: -4 }}
                        >
                            <div className="flex justify-between items-start">
                                <div className="pr-3">
                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                                        {p.title}
                                    </h3>
                                    <div className="text-sm text-gray-500 mb-2">
                                        By {p.author || "Unknown"} • {formatDate(p.createdAt)}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                                        {p.description || "No description available."}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => { setEditing(p); setShowForm(true); }}
                                        className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition hover:cursor-pointer"
                                        title="Edit"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedId(p.id); // set the current item id
                                            setShowDelete(true);   // open the modal
                                        }}
                                        className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition hover:cursor-pointer"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No podcasts found.
                    </div>
                )}
            </div>

            {/* delete modal */}
            <DeleteModal
                isOpen={showDelete}
                onClose={() => setShowDelete(false)}
                onConfirm={async () => {
                    setDeleteLoading(true);
                    try {
                        await del(selectedId);
                    } finally {
                        setDeleteLoading(false);
                    }
                }}
                loading={deleteLoading} // pass loading prop to modal
                title="Delete Podcast?"
                message="Are you sure you want to delete this podcast? This action cannot be undone."
            />

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6">
                    <Pagination page={page} setPage={setPage} totalPages={totalPages} />
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {showForm && (
                    <Modal
                        onClose={() => {
                            setShowForm(false);
                            setEditing(null);
                        }}
                    >
                        <PodcastForm initial={editing} onSave={save} onSuccess={fetchPodcasts} />
                    </Modal>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
