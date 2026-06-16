'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import MagneticButton from '@/components/ui/MagneticButton';

const LINKS = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'AI', href: '#ai' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

function SplitLink({ name, href, onClick }) {
    return (
        <a
            href={href}
            onClick={onClick}
            className="group relative overflow-hidden inline-block h-5 text-[13px] font-medium tracking-wide text-muted hover:text-ink transition-colors"
        >
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                {name}
            </span>
            <span className="block absolute top-full left-0 text-gold transition-transform duration-300 group-hover:-translate-y-full">
                {name}
            </span>
        </a>
    );
}

export default function Navbar() {
    const { scrolled, hidden } = useScrollDirection();
    const [open, setOpen] = useState(false);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: hidden && !open ? -110 : 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: hidden ? 0 : 0.05 }}
                className={`fixed top-0 inset-x-0 z-[9000] transition-all duration-500 ${
                    scrolled ? 'py-3' : 'py-5'
                }`}
            >
                <div className="max-w-7xl mx-auto px-5">
                    <div
                        className={`flex items-center justify-between rounded-2xl h-14 px-4 sm:px-6 transition-all duration-500 ${
                            scrolled ? 'glass-strong border-b border-white/10' : 'border border-transparent'
                        }`}
                    >
                        <a href="#home" aria-label="Home" className="font-display text-2xl tracking-[0.15em] text-gradient">
                            MB
                        </a>

                        <div className="hidden md:flex items-center gap-8">
                            {LINKS.map((l) => (
                                <SplitLink key={l.name} {...l} />
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden sm:block">
                                <MagneticButton href="#contact" variant="ghost" className="!px-5 !py-2 !text-xs">
                                    HIRE ME
                                </MagneticButton>
                            </div>
                            <button
                                className="md:hidden text-ink text-2xl p-1.5"
                                onClick={() => setOpen(true)}
                                aria-label="Open menu"
                            >
                                <FiMenu />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile full-screen overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9500] bg-night/95 backdrop-blur-xl md:hidden flex flex-col"
                    >
                        <div className="flex justify-end p-6">
                            <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-ink text-3xl">
                                <FiX />
                            </button>
                        </div>
                        <nav className="flex-1 flex flex-col justify-center items-center gap-6">
                            {LINKS.map((l, i) => (
                                <motion.a
                                    key={l.name}
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.08 * i }}
                                    className="font-display text-5xl tracking-wide text-ink hover:text-gradient"
                                >
                                    {l.name}
                                </motion.a>
                            ))}
                            <motion.a
                                href="#contact"
                                onClick={() => setOpen(false)}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.08 * LINKS.length }}
                                className="btn-gold mt-6"
                            >
                                HIRE ME
                            </motion.a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
