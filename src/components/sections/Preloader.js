'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const NAME = 'BILAL IFTIKHAR';

export default function Preloader() {
    const [show, setShow] = useState(false);
    const [phase, setPhase] = useState(0); // 0 monogram, 1 name
    const reduced = useReducedMotion();

    useEffect(() => {
        // Only on first visit per session
        const seen = sessionStorage.getItem('mb-preloaded');
        if (seen) return;
        setShow(true);
        document.body.style.overflow = 'hidden';

        const total = reduced ? 400 : 2600;
        const t1 = setTimeout(() => setPhase(1), reduced ? 100 : 950);
        const t2 = setTimeout(() => {
            setShow(false);
            sessionStorage.setItem('mb-preloaded', '1');
            document.body.style.overflow = '';
        }, total);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            document.body.style.overflow = '';
        };
    }, [reduced]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[100000] bg-night flex items-center justify-center"
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Phase 0 — MB monogram strokes draw */}
                    {phase === 0 && (
                        <motion.svg
                            width="140"
                            height="140"
                            viewBox="0 0 100 100"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.4 }}
                            aria-label="Loading"
                        >
                            <defs>
                                <linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#4F8EF7" />
                                    <stop offset="60%" stopColor="#7C3AED" />
                                    <stop offset="100%" stopColor="#C9A96E" />
                                </linearGradient>
                            </defs>
                            {/* M */}
                            <motion.path
                                d="M14 78 L14 26 L32 58 L50 26 L50 78"
                                fill="none"
                                stroke="url(#pl-grad)"
                                strokeWidth="5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: reduced ? 0.2 : 0.8, ease: 'easeInOut' }}
                            />
                            {/* B */}
                            <motion.path
                                d="M60 26 L74 26 Q86 26 86 38 Q86 50 74 50 L60 50 M60 50 L76 50 Q88 50 88 64 Q88 78 74 78 L60 78 L60 26"
                                fill="none"
                                stroke="url(#pl-grad)"
                                strokeWidth="5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: reduced ? 0.2 : 0.8, ease: 'easeInOut', delay: 0.15 }}
                            />
                        </motion.svg>
                    )}

                    {/* Phase 1 — name characters assemble */}
                    {phase === 1 && (
                        <motion.h1
                            className="font-display text-4xl sm:text-6xl tracking-[0.18em] text-gradient"
                            aria-label={NAME}
                        >
                            {NAME.split('').map((ch, i) => (
                                <motion.span
                                    key={i}
                                    className="inline-block"
                                    initial={reduced ? { opacity: 1 } : { opacity: 0, y: 30, filter: 'blur(8px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    transition={{ duration: 0.5, delay: i * 0.04, ease: [0.33, 1, 0.68, 1] }}
                                >
                                    {ch === ' ' ? ' ' : ch}
                                </motion.span>
                            ))}
                        </motion.h1>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
