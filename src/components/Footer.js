'use client';

import { motion } from 'framer-motion';
import { FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { SiUpwork, SiGithub } from 'react-icons/si';
import Image from 'next/image';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'LinkedIn',
            icon: FiLinkedin,
            url: 'https://www.linkedin.com/in/mbilaliftikhar/',
            color: 'hover:text-blue-400',
        },
        {
            name: 'Upwork',
            icon: SiUpwork,
            url: 'https://www.upwork.com/freelancers/~012e9b9487fa4f8fce',
            color: 'hover:text-green-400',
        },
        {
            name: 'Email',
            icon: FiMail,
            url: 'mailto:bilaliftikhar431@gmail.com',
            color: 'hover:text-red-400',
        },
    ];

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <footer className="bg-[#0a0a0a] border-t border-gray-900">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-16">
                <div className="grid lg:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div className="lg:max-w-sm">
                        <motion.a
                            href="#home"
                            className="flex items-center gap-3 mb-6"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="w-12 h-12 rounded-full bg-[#FF6B35] flex items-center justify-center overflow-hidden shadow-lg shadow-orange-500/30 relative border-2 border-[#FF6B35] p-0.5">
                                <Image 
                                    src="/profile.png" 
                                    alt="Bilal Iftikhar" 
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-white leading-tight">BILAL</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-wider">IFTIKHAR</span>
                            </div>
                        </motion.a>
                        <p className="text-gray-400 text-[15px] leading-relaxed mb-6">
                            Full Stack Software Engineer building scalable, user-centric web applications. 
                            Forging the digital pulse of innovation.
                        </p>
                    </div>

                    {/* Sitemap */}
                    <div>
                        <h4 className="text-white font-semibold text-[15px] uppercase tracking-[1.5px] mb-6">Sitemap</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#FF6B35] transition-colors text-[15px]"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-white font-semibold text-[15px] uppercase tracking-[1.5px] mb-6">Connect</h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/mbilaliftikhar/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-[#FF6B35] transition-colors text-[15px] inline-flex items-center gap-2"
                                >
                                    LinkedIn <span className="text-[12px]">↗</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.upwork.com/freelancers/~012e9b9487fa4f8fce"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-[#FF6B35] transition-colors text-[15px] inline-flex items-center gap-2"
                                >
                                    Upwork <span className="text-[12px]">↗</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:bilaliftikhar431@gmail.com"
                                    className="text-gray-400 hover:text-[#FF6B35] transition-colors text-[15px]"
                                >
                                    bilaliftikhar431@gmail.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/923247203309"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-[#FF6B35] transition-colors text-[15px]"
                                >
                                    03247203309
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-900">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-[13px] uppercase tracking-[1.5px]">
                            © {currentYear} BILAL IFTIKHAR. GLOBAL OPERATIONS.
                        </p>
                        <div className="flex gap-6 text-[13px]">
                            <a href="#" className="text-gray-500 hover:text-[#FF6B35] transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-500 hover:text-[#FF6B35] transition-colors">
                                Terms & Conditions
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <motion.a
                href="#home"
                className="fixed bottom-8 right-8 w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow z-40 hover:bg-[#FF8C5A]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
            >
                ↑
            </motion.a>
        </footer>
    );
}
