'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';

const SOCIALS = [
    { icon: FiGithub, label: 'GitHub', href: 'https://github.com/mbilaliftikhar' },
    { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mbilaliftikhar/' },
    { icon: FiMail, label: 'Email', href: 'mailto:bilaliftikhar431@gmail.com' },
];

export default function Footer() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 300);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <footer className="relative bg-night border-t border-white/5 overflow-hidden">
            {/* Watermark */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-[-2rem] text-center font-display text-[28vw] leading-none text-white/[0.02] select-none"
            >
                BILAL
            </span>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-14">
                <div className="flex flex-col items-center gap-8">
                    <div className="flex gap-4">
                        {SOCIALS.map(({ icon: Icon, label, href }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target={href.startsWith('http') ? '_blank' : undefined}
                                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                aria-label={label}
                                whileHover={{ y: -4, color: '#C9A96E' }}
                                className="w-11 h-11 grid place-items-center rounded-xl glass text-muted text-lg"
                            >
                                <Icon />
                            </motion.a>
                        ))}
                    </div>

                    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-white/5">
                        <p className="text-muted text-xs tracking-wide text-center sm:text-left">
                            © 2026 Muhammad Bilal Iftikhar · All rights reserved
                        </p>
                        <p className="text-muted text-xs tracking-wide font-mono">
                            Built with Next.js · Deployed on Vercel
                        </p>
                    </div>
                </div>
            </div>

            {/* Scroll to top */}
            <AnimatePresence>
                {showTop && (
                    <motion.a
                        href="#home"
                        aria-label="Back to top"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        whileHover={{ rotate: 360 }}
                        transition={{ rotate: { duration: 0.6 } }}
                        className="fixed bottom-7 right-7 z-[8000] w-12 h-12 grid place-items-center rounded-full bg-gold text-[#050510] shadow-lg"
                    >
                        <FiArrowUp />
                    </motion.a>
                )}
            </AnimatePresence>
        </footer>
    );
}
