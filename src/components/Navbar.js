'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            
            // Update active section based on scroll position
            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-4 left-8 right-8 z-[9999] transition-all duration-500 rounded-2xl ${
                scrolled 
                    ? 'bg-black/95 backdrop-blur-md shadow-2xl border border-gray-900/50' 
                    : 'bg-transparent border-0'
            }`}
            style={{ marginBottom: '1rem' }}
        >
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-16">
                <div className="flex items-center justify-between h-20 relative py-2">
                    {/* Logo - Left */}
                    <motion.a
                        href="#home"
                        className="flex items-center gap-2 sm:gap-3 group z-10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <motion.div 
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FF6B35] flex items-center justify-center overflow-hidden shadow-lg shadow-orange-500/30 relative border-2 border-[#FF6B35] p-0.5 flex-shrink-0"
                            whileHover={{ 
                                boxShadow: "0 0 30px rgba(255, 107, 53, 0.8)",
                                scale: 1.1
                            }}
                            transition={{ 
                                boxShadow: { duration: 0.3 },
                                scale: { duration: 0.3 }
                            }}
                        >
                            <Image 
                                src="/profile.png" 
                                alt="Bilal Iftikhar" 
                                width={56}
                                height={56}
                                className="w-full h-full object-cover rounded-full"
                                priority
                            />
                        </motion.div>
                        <div className="flex flex-col hidden sm:flex">
                            <motion.span 
                                className="text-xl font-bold text-white leading-tight tracking-tight"
                                whileHover={{ x: 5 }}
                            >
                                BILAL
                            </motion.span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider">IFTIKHAR</span>
                        </div>
                    </motion.a>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden lg:flex items-center gap-12 px-8 absolute left-1/2 transform -translate-x-1/2">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                className={`transition-all duration-300 font-medium text-[13px] uppercase tracking-[1.5px] relative py-2 px-1 ${
                                    activeSection === item.href.slice(1)
                                        ? 'text-[#FF6B35]'
                                        : 'text-white hover:text-[#FF6B35]'
                                }`}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.5, type: "spring" }}
                                whileHover={{ 
                                    y: -3,
                                    scale: 1.05
                                }}
                            >
                                {item.name}
                                {activeSection === item.href.slice(1) && (
                                    <motion.span
                                        layoutId="activeSection"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF6B35] rounded-full"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <motion.div
                                    className="absolute inset-0 bg-[#FF6B35]/10 rounded-lg"
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileHover={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.a>
                        ))}
                    </div>

                    {/* Right Side - CTA Button & Menu */}
                    <div className="flex items-center gap-3 sm:gap-4 z-10">
                        {/* Mobile/Desktop CTA Button */}
                        <motion.a
                            href="#contact"
                            className="btn-primary text-[11px] sm:text-[13px] uppercase tracking-[1.5px] px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-3.5 rounded-lg relative overflow-hidden group whitespace-nowrap"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            whileHover={{ 
                                scale: 1.05, 
                                boxShadow: "0 0 30px rgba(255, 107, 53, 0.8)",
                                y: -2
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-[#FF8C5A] to-[#FF6B35] opacity-0 group-hover:opacity-100"
                                transition={{ duration: 0.3 }}
                            />
                            <span className="relative z-10">Book a call</span>
                        </motion.a>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden text-white text-2xl p-2 hover:text-[#FF6B35] transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="lg:hidden bg-[#0a0a0a] border-t border-gray-900"
                >
                    <div className="px-6 pt-6 pb-8 space-y-4">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`block py-3 transition-all uppercase text-[13px] tracking-[1.5px] ${
                                    activeSection === item.href.slice(1)
                                        ? 'text-[#FF6B35]'
                                        : 'text-white hover:text-[#FF6B35]'
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="block btn-primary text-center mt-6"
                            onClick={() => setIsOpen(false)}
                        >
                            Book a call
                        </a>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
