'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiMail, FiMapPin, FiSend, FiPhone } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

export default function Contact() {
    const ref = useRef(null);
    const formRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: false,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: false });

        try {
            // Format message for WhatsApp
            const message = `Hello! I'm ${formData.name}.\n\nEmail: ${formData.email}\n\nMessage: ${formData.message}`;
            const whatsappUrl = `https://wa.me/923247203309?text=${encodeURIComponent(message)}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');

            setStatus({ loading: false, success: true, error: false });
            setFormData({ name: '', email: '', message: '' });

            setTimeout(() => {
                setStatus({ loading: false, success: false, error: false });
            }, 5000);
        } catch (error) {
            setStatus({ loading: false, success: false, error: true });
            setTimeout(() => {
                setStatus({ loading: false, success: false, error: false });
            }, 5000);
        }
    };

    const contactInfo = [
        {
            icon: FiMail,
            title: 'Email',
            value: 'bilaliftikhar431@gmail.com',
            link: 'mailto:bilaliftikhar431@gmail.com',
        },
        {
            icon: FiPhone,
            title: 'WhatsApp',
            value: '03247203309',
            link: 'https://wa.me/923247203309',
        },
        {
            icon: FiMapPin,
            title: 'Location',
            value: 'Lahore, Pakistan',
            link: null,
        },
    ];

    return (
        <section id="contact" className="section-padding bg-black relative overflow-hidden section-bg">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 uppercase tracking-tight">
                        <motion.span
                            whileHover={{ scale: 1.05, x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Get In
                        </motion.span>{' '}
                        <motion.span 
                            className="orange-text"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Touch
                        </motion.span>
                    </h2>
                    <div className="w-20 h-1 bg-[#FF6B35] mx-auto mb-6"></div>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Have a project in mind? Let&apos;s work together to bring your ideas to life
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-3xl font-bold mb-6 text-white">Let&apos;s talk about everything!</h3>
                            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                Don&apos;t hesitate to reach out. I&apos;m always open to discussing new projects,
                                creative ideas, or opportunities to be part of your vision.
                            </p>
                        </div>

                        <div className="space-y-4">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={info.title}
                                data-aos="slide-right"
                                data-aos-delay={400 + index * 100}
                                initial={{ opacity: 0, x: -50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.3 + index * 0.1, type: "spring" }}
                                className="card flex items-start gap-4 hover:scale-[1.02] transition-transform"
                                whileHover={{ 
                                    scale: 1.05, 
                                    x: 10,
                                    transition: { type: "spring", stiffness: 300 }
                                }}
                            >
                                    <div className="w-12 h-12 bg-[#FF6B35] rounded-lg flex items-center justify-center text-xl flex-shrink-0 text-white">
                                    <info.icon />
                                </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold mb-2 text-white">{info.title}</h4>
                                    {info.link ? (
                                        <a
                                            href={info.link}
                                                target={info.link.startsWith('http') ? '_blank' : undefined}
                                                rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                className="text-gray-300 hover:text-[#FF6B35] transition-colors break-all text-base"
                                        >
                                            {info.value}
                                        </a>
                                    ) : (
                                            <p className="text-gray-300 text-base">{info.value}</p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                        </div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="card mt-8"
                        >
                            <h4 className="font-semibold mb-4 text-white">Connect with me</h4>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="https://www.linkedin.com/in/mbilaliftikhar/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                >
                                    LinkedIn
                                </a>
                                <a
                                    href="https://www.upwork.com/freelancers/~012e9b9487fa4f8fce"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 border-2 border-[#FF6B35] text-[#FF6B35] rounded-lg font-semibold hover:bg-[#FF6B35] hover:text-white transition-all duration-300"
                                >
                                    Upwork
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        data-aos="slide-left"
                        data-aos-delay="400"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="card space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors text-white placeholder-gray-500"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors text-white placeholder-gray-500"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors resize-none text-white placeholder-gray-500"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status.loading}
                                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status.loading ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        <FiSend />
                                        Get In Touch
                                    </>
                                )}
                            </button>

                            {status.success && (
                                <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center">
                                    Opening WhatsApp... Please send your message there!
                                </div>
                            )}

                            {status.error && (
                                <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center">
                                    Something went wrong. Please try again or email me directly.
                                </div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
