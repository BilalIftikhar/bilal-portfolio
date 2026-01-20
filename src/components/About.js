'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiAward, FiBriefcase, FiUsers } from 'react-icons/fi';

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const stats = [
        { icon: FiBriefcase, value: '5+', label: 'Years Experience' },
        { icon: FiAward, value: '50+', label: 'Projects Completed' },
        { icon: FiUsers, value: '40+', label: 'Happy Clients' },
    ];

    return (
        <section id="about" className="section-padding bg-black relative overflow-hidden section-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            About
                        </motion.span>{' '}
                        <motion.span 
                            className="orange-text"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Me
                        </motion.span>
                    </h2>
                    <div className="w-20 h-1 bg-[#FF6B35] mx-auto"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* About Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-tight">
                            Senior Software Engineer
                        </h3>
                        <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                            <p>
                                Full Stack Software Engineer with 5+ years of experience building scalable, user-centric web applications 
                                using Laravel, Next.js, and modern JavaScript frameworks. Skilled in REST API development, database 
                                optimization, and responsive UI design.
                            </p>
                            <p>
                                <strong className="orange-text">Current Role:</strong> Full Stack Developer at Vocuit (Contracted to AV Leads), 
                                building scalable web platforms using Next.js (frontend) and Laravel (backend) for a platform that connects 
                                elite engineers and technicians with global live event organizers.
                            </p>
                            <p>
                                <strong className="orange-text">Previous Experience:</strong> Senior Software Engineer at Algolix Technologies, 
                                where I developed scalable back-end systems using Laravel (PHP) and dynamic front-end interfaces with Vue, Next.js, 
                                and React. Optimized MySQL queries to enhance application performance and collaborated with product and UX/UI teams.
                            </p>
                            <p>
                                Adept at collaborating with cross-functional teams, delivering results under tight deadlines, and maintaining 
                                clean, efficient code. I bridge the gap between complex engineering and human intuition to create impactful solutions.
                            </p>
                            <p className="pt-2">
                                <strong className="orange-text">Education:</strong> Bachelor&apos;s in Information Technology from University of Agriculture Faisalabad (2017-2021), 
                                with expertise in system analysis, software architecture, and database optimization.
                            </p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="https://www.linkedin.com/in/mbilaliftikhar/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                            >
                                View LinkedIn
                            </a>
                            <a
                                href="https://www.upwork.com/freelancers/~012e9b9487fa4f8fce"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 border-2 border-[#FF6B35] text-[#FF6B35] rounded-lg font-semibold hover:bg-[#FF6B35] hover:text-white transition-all duration-300"
                            >
                                Upwork Profile
                            </a>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        data-aos="fade-left"
                        data-aos-delay="200"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
                        className="grid grid-cols-1 gap-6"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                data-aos="zoom-in"
                                data-aos-delay={300 + index * 100}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.6 + index * 0.1, type: "spring" }}
                                className="card flex items-center gap-6 hover:scale-105 transition-transform"
                                whileHover={{ 
                                    scale: 1.05, 
                                    y: -5,
                                    transition: { type: "spring", stiffness: 300 }
                                }}
                        >
                                <div className="w-16 h-16 bg-[#FF6B35] rounded-lg flex items-center justify-center text-3xl text-white">
                                    <stat.icon />
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold orange-text">{stat.value}</h4>
                                    <p className="text-gray-400">{stat.label}</p>
                                </div>
                            </motion.div>
                        ))}

                        {/* Location & Contact */}
                        <div className="card">
                            <h4 className="text-xl font-semibold mb-4">Contact Information</h4>
                            <div className="space-y-3 text-gray-300">
                                <p>
                                    <span className="orange-text font-semibold">📍 Location:</span> Lahore, Pakistan
                                </p>
                                <p>
                                    <span className="orange-text font-semibold">📧 Email:</span>{' '}
                                    <a href="mailto:bilaliftikhar431@gmail.com" className="hover:text-[#FF6B35] transition-colors">
                                        bilaliftikhar431@gmail.com
                                    </a>
                                </p>
                                <p>
                                    <span className="orange-text font-semibold">📱 WhatsApp:</span>{' '}
                                    <a href="https://wa.me/923247203309" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B35] transition-colors">
                                        03247203309
                                    </a>
                                </p>
                                <p>
                                    <span className="orange-text font-semibold">💼 Status:</span> Available for Freelance
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
