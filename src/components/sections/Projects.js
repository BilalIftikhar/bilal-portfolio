'use client';

import { useEffect, useRef, useState } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useMotionValueEvent,
} from 'framer-motion';
import Image from 'next/image';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';

const PROJECTS = [
    {
        title: 'IGIVU',
        category: 'XR Platform',
        desc: 'End-to-end VR/AR/MR platform serving 3,000+ organizations including Stanford, with synchronized multi-user sessions.',
        image: '/projects/igivu.png',
        tech: ['Next.js', 'Laravel', 'WebGL', 'AWS'],
        live: 'https://igivu.com/',
        repo: null,
    },
    {
        title: 'AV Leads',
        category: 'Talent Network',
        desc: 'Networking platform pairing live-event organizers with elite AV engineers via smart matching and real-time job flows.',
        image: '/projects/avleads.png',
        tech: ['React', 'Laravel', 'Redis', 'AWS'],
        live: 'https://avleads.com/',
        repo: null,
    },
    {
        title: 'PoolStore',
        category: 'E-Commerce',
        desc: "The UK's leading pool & spa retailer — a high-performance storefront with payments, inventory and faceted search.",
        image: '/projects/poolstore.png',
        tech: ['Vue.js', 'Laravel', 'Stripe'],
        live: 'https://poolstore.co.uk/',
        repo: null,
    },
    {
        title: 'SevenLift',
        category: 'Rental Platform',
        desc: 'Enterprise heavy-equipment rental for the UAE with real-time availability, multi-region coverage and booking.',
        image: '/projects/sevenlift.png',
        tech: ['Next.js', 'Node.js', 'PostgreSQL'],
        live: 'https://www.sevenlift.net/',
        repo: null,
    },
];

function ProjectCard({ p, index }) {
    return (
        <article
            data-cursor="view"
            className="chroma group relative shrink-0 w-[82vw] sm:w-[460px] h-[62vh] sm:h-[68vh] rounded-3xl overflow-hidden glass"
        >
            <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 82vw, 460px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent transition-opacity duration-500 group-hover:from-night/95" />

            <div className="absolute top-5 left-5 flex items-center gap-3">
                <span className="font-display text-3xl text-gold">{String(index + 1).padStart(2, '0')}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted glass px-2.5 py-1 rounded-full">
                    {p.category}
                </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-4xl text-ink mb-2">{p.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4 max-w-sm">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                    {p.tech.map((t) => (
                        <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-muted border border-white/5">
                            {t}
                        </span>
                    ))}
                </div>
                <div className="flex gap-3">
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn-gold !py-2.5 !px-5 !text-xs">
                        Live Site <FiArrowUpRight />
                    </a>
                    <a
                        href={p.repo || p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.title} details`}
                        className="btn-ghost !py-2.5 !px-4 !text-xs"
                    >
                        <FiGithub />
                    </a>
                </div>
            </div>
        </article>
    );
}

export default function Projects() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const [distance, setDistance] = useState(0);
    const [isDesktop, setIsDesktop] = useState(false);
    const [active, setActive] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });
    const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        setActive(Math.min(PROJECTS.length - 1, Math.max(0, Math.round(v * (PROJECTS.length - 1)))));
    });

    useEffect(() => {
        const measure = () => {
            const desktop = window.matchMedia('(min-width: 768px)').matches;
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            setIsDesktop(desktop && !reduced);
            if (trackRef.current && desktop && !reduced) {
                setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
            } else {
                setDistance(0);
            }
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    // Mobile / reduced-motion: simple horizontal swipe rail
    if (!isDesktop) {
        return (
            <section id="projects" className="section-pad bg-night">
                <div className="max-w-7xl mx-auto mb-10">
                    <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase">/ Selected Work</span>
                    <h2 className="font-display text-4xl sm:text-5xl mt-3">PROJECTS</h2>
                </div>
                <div className="flex gap-5 overflow-x-auto pb-6 px-1 snap-x">
                    {PROJECTS.map((p, i) => (
                        <div key={p.title} className="snap-center">
                            <ProjectCard p={p} index={i} />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative bg-night"
            style={{ height: `calc(100vh + ${distance}px)` }}
        >
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                {/* Sticky left panel */}
                <aside className="absolute top-0 left-0 z-20 h-full w-[30vw] max-w-[420px] p-10 flex flex-col justify-center pointer-events-none">
                    <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase">/ Selected Work</span>
                    <h2 className="font-display text-5xl lg:text-7xl mt-3 mb-6 leading-none">
                        SELECTED
                        <br />
                        <span className="text-gradient">WORK</span>
                    </h2>
                    <div className="flex items-end gap-2 mb-6">
                        <motion.span key={active} className="font-display text-7xl text-ink leading-none">
                            {String(active + 1).padStart(2, '0')}
                        </motion.span>
                        <span className="font-mono text-muted mb-2">/ {String(PROJECTS.length).padStart(2, '0')}</span>
                    </div>
                    <p className="text-muted text-sm max-w-[16rem] mb-6 min-h-[3rem]">{PROJECTS[active].desc}</p>
                    <div className="flex gap-2">
                        {PROJECTS.map((_, i) => (
                            <span
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i === active ? 'w-8 bg-gold' : 'w-3 bg-white/15'
                                }`}
                            />
                        ))}
                    </div>
                </aside>

                {/* Horizontal track */}
                <motion.div
                    ref={trackRef}
                    style={{ x }}
                    className="flex gap-7 items-center pl-[34vw] pr-[6vw]"
                >
                    {PROJECTS.map((p, i) => (
                        <ProjectCard key={p.title} p={p} index={i} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
