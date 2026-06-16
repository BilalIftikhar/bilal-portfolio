'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import KineticText from '@/components/ui/KineticText';
import { useCountUp } from '@/hooks/useCountUp';

const TAGS = [
    { label: 'Full Stack', color: 'text-primary border-primary/40' },
    { label: 'AI Builder', color: 'text-success border-success/40' },
    { label: 'Problem Solver', color: 'text-secondary-light border-secondary/40' },
    { label: 'Open Source', color: 'text-gold border-gold/40' },
];

const STATS = [
    { target: 5, suffix: '+', label: 'Years' },
    { target: 50, suffix: '+', label: 'Projects' },
    { target: 20, suffix: '+', label: 'Clients' },
];

function Stat({ target, suffix, label }) {
    const [ref, val] = useCountUp(target);
    return (
        <div ref={ref} className="text-center sm:text-left">
            <div className="font-display text-5xl sm:text-6xl text-gradient leading-none">
                {val}
                {suffix}
            </div>
            <div className="text-muted text-xs uppercase tracking-[0.2em] mt-2">{label}</div>
        </div>
    );
}

export default function About() {
    return (
        <section id="about" className="section-pad bg-night relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                {/* LEFT — photo */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mx-auto w-full max-w-md"
                >
                    {/* Orbiting rings */}
                    <span className="absolute inset-0 rounded-[28px] border border-primary/20" style={{ animation: 'ring-spin 26s linear infinite' }} />
                    <span className="absolute -inset-4 rounded-[32px] border border-secondary/15" style={{ animation: 'ring-spin 34s linear infinite reverse' }} />

                    <div
                        className="group relative overflow-hidden bg-surface"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 86%, 86% 100%, 0 100%)' }}
                    >
                        <Image
                            src="/profile.png"
                            alt="Muhammad Bilal Iftikhar"
                            width={520}
                            height={620}
                            className="w-full h-auto object-cover transition-all duration-500 group-hover:[filter:hue-rotate(20deg)_saturate(1.25)] group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
                    </div>

                    {/* Floating badge */}
                    <motion.div
                        className="absolute -bottom-4 -right-2 glass-strong rounded-xl px-4 py-2.5 text-sm flex items-center gap-2"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        <span aria-hidden="true">📍</span> Based in Pakistan{' '}
                        <span aria-hidden="true">🇵🇰</span>
                    </motion.div>
                </motion.div>

                {/* RIGHT — editorial */}
                <div className="relative">
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-16 -left-2 font-display text-[8rem] sm:text-[11rem] leading-none text-white/[0.03] select-none"
                    >
                        ABOUT
                    </span>

                    <span className="accent text-gold font-mono text-xs tracking-[0.3em] uppercase">/ Who I am</span>
                    <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-3 mb-6 leading-[0.95]">
                        <KineticText text="CRAFTING DIGITAL" /> <br />
                        <KineticText text="INTELLIGENCE" className="text-gradient" />
                    </h2>

                    <div className="space-y-4 text-muted leading-relaxed max-w-xl">
                        <p>
                            I&apos;m a senior full-stack engineer with{' '}
                            <span className="text-ink font-medium">5+ years</span> shipping products people
                            actually use — and for the last few of those, I&apos;ve gone deep on applied AI:
                            wiring LLMs, RAG, and agents into real applications with clean APIs and
                            thoughtful UX.
                        </p>
                        <p>
                            My philosophy is simple: engineering should feel invisible and outcomes should
                            feel inevitable. I sweat performance, architecture, and the tiny interactions
                            that make software feel alive.
                        </p>
                    </div>

                    {/* Stats with separators */}
                    <div className="flex items-center gap-5 sm:gap-8 mt-10 mb-8">
                        {STATS.map((s, i) => (
                            <div key={s.label} className="flex items-center gap-5 sm:gap-8">
                                <Stat {...s} />
                                {i < STATS.length - 1 && <span className="h-12 w-px bg-white/10" />}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {TAGS.map((t) => (
                            <span
                                key={t.label}
                                className={`px-4 py-1.5 rounded-full text-sm glass border ${t.color}`}
                            >
                                {t.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
