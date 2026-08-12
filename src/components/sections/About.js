'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import KineticText from '@/components/ui/KineticText';
import Reveal from '@/components/ui/Reveal';
import Tilt3D from '@/components/ui/Tilt3D';
import { useCountUp } from '@/hooks/useCountUp';
import { PERSON, STATS } from '@/lib/site';

const TAGS = [
    { label: 'Full Stack', color: 'text-primary border-primary/40' },
    { label: 'AI Builder', color: 'text-success border-success/40' },
    { label: 'Problem Solver', color: 'text-secondary-light border-secondary/40' },
    { label: 'Open Source', color: 'text-gold border-gold/40' },
];

const STAT_ITEMS = [
    { target: STATS.years, suffix: '+', label: 'Years' },
    { target: STATS.projects, suffix: '+', label: 'Projects' },
    { target: STATS.clients, suffix: '+', label: 'Clients' },
];

function Stat({ target, suffix, label }) {
    const [ref, val] = useCountUp(target);
    return (
        <div ref={ref} className="text-center sm:text-left">
            <div
                className="font-display text-5xl sm:text-6xl text-gradient leading-none tabular-nums"
                aria-label={`${target}${suffix} ${label}`}
            >
                <span aria-hidden="true">
                    {val}
                    {suffix}
                </span>
            </div>
            <div className="text-muted text-xs uppercase tracking-[0.2em] mt-2">{label}</div>
        </div>
    );
}

export default function About() {
    return (
        <section id="about" className="section-pad bg-night relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                {/* LEFT — portrait */}
                <Reveal from="right" duration={0.8} className="relative mx-auto w-full max-w-[380px]">
                    {/* Orbiting rings */}
                    <span
                        aria-hidden="true"
                        className="absolute -inset-2 rounded-full border border-primary/20"
                        style={{ animation: 'ring-spin 26s linear infinite' }}
                    />
                    <span
                        aria-hidden="true"
                        className="absolute -inset-5 rounded-full border border-secondary/15 border-dashed"
                        style={{ animation: 'ring-spin 34s linear infinite reverse' }}
                    />
                    <span
                        aria-hidden="true"
                        className="absolute -inset-10 rounded-full bg-primary/10 blur-3xl"
                    />

                    <Tilt3D max={14} scale={1.03} perspective={1100} className="rounded-full">
                        <div className="group relative aspect-square overflow-hidden rounded-full bg-surface ring-1 ring-white/10">
                            <Image
                                src="/profile.png"
                                alt={`${PERSON.name}, ${PERSON.jobTitle}`}
                                width={380}
                                height={380}
                                priority
                                quality={95}
                                sizes="(max-width: 1024px) 70vw, 380px"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-night/45 via-transparent to-transparent" />
                        </div>
                    </Tilt3D>

                    {/* Floating badge */}
                    <motion.div
                        className="absolute -bottom-5 left-1/2 whitespace-nowrap glass-strong rounded-xl px-4 py-2.5 text-sm flex items-center gap-2"
                        // Centring lives in the motion transform, not a Tailwind
                        // class — framer writes `transform` inline and would
                        // otherwise wipe out -translate-x-1/2.
                        style={{ x: '-50%' }}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        <span aria-hidden="true">📍</span> {PERSON.location}
                    </motion.div>
                </Reveal>

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
                        <span className="sr-only">About Muhammad Bilal Iftikhar</span>
                        <span aria-hidden="true">
                            <KineticText text="CRAFTING DIGITAL" /> <br />
                            <KineticText text="INTELLIGENCE" className="text-gradient" />
                        </span>
                    </h2>

                    <div className="space-y-4 text-muted leading-relaxed max-w-xl">
                        <p>
                            I&apos;m a senior full-stack engineer with{' '}
                            <span className="text-ink font-medium">{STATS.years}+ years</span> of
                            shipping production software, and for the last three of those I&apos;ve
                            worked almost entirely on applied AI — putting LLMs, retrieval and agents
                            behind clean APIs and interfaces people can actually use.
                        </p>
                        <p>
                            I care about the parts users never see: predictable latency, sensible
                            architecture, and failure modes that degrade gracefully instead of
                            breaking. Good engineering should be invisible.
                        </p>
                    </div>

                    {/* Stats with separators */}
                    <div className="flex items-center gap-5 sm:gap-8 mt-10 mb-8">
                        {STAT_ITEMS.map((s, i) => (
                            <div key={s.label} className="flex items-center gap-5 sm:gap-8">
                                <Stat {...s} />
                                {i < STAT_ITEMS.length - 1 && <span className="h-12 w-px bg-white/10" />}
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
