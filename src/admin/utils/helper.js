// ---------- Helpers ----------
export const uid = () => Math.random().toString(36).slice(2, 9);
export const formatDate = (iso) => new Date(iso).toLocaleString();
export const getErrorMessage = (err) => {
    // ✅ Handle express-validator style errors
    if (Array.isArray(err.response?.data?.errors) && err.response.data.errors.length > 0) {
        return err.response.data.errors[0].message || "Validation error";
    }

    // ✅ Handle general error messages
    if (err.response?.data?.message) return err.response.data.message;

    // ✅ Handle generic JS errors
    if (err.message) return err.message;

    // ✅ Default fallback
    return "An unknown error occurred.";
};
