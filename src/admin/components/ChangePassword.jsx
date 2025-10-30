import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { changePassword } from "../services/api";
import { notify } from "../utils/notify";
import { getErrorMessage } from "../utils/helper";

// ✅ Move outside parent
const PasswordField = React.memo(({ value, setValue, placeholder, show, toggleShow, disabled }) => (
    <div className="relative w-full">
        <input
            type={show ? "text" : "password"}
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 mb-2 border rounded pr-10"
            disabled={disabled}
        />
        <button
            type="button"
            onClick={toggleShow}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
        >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
    </div>
));

export default function ChangePassword() {
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [loading, setLoading] = useState(false);

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const submit = async () => {
        if (!newPass || newPass !== confirmPass) return notify.info("Passwords do not match");

        setLoading(true);
        try {
            const res = await changePassword({ oldPassword: oldPass, newPassword: newPass });
            notify.success(res.data.message || "Password changed successfully");
            setOldPass(""); setNewPass(""); setConfirmPass("");
        } catch (err) {
            console.error(err);
            notify.error(getErrorMessage(err) || "Failed to change password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-2 space-y-2">
            <PasswordField value={oldPass} setValue={setOldPass} placeholder="Old password" show={showOld} toggleShow={() => setShowOld(prev => !prev)} disabled={loading} />
            <PasswordField value={newPass} setValue={setNewPass} placeholder="New password" show={showNew} toggleShow={() => setShowNew(prev => !prev)} disabled={loading} />
            <PasswordField value={confirmPass} setValue={setConfirmPass} placeholder="Confirm new password" show={showConfirm} toggleShow={() => setShowConfirm(prev => !prev)} disabled={loading} />

            <div className="flex justify-end">
                <button
                    onClick={submit}
                    disabled={loading}
                    className={`px-3 py-2 bg-indigo-600 hover:cursor-pointer text-white rounded flex items-center gap-2 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                    {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Change"}
                </button>
            </div>
        </div>
    );
};
