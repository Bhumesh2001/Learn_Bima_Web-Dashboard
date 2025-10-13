import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Carousel from "./components/Carousel";
import Hero from "./components/Hero";
import Pattern from "./components/Pattern";
import Card from "./components/Card";
import Feature from "./components/Feature";
import AccessLearn from "./components/AccessLearn";
import MeetExpert from "./components/MeetExpert";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Testimonials from './components/Testimonial';
import VideoPodcastGallery from './components/VideoGallary';
import Blog from './components/Blog';
import Header from './components/Header';
import BlogPage from './pages/BlogPage';

export default function App() {
  return (
    <Router>
      <div className="font-sans text-gray-800 bg-white">
        <Header />
        <Routes>
          {/* Home route */}
          <Route path="/" element={
            <>
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
            </>
          } />

          {/* Blog page route */}
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
};
