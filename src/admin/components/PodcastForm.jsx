import React, { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { notify } from "../utils/notify";
import { getErrorMessage } from "../utils/helper";

export default function PodcastForm({ initial = {}, onSave, onSuccess }) {
    const [form, setForm] = useState(initial);
    const [saving, setSaving] = useState(false);

    useEffect(() => setForm(initial), [initial]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave(form);
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error("Save failed:", err);
            notify.error(getErrorMessage(err));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                {form.id ? "Edit Podcast" : "Create Podcast"}
            </h3>

            <div className="space-y-5">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={form.title || ""}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                        placeholder="Enter podcast title"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                    </label>
                    <textarea
                        value={form.description || ""}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                        rows="4"
                        placeholder="Enter podcast description"
                    />
                </div>

                {/* URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        URL <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={form.url || ""}
                        onChange={(e) => setForm({ ...form, url: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                        placeholder="Enter podcast URL"
                    />
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-2">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-md transition-all hover:cursor-pointer ${saving ? "opacity-60 cursor-not-allowed" : "hover:bg-indigo-700 active:scale-95"}`}
                    >
                        {saving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save size={18} />}
                        {saving ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};
