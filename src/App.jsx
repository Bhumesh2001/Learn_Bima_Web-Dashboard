import React, { useState, useEffect } from 'react';
import {
  BookOpen, Users, Layers, Linkedin, Twitter,
  Instagram, Facebook, Zap, Shield, MessageSquare, Clipboard, Monitor, BriefcaseBusiness,
  GraduationCap, ChevronLeft, ChevronRight, Mail, Phone, Star
} from 'lucide-react';
import logo from './assets/LBlogo.webp';
import image1 from "./assets/lb1.webp"
import Testimonials from './components/Testimonial'
// import ImageGallery from './components/Gallary'

import img8 from './assets/img1.jpeg'
import img7 from './assets/img2.jpeg'
import img6 from './assets/img3.jpeg'
import img5 from './assets/img4.jpeg'
import img4 from './assets/img5.jpeg'
import img3 from './assets/img6.jpeg'
import img2 from './assets/img7.jpeg'
import img1 from './assets/img8.jpeg'

const App = () => {
  const slides = [
    {
      id: 1,
      image: "https://picsum.photos/id/1015/800/400",
      title: "Slide One",
      description: "This is the first slide description.",
      link: "#"
    },
    {
      id: 2,
      image: "https://picsum.photos/id/1016/800/400",
      title: "Slide Two",
      description: "This is the second slide description.",
      link: "#"
    },
    {
      id: 3,
      image: "https://picsum.photos/id/1018/800/400",
      title: "Slide Three",
      description: "This is the third slide description.",
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

  const prevSlide = () =>
    setCurrent(current === 0 ? slides.length - 1 : current - 1);

  const nextSlide = () =>
    setCurrent(current === slides.length - 1 ? 0 : current + 1);

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000); // 4 seconds

    return () => clearInterval(interval); // cleanup
  }, [slides.length]);

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Header */}
      <header className="p-3 sm:px-12 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2">
          {/* Logo */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0">
            <img
              src={logo}
              alt="LearnBima Logo"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
        </div>

        <nav className="hidden md:flex space-x-8 font-medium">
          <a href="#" className="text-blue-600 font-bold">Home</a>
          <a href="#" className="hover:text-blue-600 transition-colors">About Us</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Team</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Academy</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a>
        </nav>

        <button className="hidden md:block px-6 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors font-semibold shadow-lg">
          Register Now
        </button>

        {/* Mobile menu button */}
        <button className="md:hidden text-gray-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </header>

      {/* main */}
      <main>
        {/* Carousel */}
        <div className="relative w-full mx-auto overflow-hidden shadow-xl h-[500px]">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${index === current ? "opacity-100" : "opacity-0"
                }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[500px] object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end items-start p-6">
                <a
                  href={slide.link}
                  className="mt-4 px-5 py-3 rounded-3xl bg-blue-600 text-white hover:bg-blue-700 transition font-bold"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute hover:cursor-pointer top-1/2 left-3 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute hover:cursor-pointer top-1/2 right-3 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Hero Section */}
        <section className="relative text-black pt-15 pb-15 lg:pt-20 lg:pb-20 overflow-hidden px-15">
          <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-blue-500">
                Learn Bima UpSkill
              </h1>
              <p className="text-lg text-gray-500 mb-8 font-bold">
                Insurance licensing course
              </p>
              <p className="text-gray-500 mb-4 text-lg">
                Grind now, Sparkle later<br />
                Be financially independent today and earn plenty of passive income for your future
              </p>
              <p className="mb-8 text-lg font-bold text-gray-600">
                Our mission is to expand your learning horizon and help aspiring generations to plan their careers in becoming Self Reliant.
              </p>
            </div>

            <div className="relative w-full md:w-1/2 flex justify-center mt-12 md:mt-0">
              {/* Image */}
              <div className="relative z-10 w-full h-full sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[36rem] lg:h-[36rem] flex items-center justify-center">
                <img
                  src={image1}
                  alt="Illustration"
                  className="w-full h-full object-contain rounded-lg"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section with background pattern */}
        <section className="py-16 px-4 sm:px-10 bg-[#050D1C] relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <div className="relative container mx-auto text-center z-10">
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto mb-4">
              Our novel platform provides unlimited access to Insurance licensing courses, hands on training and recruitment portal for one all registration price
            </p>
          </div>
        </section>

        {/* New 4-Card Section from images */}
        <section className="py-20 md:px-15 sm:px-10">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              DREAM BIG! ACT NOW!
            </h1>
            <p className="text-gray-800 mb-4 max-w-2xl mx-auto text-xl font-semibold">
              We provide an exclusive career platform for
            </p>
            <h2 className='text-blue-500 hover:text-black text-xl font-bold mb-10 italic '>
              Building Insurance Agent
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Screening Card */}
              <div className="p-8 rounded-xl border border-gray-200 shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-blue-100 text-blue-500 mb-4">
                  <Monitor size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">Screening</h3>
                <p className="text-gray-500">Every candidate is expected to go through a psychometric and basic domain knowledge evaluation before enrolling.</p>
              </div>
              {/* Training Card */}
              <div className="p-8 rounded-xl border border-gray-200 shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-blue-100 text-blue-500 mb-4">
                  <Users size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">Training</h3>
                <p className="text-gray-500">Study with a partner. Receive personalized guidance from our highly qualified staff, who provide you with in depth knowledge of insurance products and processes so that you become an expert.</p>
              </div>
              {/* Program Card */}
              <div className="p-8 rounded-xl border border-gray-200 shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-blue-100 text-blue-500 mb-4">
                  <GraduationCap size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">Program</h3>
                <p className="text-gray-500">We teach complicated concepts in a clear, jargon-free manner through our government-approved insurance licensure and exam preparation courses.</p>
              </div>
              {/* Job Portal Card */}
              <div className="p-8 rounded-xl border border-gray-200 shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-blue-100 text-blue-500 mb-4">
                  <BriefcaseBusiness size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">Job Portal</h3>
                <p className="text-gray-500">We offer plenty of opportunities to grow your career. You can choose from being an insurance professional to become a salaried financial advisor in banking sector.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Another set of cards/features */}
        <section className="py-20 md:px-15 sm:px-10">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              The <span className="text-blue-500 hover:text-black">Learn Bima</span> upskill vision goes <span className="text-blue-500 hover:text-black">beyond</span> careers
            </h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              We offer top notch digital learning experiences to equip employees with the ability to leverage data-driven knowledge to drive results.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 rounded-xl border border-gray-200 shadow-lg flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-blue-100 text-blue-500 mb-4">
                  <Clipboard size={48} />
                </div>
                <h3 className="text-xl font-bold hover:text-blue-500 mb-2">Psychometric Evaluation</h3>
                <p className="text-gray-500">An evaluation to assess the personality attributes and cognitive capabilities.</p>
              </div>
              {/* Feature 2 */}
              <div className="p-8 rounded-xl border border-gray-200 shadow-lg flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-blue-100 text-blue-500 mb-4">
                  <MessageSquare size={48} />
                </div>
                <h3 className="text-xl font-bold hover:text-blue-500 mb-2">Selling Strategies</h3>
                <p className="text-gray-500">Latest insurance selling strategies for agents on how to increase your sales with these effective tactics.</p>
              </div>
              {/* Feature 3 */}
              <div className="p-8 rounded-xl border border-gray-200 shadow-lg flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-blue-100 text-blue-500 mb-4">
                  <Shield size={48} />
                </div>
                <h3 className="text-xl font-bold hover:text-blue-500 mb-2">Essentials</h3>
                <p className="text-gray-500">Effectively identify and handle Insurance needs, by mastering insurance essentials.</p>
              </div>
              {/* Feature 4 */}
              <div className="p-8 rounded-xl border border-gray-200 shadow-lg flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-blue-100 text-blue-500 mb-4">
                  <Zap size={48} />
                </div>
                <h3 className="text-xl font-bold hover:text-blue-500 mb-2">Objection Handling</h3>
                <p className="text-gray-500">Gain a competitive advantage by preparing in advance for handling insurance sales objections.</p>
              </div>
              {/* Feature 5 */}
              <div className="p-8 rounded-xl border border-gray-200 shadow-lg flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-blue-100 text-blue-500 mb-4">
                  <BookOpen size={48} />
                </div>
                <h3 className="text-xl font-bold hover:text-blue-500 mb-2">Corporate Basics</h3>
                <p className="text-gray-500">Learn about key trends in business climate of insurance industry</p>
              </div>
              {/* Feature 6 */}
              <div className="p-8 rounded-xl border border-gray-200 shadow-lg flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-blue-100 text-blue-500 mb-4">
                  <Layers size={48} />
                </div>
                <h3 className="text-xl font-bold hover:text-blue-500 mb-2">Domain Knowledge</h3>
                <p className="text-gray-500">Knowledge of Insurance basics to key concepts of Insurance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* New "Access to the learning platform" section */}
        <section className="py-20 md:px-15 sm:px-10">
          <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-12">
            <div className="w-full lg:w-1/2 relative h-96 flex justify-center lg:justify-end">
              <img
                src="https://placehold.co/800x600/1E3A8A/FFFFFF?text=Team+Collaboration"
                alt="Three people collaborating"
                className="w-full h-full object-cover rounded-xl shadow-2xl"
              />
            </div>

            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Access to the learning <br /> platform & discover the <br /> world of opportunities
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                If you are passionate and willing to put extra effort, selling insurance has no earning limit. Everyone needs insurance & many different insurance products are available, including life, health, auto, accident, house, employment goods, and a lot more. Nothing is as gratifying as selling peace of mind through safety of insurance. Access our platform and join the clan of high earners.
              </p>
              <div className="flex justify-center lg:justify-start space-x-8 text-center mt-12">
                <div className="p-4">
                  <div className="text-4xl sm:text-5xl font-bold text-gray-800 mb-5">300K</div>
                  <p className="font-bold text-blue-400">Student Register</p>
                </div>
                <div className="p-4">
                  <div className="text-4xl sm:text-5xl font-bold text-gray-800 mb-5">95%</div>
                  <p className="font-bold text-blue-400">Training Completed</p>
                </div>
                <div className="p-4">
                  <div className="text-4xl sm:text-5xl font-bold text-gray-800 mb-5">20K</div>
                  <p className="font-bold text-blue-400">Student Placed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section>
          <ImageGallery images={images} />
        </section> */}

        {/* Meet the Experts Section */}
        <section className="py-20 md:px-15 sm:px-10">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Knowledge Partner
            </h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Meet our trainer of Creators, Designers, Subject Matter Experts & World class Problem solvers
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Expert 1 */}
              <div className="p-6 rounded-xl border border-gray-200 shadow-lg transform hover:scale-105 transition-transform duration-300 text-center">
                <img src="https://placehold.co/300x300/1D4ED8/FFFFFF?text=Dilip" alt="Dilip Kumar Sharma" className="w-full h-auto rounded-xl mb-4" />
                <h3 className="text-xl font-bold hover:text-blue-500 mb-3">Dilip Kumar Sharma</h3>
                <p className="text-gray-600 mb-8">Author, L&D Solutions People Manager, E-learning Content Consulting Sales and Development mentoring for Organizational</p>
                <div className="mt-4 flex justify-center">
                  <a href="#" aria-label="LinkedIn" className="hover:text-blue-600 transition-colors">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
              {/* Expert 2 */}
              <div className="p-6 rounded-xl border border-gray-200 shadow-lg transform hover:scale-105 transition-transform duration-300 text-center">
                <img src="https://placehold.co/300x300/1D4ED8/FFFFFF?text=Deepak" alt="Deepak Bhardwaj" className="w-full h-auto rounded-xl mb-4" />
                <h3 className="text-xl font-bold hover:text-blue-500 mb-3">Deepak Bhardwaj</h3>
                <p className="text-gray-600 mb-8">Freelance Trainer & Founder Deknutterts Learning Solutions</p>
                <div className="mt-4 flex justify-center">
                  <a href="#" aria-label="LinkedIn" className="hover:text-blue-600 transition-colors">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
              {/* Expert 3 */}
              <div className="p-6 rounded-xl border border-gray-200 shadow-lg transform hover:scale-105 transition-transform duration-300 text-center">
                <img src="https://placehold.co/300x300/1D4ED8/FFFFFF?text=Coach" alt="Coach Nitin Rishi" className="w-full h-auto rounded-xl mb-4" />
                <h3 className="text-xl font-bold hover:text-blue-500 mb-3">Coach Nitin Rishi</h3>
                <p className="text-gray-600 mb-8">PHD | Head coach CLUNICE CCE Certified Life and Executive Coach - Leadership Development Coach - Author</p>
                <div className="mt-4 flex justify-center">
                  <a href="#" aria-label="LinkedIn" className="hover:text-blue-600 transition-colors">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* Contact Us */}
        <section className="w-full bg-gray-50 py-12">
          <div className="mx-auto px-15 sm:px10">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold hover:text-gray-900 mb-6 text-blue-500">
              Contact Us
            </h2>

            {/* Info */}
            <div className="flex flex-col md:flex-col gap-4">
              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail size={20} className="text-blue-600" />
                <a
                  href="mailto:info@learnbima.com"
                  className="text-gray-700 font-bold hover:underline"
                >
                  info@learnbima.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <Phone size={20} className="text-blue-600" />
                <a
                  href="tel:+917981563903"
                  className="text-gray-700 font-bold hover:underline"
                >
                  +91-7981563903
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 md:px-15 sm:px-10">
        <div className="container mx-auto">
          <div className="flex flex-col mt-4">
            <img
              src={logo} // replace with your image path or variable
              alt="Icon"
              className="w-24 h-24 object-contain" // 100px ≈ w-24
              draggable={false}
            />
          </div>

          <div className="mt-4 flex  space-x-4">
            <a href="#" aria-label="Facebook" className="p-2 rounded-full border border-gray-600 hover:border-white transition-colors">
              <Facebook size={20} className="text-gray-400 hover:text-white" />
            </a>
            <a href="#" aria-label="Twitter" className="p-2 rounded-full border border-gray-600 hover:border-white transition-colors">
              <Twitter size={20} className="text-gray-400 hover:text-white" />
            </a>
            <a href="#" aria-label="LinkedIn" className="p-2 rounded-full border border-gray-600 hover:border-white transition-colors">
              <Linkedin size={20} className="text-gray-400 hover:text-white" />
            </a>
            <a href="#" aria-label="Instagram" className="p-2 rounded-full border border-gray-600 hover:border-white transition-colors">
              <Instagram size={20} className="text-gray-400 hover:text-white" />
            </a>
          </div>

        </div>
      </footer>

      <div className="bg-blue-400 py-8 md:px-15 sm:px-10">
        <p className="text-white">&copy; 2024 LearnBima. All rights reserved.</p>
      </div>
    </div>
  );
};

export default App;
