import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api"; // local
// const API_BASE_URL = "https://learn-bima-dashboard-backend.onrender.com/api"; // live

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// ✅ podcast
export const getPodcasts = (params = {}) => api.get("/podcast", params);
export const getPodcastById = (id) => api.get(`/podcast/${id}`);
export const addPodcast = (data) => api.post("/podcast", data);
export const updatePodcast = (id, data) => api.put(`/podcast/${id}`, data);
export const deletePodcast = (id) => api.delete(`/podcast/${id}`);

// ✅  blog
export const getAllBlogs = (params = {}) => api.get("/blog", params);
export const getBlogById = (id) => api.get(`/blog/${id}`);
export const addBlog = (data) => api.post("/blog", data);
export const updateBlog = (id, data) => api.put(`/blog/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blog/${id}`);
export const getBlogCategories = () => api.get(`/blog/categories`);

// ✅ Login/logout
export const login = (data) => api.post("/admin/login", data);
export const logout = async () => {
    try {
        await api.post("/admin/logout");
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

//✅ profile 
export const getProfile = () => api.get("/admin/profile");
export const updateProfile = (data) => api.put("/admin/profile", data);
export const uploadAvatar = (formData) =>
    api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
export const changePassword = (data) => api.put("/admin/change-password", data);

// ✅ dashboard
export const getDashboardStats = () => api.get("/dashboard/stats");

export default api;
