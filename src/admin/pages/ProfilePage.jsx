import React, { useState, useEffect } from "react";
import ChangePassword from "../components/ChangePassword";
import { Edit2, Camera, Loader2 } from "lucide-react";
import { getProfile, updateProfile, uploadAvatar } from "../services/api";
import Loader from "../components/Loader";
import { notify } from "../utils/notify";
import { getErrorMessage } from "../utils/helper";

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({});
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const { data } = await getProfile();
                setProfile(data.admin);
                setForm(data.admin);
            } catch (err) {
                console.error("Failed to load profile:", err);
                notify.error(getErrorMessage(err));
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, []);

    const save = async () => {
        setSaving(true);
        try {
            const { data } = await updateProfile(form);
            setProfile(data.admin);
            setEditing(false);
            notify.info('Profile Updated Successfully...!');
        } catch (err) {
            console.error("Failed to update profile:", err);
            notify.error(getErrorMessage(err));
        } finally {
            setSaving(false);
        }
    };

    const onAvatar = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("tableName", "Admin");
        formData.append("columnId", profile.id);
        formData.append("flag", false);

        try {
            const { data } = await uploadAvatar(formData);
            setForm({ ...form, avatar: data.imageUrl });
            setProfile({ ...profile, avatar: data.imageUrl });
            notify.success('Avatar Uploaded Successfully...!');
        } catch (err) {
            console.error("Failed to upload avatar:", err);
            notify.err(getErrorMessage(err));
        }
    };

    if (loading) return <Loader message="Loading Profile..." size={2} />;
    if (!profile) return <div className="p-6 text-center text-red-500">Failed to load profile</div>;

    return (
        <div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg space-y-6 transition-all">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Profile</h2>

                {/* Avatar and Info */}
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                        {form.imageUrl ? (
                            <img src={form.imageUrl} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-4xl text-gray-400">
                                👤
                            </div>
                        )}
                        {editing && (
                            <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-all">
                                <Camera className="w-4 h-4 text-white" />
                                <input type="file" accept="image/*" onChange={onAvatar} className="hidden" />
                            </label>
                        )}
                    </div>

                    <div className="flex-1 w-full">
                        <div className="flex items-center justify-between gap-3">
                            <div className="text-xl font-semibold text-gray-800 dark:text-gray-100">{profile.name}</div>
                            <button
                                onClick={() => setEditing(!editing)}
                                className="flex items-center gap-1 px-4 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all hover:cursor-pointer"
                            >
                                <Edit2 className="w-4 h-4" />
                                {editing ? "Cancel" : "Edit"}
                            </button>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{profile.email}</div>
                    </div>
                </div>

                {/* Edit Form */}
                {editing && (
                    <div className="mt-4 space-y-4">
                        <input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                            placeholder="Name"
                        />
                        <input
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                            placeholder="Email"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={save}
                                disabled={saving}
                                className={`px-5 py-2 bg-indigo-600 hover:cursor-pointer text-white rounded-lg transition-all flex items-center gap-2 ${saving ? "opacity-60 cursor-not-allowed" : "hover:bg-indigo-700 hover:shadow-md"}`}
                            >
                                {saving ? <Loader2 className="animate-spin w-5 h-5" /> : "Save Changes"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Change Password Section */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Change Password</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-inner">
                        <ChangePassword />
                    </div>
                </div>
            </div>
        </div>
    );
};
