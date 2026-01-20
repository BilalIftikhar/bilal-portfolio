'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiCode, FiDatabase, FiShoppingCart, FiTrendingUp, FiShield, FiCloud } from 'react-icons/fi';

export default function Specialized() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const verticals = [
        {
            icon: FiCode,
            title: 'WEB DEVELOPMENT',
            description: 'Scalable applications & Modern frameworks',
            color: 'from-[#FF6B35] to-[#FF8C5A]',
        },
        {
            icon: FiDatabase,
            title: 'BACKEND SYSTEMS',
            description: 'API development & Database optimization',
            color: 'from-white to-gray-300',
        },
        {
            icon: FiShoppingCart,
            title: 'E-COMMERCE',
            description: 'Supply chain & Scalable marketplaces',
            color: 'from-[#FF6B35] to-[#FF8C5A]',
        },
        {
            icon: FiTrendingUp,
            title: 'SAAS PLATFORMS',
            description: 'Multi-tenant solutions & Cloud infrastructure',
            color: 'from-white to-gray-300',
        },
        {
            icon: FiShield,
            title: 'SECURITY',
            description: 'Secure authentication & Data protection',
            color: 'from-[#FF6B35] to-[#FF8C5A]',
        },
        {
            icon: FiCloud,
            title: 'CLOUD SERVICES',
            description: 'AWS deployment & DevOps automation',
            color: 'from-white to-gray-300',
        },
    ];

    return (
        <section id="specialized" className="section-padding bg-black relative overflow-hidden section-bg">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
                <div
                    ref={ref}
                    data-aos="fade-up"
                    className="mb-16"
                >
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
                        <div className="lg:max-w-2xl">
                            <span
                                data-aos="fade-right"
                                className="text-[#FF6B35] uppercase text-sm tracking-[2px] font-semibold mb-4 block"
                            >
                                SPECIALIZED IN
                            </span>
                            <h2
                                data-aos="fade-up"
                                data-aos-delay="100"
                                className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
                            >
                                <motion.span 
                                    className="text-white block"
                                    whileHover={{ scale: 1.05, x: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    Expertise Across
                                </motion.span>
                                <br />
                                <motion.span 
                                    className="text-gray-700 block"
                                    whileHover={{ scale: 1.05, x: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    Global Markets.
                                </motion.span>
                            </h2>
                        </div>
                        <p
                            data-aos="fade-left"
                            data-aos-delay="200"
                            className="text-white text-lg lg:text-xl max-w-xl leading-relaxed font-light"
                        >
                            I deploy deep domain expertise to solve industry-specific bottlenecks using custom solutions and resilient cloud foundations.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {verticals.map((vertical, index) => (
                        <motion.div
                            key={vertical.title}
                            data-aos="fade-up"
                            data-aos-delay={300 + index * 50}
                            className="bg-[#111111] border border-gray-900 rounded-2xl p-8 hover:border-[#FF6B35]/30 transition-all duration-300 group cursor-pointer"
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${vertical.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <vertical.icon className="text-2xl text-black" />
                            </div>
                            <h3 className="text-white font-bold text-xl mb-3 uppercase tracking-wide">
                                {vertical.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {vertical.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
