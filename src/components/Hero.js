'use client';

import { motion } from 'framer-motion';
import { FiDownload, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiUpwork } from 'react-icons/si';
import { useEffect, useState } from 'react';

export default function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
            },
        },
    };

    // Generate particles data
    const particles = mounted ? Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
    })) : [];

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center relative overflow-hidden hero-bg"
        >
            {/* Animated Background Particles */}
            {mounted && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute w-1 h-1 bg-[#FF6B35] rounded-full opacity-30"
                            style={{
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                            }}
                            animate={{
                                y: [0, Math.random() * 100 - 50],
                                opacity: [0.1, 0.4, 0.1],
                            }}
                            transition={{
                                duration: particle.duration,
                                repeat: Infinity,
                                delay: particle.delay,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 relative z-10 pt-36 pb-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center max-w-5xl mx-auto"
                >
                    {/* Large Impactful Headline */}
                    <motion.div variants={itemVariants} className="mb-10">
                        <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tighter">
                            <motion.span 
                                className="text-gray-800 block mb-2"
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
                                whileInView={{ x: 0 }}
                            >
                                FORGING THE
                            </motion.span>
                            <motion.span 
                                className="text-white block mb-2"
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 80 }}
                            >
                                DIGITAL PULSE
                            </motion.span>
                            <motion.span 
                                className="flex items-center justify-center gap-3"
                                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 120 }}
                            >
                                <motion.span 
                                    className="orange-text"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    OF
                                </motion.span>
                                <motion.span 
                                    className="orange-text"
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    INNOVATION
                                </motion.span>
                            </motion.span>
                        </h1>
                    </motion.div>

                    {/* Description Text */}
                        <motion.p
                            variants={itemVariants}
                        className="text-white text-base md:text-lg lg:text-xl mb-14 max-w-2xl mx-auto leading-relaxed font-light"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        >
                        Full Stack Software Engineer with 5+ years of experience building scalable, user-centric web applications. 
                        I bridge the gap between complex engineering and human intuition, delivering results that redefine what&apos;s possible.
                        </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-wrap gap-6 justify-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        <motion.a
                            href="#contact"
                            className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4 rounded-lg font-semibold"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 107, 53, 0.6)" }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            START A PROJECT
                        </motion.a>
                        <motion.a
                            href="/resume.pdf"
                            download
                            className="px-8 py-4 border-2 border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300 inline-flex items-center gap-2 text-base uppercase tracking-wide backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FiDownload />
                            Download Resume
                        </motion.a>
                    </motion.div>

                    {/* Contact Info */}
                        <motion.div
                            variants={itemVariants}
                        className="flex flex-wrap gap-4 md:gap-8 justify-center items-center text-gray-300 text-sm md:text-base"
                    >
                        <a
                            href="mailto:bilaliftikhar431@gmail.com"
                            className="hover:text-[#FF6B35] transition-colors duration-300 whitespace-nowrap"
                        >
                            bilaliftikhar431@gmail.com
                        </a>
                        <span className="hidden md:inline text-gray-500">•</span>
                        <a
                            href="https://wa.me/923247203309"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#FF6B35] transition-colors duration-300 whitespace-nowrap"
                        >
                            03247203309
                        </a>
                        <span className="hidden md:inline text-gray-500">•</span>
                        <span className="whitespace-nowrap">Lahore, Pakistan</span>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        variants={itemVariants}
                        className="flex gap-6 justify-center mt-8"
                        >
                            <a
                                href="https://www.linkedin.com/in/mbilaliftikhar/"
                                target="_blank"
                                rel="noopener noreferrer"
                            className="text-2xl text-gray-400 hover:text-[#FF6B35] transition-colors duration-300"
                            aria-label="LinkedIn"
                            >
                                <FiLinkedin />
                            </a>
                            <a
                                href="https://www.upwork.com/freelancers/~012e9b9487fa4f8fce"
                                target="_blank"
                                rel="noopener noreferrer"
                            className="text-2xl text-gray-400 hover:text-[#FF6B35] transition-colors duration-300"
                            aria-label="Upwork"
                            >
                                <SiUpwork />
                            </a>
                            <a
                                href="mailto:bilaliftikhar431@gmail.com"
                            className="text-2xl text-gray-400 hover:text-[#FF6B35] transition-colors duration-300"
                            aria-label="Email"
                            >
                                <FiMail />
                            </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
