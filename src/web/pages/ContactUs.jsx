import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactUs = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for reaching out! We’ll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <>
            <Header />

            <section className="pt-32 pb-20 bg-linear-to-b from-[#f9fcff] to-[#e6f4ff] min-h-screen px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0a75a9] mb-6">
                        📞 Contact LearnBima
                    </h1>
                    <p className="text-gray-600 text-lg mb-12">
                        Have questions or suggestions? We’d love to hear from you.
                    </p>

                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Contact Info */}
                        <div className="bg-white shadow-lg rounded-2xl p-8 text-left">
                            <h3 className="text-2xl font-semibold text-[#0a75a9] mb-6">Get in Touch</h3>

                            <div className="flex items-center gap-3 mb-4">
                                <Mail size={20} className="text-[#0a75a9]" />
                                <p className="text-gray-700">support@sentientia.com</p>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <Phone size={20} className="text-[#0a75a9]" />
                                <p className="text-gray-700">+91 98197 15903</p>
                            </div>

                            <div className="flex items-start gap-3 mb-6">
                                <MapPin size={20} className="text-[#0a75a9] mt-1" />
                                <p className="text-gray-700">
                                    Sentientia Interactive Services Pvt. Ltd. <br />
                                    Mumbai, Maharashtra, India
                                </p>
                            </div>

                            {/* Embedded Google Map */}
                            <div className="w-full h-64 rounded-xl overflow-hidden shadow-md">
                                <iframe
                                    title="Sentientia Interactive Services Pvt. Ltd."
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.4675836548754!2d72.83120747483902!3d19.14579308206927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9956ebd0001%3A0x16f31ad48ae726de!2sSentientia%20Interactive%20Services%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1731159600000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white shadow-lg rounded-2xl p-8 text-left"
                        >
                            <h3 className="text-2xl font-semibold text-[#0a75a9] mb-6">Send a Message</h3>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#0a75a9] outline-none"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#0a75a9] outline-none"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#0a75a9] outline-none resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#0a75a9] text-white font-semibold py-3 rounded-xl hover:bg-[#095d88] transition hover:cursor-pointer"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default ContactUs;
