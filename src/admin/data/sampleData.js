import { uid } from '../utils/helper';

export const samplePodcasts = Array.from({ length: 18 }).map((_, i) => ({
    _id: uid(),
    title: `Podcast Episode ${i + 1}`,
    description: `A short description for episode ${i + 1}`,
    author: i % 2 ? "Alex" : "Maya",
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    audioUrl: "",
}));

export const sampleBlogs = Array.from({ length: 23 }).map((_, i) => ({
    _id: uid(),
    title: `Blog Post ${i + 1}`,
    author: i % 3 === 0 ? "Priya" : i % 3 === 1 ? "Rahul" : "Anita",
    category: ["Health", "Finance", "Education"][i % 3],
    excerpt: `This is a short excerpt for blog ${i + 1}`,
    content: `Long content for blog ${i + 1}`,
    createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
}));

export const defaultProfile = {
    name: "Admin",
    email: "admin@learnbima.test",
    avatar: "", // base64 data or image url
};