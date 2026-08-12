'use client';

import { motion } from 'framer-motion';
import { useSyncExternalStore } from 'react';
import { FiArrowUpRight, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiUpwork } from 'react-icons/si';
import KineticText from '@/components/ui/KineticText';
import MagneticButton from '@/components/ui/MagneticButton';
import ParticleField from '@/components/ui/ParticleField';
import TechCube from '@/components/ui/TechCube';
import Tilt3D from '@/components/ui/Tilt3D';
import { useCountUp } from '@/hooks/useCountUp';
import { PERSON, SOCIAL_LINKS, STATS } from '@/lib/site';

/**
 * The wall clock is an external, always-changing source, so it is read through
 * useSyncExternalStore rather than mirrored into state from an effect.
 * The zone is pinned to Asia/Karachi — the card is labelled PKT, but the old
 * version formatted the *visitor's* local time under that label.
 */
const clockStore = {
    subscribe(onChange) {
        const id = setInterval(onChange, 1000);
        return () => clearInterval(id);
    },
    getSnapshot() {
        return new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Asia/Karachi',
        });
    },
    getServerSnapshot() {
        return '--:--:--';
    },
};

function Clock() {
    const time = useSyncExternalStore(
        clockStore.subscribe,
        clockStore.getSnapshot,
        clockStore.getServerSnapshot
    );
    return (
        <span className="font-mono text-2xl text-ink tabular-nums" suppressHydrationWarning>
            {time}
        </span>
    );
}

function StatCard({ target, suffix, label, delay }) {
    const [ref, val] = useCountUp(target);
    return (
        <Tilt3D max={10} className="rounded-2xl" glare>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay }}
                className="glass chroma rounded-2xl p-5 h-full flex flex-col justify-between"
            >
                <span
                    className="font-display text-5xl sm:text-6xl text-gradient leading-none tabular-nums"
                    aria-label={`${target}${suffix} ${label}`}
                >
                    <span aria-hidden="true">
                        {val}
                        {suffix}
                    </span>
                </span>
                <span className="text-muted text-xs uppercase tracking-[0.2em] mt-3">{label}</span>
            </motion.div>
        </Tilt3D>
    );
}

export default function Hero() {
    const socials = [
        { icon: FiGithub, label: 'GitHub', href: SOCIAL_LINKS.github },
        { icon: FiLinkedin, label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
        { icon: SiUpwork, label: 'Upwork', href: SOCIAL_LINKS.upwork },
        { icon: FiMail, label: 'Email', href: `mailto:${PERSON.email}` },
    ];

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden bg-night pt-28 pb-16"
        >
            {/* Gradient mesh blobs */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <div className="mesh-blob animate-mesh-1" style={{ width: 520, height: 520, top: '-8%', left: '-6%', background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }} />
                <div className="mesh-blob animate-mesh-2" style={{ width: 460, height: 460, bottom: '-10%', right: '4%', background: 'radial-gradient(circle, #4F8EF7, transparent 70%)' }} />
                <div className="mesh-blob animate-mesh-3" style={{ width: 360, height: 360, top: '30%', left: '40%', background: 'radial-gradient(circle, #10B981, transparent 70%)', opacity: 0.3 }} />
            </div>
            <ParticleField className="absolute inset-0 w-full h-full" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                {/* LEFT */}
                <div className="lg:col-span-7">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm text-muted tracking-wide mb-7"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute h-full w-full rounded-full bg-success opacity-75" />
                            <span className="relative rounded-full h-2.5 w-2.5 bg-success" />
                        </span>
                        AVAILABLE FOR WORK
                    </motion.div>

                    {/* The visible headline is split into per-character spans for the
                        kinetic animation, so the plain-text version lives here for
                        screen readers and crawlers. */}
                    <h1 className="font-display leading-[0.82] tracking-tight mb-5">
                        <span className="sr-only">
                            {PERSON.name} — Senior Software Engineer and AI Integration Specialist
                        </span>
                        <span aria-hidden="true">
                            <span className="block text-[clamp(3.2rem,11vw,9rem)]">
                                <KineticText text="SENIOR" trigger="load" delay={0.5} charClassName="text-outline" />
                            </span>
                            <span className="block text-[clamp(3.2rem,11vw,9rem)] text-primary" style={{ textShadow: '0 0 40px rgba(79,142,247,0.35)' }}>
                                <KineticText text="SOFTWARE" trigger="load" delay={0.65} />
                            </span>
                            <span className="block text-[clamp(3.2rem,11vw,9rem)]">
                                <KineticText text="ENGINEER" trigger="load" delay={0.8} charClassName="text-outline" />
                            </span>
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="font-heading italic text-xl sm:text-2xl text-secondary-light mb-4"
                    >
                        &amp; AI Integration Specialist
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                        className="text-muted text-base sm:text-lg max-w-xl mb-9"
                    >
                        I build AI-powered products end to end — LLM features, retrieval pipelines
                        and agents — and ship them as fast, reliable software.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.25, type: 'spring', stiffness: 200, damping: 16 }}
                        className="flex flex-wrap gap-4 mb-9"
                    >
                        <MagneticButton href="#projects" variant="gold">
                            VIEW WORK <FiArrowUpRight />
                        </MagneticButton>
                        <MagneticButton href="/resume.pdf" download variant="ghost">
                            <FiDownload /> DOWNLOAD CV
                        </MagneticButton>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4 }}
                        className="flex items-center gap-5 text-muted"
                    >
                        {socials.map(({ icon: Icon, label, href }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target={href.startsWith('http') ? '_blank' : undefined}
                                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                aria-label={label}
                                whileHover={{ rotate: 360, scale: 1.2, color: '#C9A96E' }}
                                transition={{ type: 'spring', stiffness: 250, damping: 12 }}
                                className="text-xl hover:text-gold"
                            >
                                <Icon />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>

                {/* RIGHT — bento */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.7 }}
                    className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-5"
                >
                    <StatCard target={STATS.years} suffix="+" label="Years Experience" delay={1.1} />
                    <StatCard target={STATS.projects} suffix="+" label="Projects Shipped" delay={1.2} />

                    <TechCube />

                    {/* Clock + status */}
                    <Tilt3D max={10} className="rounded-2xl">
                        <div className="glass chroma rounded-2xl p-5 h-full flex flex-col justify-between min-h-[160px]">
                            <div>
                                <span className="text-muted text-[10px] uppercase tracking-[0.2em]">
                                    Local time · PKT
                                </span>
                                <div className="mt-1">
                                    <Clock />
                                </div>
                            </div>
                            <span className="inline-flex items-center gap-2 text-success text-sm font-medium">
                                <span className="h-2 w-2 rounded-full bg-success animate-pulse-dot" />
                                Replies within a day
                            </span>
                        </div>
                    </Tilt3D>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.a
                href="#about"
                aria-label="Scroll down"
                className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden sm:flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
            >
                <motion.span
                    className="text-gold text-2xl"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                >
                    ⌄
                </motion.span>
            </motion.a>
        </section>
    );
}
