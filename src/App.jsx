import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./admin/components/Header";
import Sidebar from "./admin/components/Sidebar";
import Footer from "./admin/components/Footer";
import ProtectedRoute from "./admin/routes/ProtectedRoute";
import { getProfile } from "./admin/services/api";

// Web components
import Carousel from "./web/components/Carousel";
import Hero from "./web/components/Hero";
import Pattern from "./web/components/Pattern";
import Card from "./web/components/Card";
import Feature from "./web/components/Feature";
import AccessLearn from "./web/components/AccessLearn";
import MeetExpert from "./web/components/MeetExpert";
import Testimonials from "./web/components/Testimonial";
import VideoPodcastGallery from "./web/components/VideoGallary";
import Blog from "./web/components/Blog";
import HeaderWeb from "./web/components/Header";
import FooterWeb from "./web/components/Footer";
import WhatsAppButton from "./web/components/WhatsAppButton";
import BlogPageWeb from "./web/pages/BlogPage";
import BlogDetailsPage from "./web/pages/BlogDetailsPage";
import Academy from "./web/pages/Academy";
import ContactUs from "./web/pages/ContactUs";

// Admin pages
import Dashboard from "./admin/pages/Dashboard";
import PodcastPage from "./admin/pages/PodcastPage";
import BlogPage from "./admin/pages/BlogPage";
import ProfilePage from "./admin/pages/ProfilePage";
import SettingPage from "./admin/pages/SettingPage";
import LoginPage from "./admin/pages/LoginPage";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [settings, setSettings] = useState({
    maintenance: false,
    registration: true,
  });

  // ✅ Fetch admin profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await getProfile();
        setProfile(data.admin);
        setLoggedIn(true);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  return (
    <Router>
      <Routes>
        {/* ---------------------- 🌐 WEB ROUTES ---------------------- */}
        <Route
          path="/"
          element={
            <>
              <HeaderWeb />
              <main>
                <Carousel />
                <Hero />
                <Pattern />
                <Card />
                <Blog />
                <VideoPodcastGallery />
                <Feature />
                <AccessLearn />
                <MeetExpert />
                <Testimonials />
              </main>
              <FooterWeb />
              <WhatsAppButton />
            </>
          }
        />
        <Route path="/blog" element={<BlogPageWeb />} />
        <Route path="/blogs/:id" element={<BlogDetailsPage />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* ---------------------- 🧑‍💻 ADMIN ROUTES ---------------------- */}
        <Route path="/admin/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute isAuthenticated={loggedIn}>
              <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-300">
                <header className="fixed top-0 left-0 w-full z-40">
                  <Header onToggleSidebar={() => setCollapsed(!collapsed)} admin={profile} />
                </header>

                <main className="flex flex-1 pt-16">
                  <aside
                    className={`bg-white dark:bg-gray-800 shadow-md border-r fixed md:static top-16 left-0 h-[calc(100vh-64px)] transition-all duration-300 z-30
                      ${collapsed ? "-ml-64" : "w-64 hidden lg:flex flex-col"}`}
                  >
                    <Sidebar collapsed={collapsed} />
                  </aside>

                  <section className="flex-1 overflow-y-auto p-4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={window.location.pathname}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Routes>
                          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/podcast" element={<PodcastPage />} />
                          <Route path="/blog" element={<BlogPage />} />
                          <Route path="/profile" element={<ProfilePage />} />
                          <Route path="/settings" element={<SettingPage settings={settings} setSettings={setSettings} />} />
                          <Route path="*" element={<div>404 - Page Not Found</div>} />
                        </Routes>
                      </motion.div>
                    </AnimatePresence>
                    <Footer />
                  </section>
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* notify */}
      <ToastContainer
        position="top-right"
        autoClose={3000} // 3 seconds
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark" // light, dark, or colored
      />
    </Router>
  );
};
