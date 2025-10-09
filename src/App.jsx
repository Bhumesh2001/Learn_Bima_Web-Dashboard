import React, { useState, useEffect } from 'react';
import {
  BookOpen, Users, Layers, Linkedin,
  Instagram, Facebook, Zap, Shield, MessageSquare, Clipboard, Monitor, BriefcaseBusiness,
  GraduationCap, Mail, Phone
} from 'lucide-react';
import logo from './assets/LBlogo.webp';
import image1 from "./assets/lb1.webp"
import Testimonials from './components/Testimonial';
import VideoPodcastGallery from './components/VideoGallary';
// import ImageGallery from './components/Gallary'

import img8 from './assets/img1.jpeg'
import img7 from './assets/img2.jpeg'
import img6 from './assets/img3.jpeg'
import img5 from './assets/img4.jpeg'
import img4 from './assets/img5.jpeg'
import img3 from './assets/img6.jpeg'
import img2 from './assets/img7.jpeg'
import img1 from './assets/img8.jpeg'
import team from './assets/team.webp'
import slide1 from './assets/E1.jpeg';
import slide2 from './assets/S2.jpeg';
import slide3 from './assets/I3.jpeg';
import bgimg from './assets/bgimg.jpg';

const App = () => {
  const slides = [
    {
      id: 1,
      // image: "https://picsum.photos/id/1015/800/400",
      image: slide1,
      title: "Empower Your Future with LearnBima",
      description: "Upskill in insurance and financial planning to build a stable career.",
      link: "#"
    },
    {
      id: 2,
      // image: "https://picsum.photos/id/1016/800/400",
      image: slide2,
      title: "Start Your Journey to Financial Freedom",
      description: "Join our courses and earn passive income through knowledge.",
      link: "#"
    },
    {
      id: 3,
      // image: "https://picsum.photos/id/1018/800/400",
      image: slide3,
      title: "India's Leading Insurance Learning Platform",
      description: "Learn from experts, get certified, and secure your professional growth.",
      link: "#"
    }
  ];

  const images = [
    { src: img1, alt: 'A beautiful sunset over the mountains.' },
    { src: img2, alt: 'A tranquil forest scene with a flowing river.' },
    { src: img3, alt: 'An old, rustic cobblestone street in Europe.' },
    { src: img4, alt: 'A modern, minimalist office space with plants.' },
    { src: img5, alt: 'A vibrant cityscape at night.' },
    { src: img6, alt: 'A delicate flower with dew drops on its petals.' },
    { src: img7, alt: 'A cup of coffee with a perfect latte art design.' },
    { src: img8, alt: 'A cute puppy sitting in a field of sunflowers.' },
  ];

  const [current, setCurrent] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const controlHeader = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // scroll down -> hide
        setShowHeader(false);
      } else {
        // scroll up -> show
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // 4 seconds

    return () => clearInterval(interval); // cleanup
  }, [slides.length]);

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-lg shadow-md transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-10 flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-18 h-18 sm:w-20 sm:h-20 flex-shrink-0">
              <img
                src={logo}
                alt="LearnBima Logo"
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
            {["Home", "About Us", "Team", "Academy", "Contact Us"].map((item, i) => (
              <a
                key={i}
                href="#"
                className="relative group transition-colors duration-300 hover:text-[#0a75a9]"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#0a75a9] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <button className="hidden md:block px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#0a75a9] to-[#094e7a] shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer">
            Register Now
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800 hover:text-[#0a75a9] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-white/70 backdrop-blur-xl border-t border-gray-200 shadow-lg overflow-hidden transform transition-all duration-500 ease-in-out ${isOpen ? "max-h-[400px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"
            }`}
        >
          <nav className="flex flex-col p-5 space-y-5 text-gray-800 font-medium">
            {["Home", "About Us", "Team", "Academy", "Contact Us"].map((item, i) => (
              <a
                key={i}
                href="#"
                className="hover:text-[#0a75a9] transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}

            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#0a75a9] to-[#094e7a] shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Register Now
            </button>
          </nav>
        </div>
      </header>

      {/* main */}
      <main>
        {/* Carousel */}
        <div className="relative w-full mx-auto overflow-hidden rounded-2xl shadow-2xl h-[650px]">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[650px] object-cover animate-slowZoom"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end items-start p-8">
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-gray-200 text-lg max-w-2xl mb-6 drop-shadow-md">
                  {slide.description}
                </p>
                <a
                  href={slide.link}
                  className="mt-2 px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-[#0a75a9] to-[#094e7a] shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}

          {/* Navigation Buttons */}
          {/* <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-all duration-300 shadow-md hover:cursor-pointer"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-all duration-300 shadow-md hover:cursor-pointer"
          >
            <ChevronRight size={28} />
          </button> */}

          {/* Dots Indicator */}
          {/* <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === current ? "bg-[#0a75a9] scale-125" : "bg-gray-400/60"
                  }`}
              ></button>
            ))}
          </div> */}
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#f0f9ff] to-[#ffffff] text-gray-800 overflow-hidden py-10">
          <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
            {/* Left content */}
            <div className="md:w-1/2 text-center md:text-left space-y-6">
              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#0a75a9] to-[#45b3de] tracking-tight">
                Learn Bima UpSkill
              </h1>

              {/* Subtitle / Highlight */}
              <p className="text-2xl sm:text-3xl font-semibold text-gray-700 tracking-wide">
                Insurance Licensing Course
              </p>

              {/* Description with emphasis */}
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg">
                <span className="font-semibold text-[#0a75a9]">Grind now, sparkle later.</span>
                Be financially independent today and build a steady stream of passive income for your future.
              </p>

              {/* Mission Statement */}
              <p className="text-gray-800 text-lg sm:text-xl font-medium max-w-lg">
                Our mission is to expand your learning horizon and help aspiring generations
                plan their careers toward <span className="text-[#45b3de] font-semibold">self-reliance</span>.
              </p>

              {/* Optional Call-to-Action Button */}
              <div className="mt-6">
                <a
                  href="#courses"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-[#0a75a9] to-[#45b3de] text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  Explore Courses
                </a>
              </div>
            </div>

            {/* Right image */}
            <div className="md:w-1/2 flex justify-center relative">
              {/* Decorative Blur Circle */}
              <div className="absolute -top-20 -right-16 w-[450px] h-[450px] bg-[#0a75a9]/10 rounded-full blur-3xl"></div>

              {/* Animated Image */}
              <img
                src={image1}
                alt="Illustration"
                className="relative z-10 w-[90%] sm:w-[28rem] md:w-[34rem] lg:w-[40rem] object-contain drop-shadow-2xl rounded-2xl animate-float"
                draggable={false}
              />
            </div>
          </div>
        </section>

        {/* Section with background pattern */}
        <section className="relative py-15 px-6 sm:px-12 bg-[#050D1C] overflow-hidden">
          {/* Animated Background Image */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center animate-slowZoom opacity-40"
            style={{
              backgroundImage: `url('${bgimg}')`, // Use local image
            }}
          ></div>

          {/* Subtle Grid Overlay */}
          <div
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          ></div>

          {/* Content */}
          <div className="relative container mx-auto text-center z-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
              Learn. Train. Get Certified.
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Our platform gives you unlimited access to insurance licensing courses, practical training, and a job-ready recruitment portal — all for one simple registration price.
            </p>
          </div>
        </section>

        {/* New 4-Card Section */}
        <section className="py-15 px-6 sm:px-12 bg-gradient-to-b from-[#f5faff] to-[#e0f0ff]">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-[#0a75a9]">
              DREAM BIG! ACT NOW!
            </h1>
            <p className="text-gray-700 mb-2 max-w-2xl mx-auto text-xl font-semibold">
              We provide an exclusive career platform for
            </p>
            <h2 className="text-[#0a75a9] hover:text-black text-2xl font-bold mb-12 italic transition-colors duration-300">
              Building Insurance Agents
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
              {[
                {
                  icon: Monitor,
                  title: "Screening",
                  desc: "Every candidate is expected to go through a psychometric and basic domain knowledge evaluation before enrolling."
                },
                {
                  icon: Users,
                  title: "Training",
                  desc: "Study with a partner. Receive personalized guidance from our highly qualified staff, who provide in-depth knowledge of insurance products and processes."
                },
                {
                  icon: GraduationCap,
                  title: "Program",
                  desc: "We teach complicated concepts in a clear, jargon-free manner through our government-approved insurance licensure and exam prep courses."
                },
                {
                  icon: BriefcaseBusiness,
                  title: "Job Portal",
                  desc: "We offer plenty of opportunities to grow your career. Choose from becoming an insurance professional to a salaried financial advisor in banking sector."
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative group p-8 rounded-3xl bg-white shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 text-center flex flex-col items-center"
                >
                  {/* Icon with gradient hover */}
                  <div className="relative mb-5 w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0a75a9]/40 via-[#45b3de]/30 to-[#094e7a]/40 blur-xl opacity-70 transition-all duration-500 group-hover:scale-110"></div>
                    <div className="relative z-10 p-5 rounded-full bg-gradient-to-r from-[#0a75a9] to-[#094e7a] text-white flex items-center justify-center group-hover:from-[#45b3de] group-hover:to-[#0a75a9] transition-all duration-500">
                      <item.icon size={40} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[#0a75a9] group-hover:text-[#45b3de] transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 text-base leading-relaxed">{item.desc}</p>

                  {/* Decorative Glow Shape */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-16 bg-gradient-to-r from-[#0a75a9]/20 via-[#45b3de]/20 to-[#094e7a]/20 rounded-full blur-3xl opacity-50 z-0"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* podcast video gallary */}
        <VideoPodcastGallery />

        {/* Features + Embedded YouTube Podcast Cards */}
        <section className="py-15 px-6 sm:px-12 bg-gradient-to-b from-[#f0f8ff] to-[#e0f4ff]">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-[#0a75a9]">
              The <span className="text-[#45b3de] hover:text-black transition-colors">Learn Bima</span> upskill vision goes <span className="text-[#45b3de] hover:text-black transition-colors">beyond</span> careers
            </h2>
            <p className="text-gray-700 mb-12 max-w-2xl mx-auto text-lg sm:text-xl">
              We offer top-notch digital learning experiences to equip employees with the ability to leverage data-driven knowledge to drive results.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Clipboard,
                  title: "Psychometric Evaluation",
                  caption: "Learn how to evaluate personality traits.\nUnderstand cognitive skills assessment."
                },
                {
                  icon: MessageSquare,
                  title: "Selling Strategies",
                  caption: "Master the art of selling insurance.\nBoost your performance and reach clients effectively."
                },
                {
                  icon: Shield,
                  title: "Essentials",
                  caption: "Understand core insurance concepts.\nHandle client requirements confidently."
                },
                {
                  icon: Zap,
                  title: "Objection Handling",
                  caption: "Handle client objections professionally.\nGain confidence and increase conversions."
                },
                {
                  icon: BookOpen,
                  title: "Corporate Basics",
                  caption: "Understand business trends in insurance.\nStay updated with the corporate landscape."
                },
                {
                  icon: Layers,
                  title: "Domain Knowledge",
                  caption: "Gain deep knowledge of insurance products.\nLearn concepts that drive results."
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative p-8 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500 bg-gradient-to-br from-white/80 to-white/90 backdrop-blur-md flex flex-col items-center text-center"
                >
                  {/* Gradient Icon Circle */}
                  <div className="relative mb-5 w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0a75a9]/50 via-[#45b3de]/40 to-[#094e7a]/50 blur-xl animate-animateGradient"></div>
                    <div className="relative z-10 p-5 rounded-full bg-gradient-to-r from-[#0a75a9] to-[#094e7a] text-white flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                      <item.icon size={40} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold mb-3 text-[#0a75a9] group-hover:text-[#45b3de] transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Caption */}
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {item.caption}
                  </p>

                  {/* Decorative gradient shape */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-16 bg-gradient-to-r from-[#0a75a9]/20 via-[#45b3de]/20 to-[#094e7a]/20 rounded-full blur-3xl opacity-70 z-0"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Access to the Learning Platform Section */}
        <section className="py-15 px-5 sm:px-10 md:px-20 bg-gradient-to-b from-[#f5f9ff] to-[#e0f4ff]">
          <div className="container mx-auto flex flex-col items-center gap-10">
            {/* Top: Image and Text */}
            <div className="w-full flex flex-col lg:flex-row items-center lg:items-center justify-between gap-10">

              {/* Image */}
              <div className="w-full lg:w-1/2 relative h-80 sm:h-96 flex justify-center">
                <div className="absolute -inset-5 bg-gradient-to-tr from-[#0a75a9]/20 via-[#45b3de]/20 to-[#0a75a9]/20 rounded-2xl blur-3xl animate-animateGradient"></div>
                <img
                  src={team}
                  alt="Three people collaborating"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl relative z-10"
                />
              </div>

              {/* Text */}
              <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start gap-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0a75a9] leading-snug">
                  Access the learning <br /> platform & explore endless opportunities
                </h2>
                <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl">
                  Selling insurance has no earning limit if you are passionate and dedicated. Explore a wide range of insurance products—life, health, auto, accident, home, and more. Nothing is more rewarding than providing peace of mind. Access our platform and join the clan of high earners.
                </p>
              </div>
            </div>

            {/* Stats Cards: Always below image on all screen sizes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 w-full max-w-5xl">
              {[
                { value: "300K", label: "Students Registered", gradient: "from-[#0a75a9] to-[#45b3de]" },
                { value: "95%", label: "Training Completed", gradient: "from-[#45b3de] to-[#0a75a9]" },
                { value: "20K", label: "Students Placed", gradient: "from-[#0a75a9] to-[#094e7a]" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 text-center flex flex-col items-center gap-2 transition-all duration-500"
                >
                  <div className={`text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <p className="text-gray-700 font-semibold text-sm sm:text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <section>
          <ImageGallery images={images} />
        </section> */}

        {/* Meet the Experts Section */}
        <section className="py-15 px-5 sm:px-10 md:px-20 bg-gradient-to-b from-[#f5f9ff] to-[#e0f4ff] relative overflow-hidden">
          {/* Subtle background pattern */}
          <div
            className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          ></div>

          <div className="container mx-auto text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-[#0a75a9]">
              Our Knowledge Partners
            </h2>
            <p className="text-gray-700 mb-12 sm:mb-16 max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
              Meet our trainers, creators, designers, subject matter experts & world-class problem solvers.
            </p>

            {/* Experts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              {[
                {
                  name: "Dilip Kumar Sharma",
                  role: "Author, L&D Solutions People Manager, E-learning Content Consulting Sales and Development mentoring",
                  img: "https://placehold.co/300x300/1D4ED8/FFFFFF?text=Dilip",
                  linkedin: "#"
                },
                {
                  name: "Deepak Bhardwaj",
                  role: "Freelance Trainer & Founder Deknutterts Learning Solutions",
                  img: "https://placehold.co/300x300/1D4ED8/FFFFFF?text=Deepak",
                  linkedin: "#"
                },
                {
                  name: "Coach Nitin Rishi",
                  role: "PHD | Head coach CLUNICE CCE Certified Life and Executive Coach - Leadership Development Coach - Author",
                  img: "https://placehold.co/300x300/1D4ED8/FFFFFF?text=Coach",
                  linkedin: "#"
                }
              ].map((expert, idx) => (
                <div
                  key={idx}
                  className="relative p-6 rounded-3xl bg-white shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center"
                >
                  {/* Gradient overlay behind image */}
                  <div className="absolute -top-8 -left-8 w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-tr from-[#0a75a9] via-[#45b3de] to-[#0a75a9] rounded-full opacity-30 blur-3xl animate-animateGradient"></div>

                  <img
                    src={expert.img}
                    alt={expert.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full border-4 border-white shadow-lg mb-4 object-cover relative z-10"
                  />

                  <h3 className="text-lg sm:text-xl font-bold text-[#0a75a9] hover:text-[#45b3de] mb-2 transition-colors">
                    {expert.name}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-sm md:text-base mb-4">{expert.role}</p>

                  <div className="mt-4 flex justify-center space-x-4">
                    <a
                      href={expert.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-3 rounded-full border border-gray-300 hover:border-[#0a75a9] transition-all duration-300"
                      aria-label="LinkedIn"
                    >
                      <Linkedin
                        size={28}
                        className="text-gray-600 group-hover:text-[#0a75a9] transition-colors duration-300"
                      />
                      {/* Glow Effect */}
                      <span className="absolute inset-0 rounded-full bg-[#0a75a9]/10 scale-0 group-hover:scale-110 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500"></span>
                    </a>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-10 relative overflow-hidden">
        {/* Wave Shape on top */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-current text-gray-900"
            ></path>
          </svg>
        </div>

        {/* Footer Content */}
        <div className="container mx-auto px-6 sm:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          {/* Logo & About */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <img
              src={logo}
              alt="LearnBima Logo"
              className="w-28 h-28 object-contain"
              draggable={false}
            />
            <p className="text-gray-300 font-medium hover:text-white text-center md:text-left">
              LearnBima provides top-notch insurance training, career guidance, and recruitment support for aspiring agents.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-2">
              {/* Facebook */}
              <a
                href="#"
                className="p-3 rounded-full border border-gray-600 hover:border-blue-500 transition-all duration-300"
              >
                <Facebook
                  size={20}
                  className="text-gray-300 hover:text-blue-500 transition-colors duration-300"
                />
              </a>

              {/* X (Twitter) */}
              <a
                href="#"
                className="p-3 rounded-full border border-gray-600 hover:border-white transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="text-gray-300 hover:text-white transition-colors duration-300 w-5 h-5"
                >
                  <path d="M18.9 2H22l-9.9 11.5L22 22h-3.1l-7.7-8.5L3.5 22H.4l10.7-12.4L.4 2h3.2l7.2 8.1L18.9 2z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="p-3 rounded-full border border-gray-600 hover:border-blue-600 transition-all duration-300"
              >
                <Linkedin
                  size={20}
                  className="text-gray-300 hover:text-blue-600 transition-colors duration-300"
                />
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="p-3 rounded-full border border-gray-600 hover:border-pink-500 transition-all duration-300"
              >
                <Instagram
                  size={20}
                  className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
                />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-xl font-bold text-[#26a5d8] mb-2">Contact Us</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-[#26a5d8]" />
                <a href="mailto:info@learnbima.com" className="text-gray-300 font-medium hover:text-white hover:underline">
                  info@learnbima.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-[#26a5d8]" />
                <a href="tel:+917981563903" className="text-gray-300 font-medium hover:text-white hover:underline">
                  +91-7981563903
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-xl font-bold text-[#26a5d8] mb-2">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 font-medium text-center md:text-left">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Academy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Register</a></li>
            </ul>
          </div>

          {/* Extra Features / Newsletter */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-xl font-bold text-[#26a5d8] mb-2">Subscribe</h3>
            <p className="text-gray-300 font-medium hover:text-white text-center md:text-left">
              Get updates, career tips & latest courses directly to your inbox.
            </p>
            <div className="mt-2 w-full flex flex-col md:flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="px-6 py-2 bg-[#2b6aa4] rounded-md text-white font-semibold hover:bg-[#186ca2] transition-colors hover:cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-gray-700 py-4 text-center bg-gradient-to-r from-[#0a75a9]/10 to-[#45b3de]/10 relative z-10">
          <p className="text-gray-400 font-medium">&copy; 2025 LearnBima. All rights reserved.</p>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/917981563903" // replace with your WhatsApp number with country code
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-green-500 hover:bg-green-600 transition-colors shadow-lg rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center z-50"
        aria-label="Chat on WhatsApp"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-6 h-6 sm:w-8 sm:h-8"
        />
      </a>
    </div>
  );
};

export default App;
