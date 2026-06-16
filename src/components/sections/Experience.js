'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ITEMS = [
    {
        company: 'Vocuit · AV Leads',
        role: 'Full Stack Developer — AI Integration',
        date: '2024 — Present',
        points: [
            'Architect scalable platforms with Next.js + Laravel for a global live-events talent network.',
            'Ship LLM-powered features: semantic matching, search and assistive workflows.',
            'Own performance, API design and end-to-end delivery.',
        ],
        tech: ['Next.js', 'Laravel', 'OpenAI', 'AWS'],
    },
    {
        company: 'Algolix Technologies',
        role: 'Senior Software Engineer',
        date: '2022 — 2024',
        points: [
            'Built scalable back-ends in Laravel and dynamic UIs in React, Next.js and Vue.',
            'Designed RAG and LLM-assisted features from prototype to release.',
            'Optimized database queries and collaborated across product & UX.',
        ],
        tech: ['Laravel', 'React', 'LangChain', 'MySQL'],
    },
    {
        company: 'Freelance & Agencies',
        role: 'Software Engineer',
        date: '2020 — 2022',
        points: [
            'Delivered 50+ web apps and storefronts for UK, UAE and US clients.',
            'Built reusable component libraries and CI/CD pipelines.',
            'Grew into full-stack ownership and applied-AI work.',
        ],
        tech: ['Vue', 'Node.js', 'Stripe', 'Docker'],
    },
];

function Dot() {
    return (
        <span className="relative grid place-items-center">
            <span className="h-4 w-4 rounded-full bg-gold ring-4 ring-night z-10" />
            <span className="absolute h-4 w-4 rounded-full bg-success animate-pulse-dot" />
        </span>
    );
}

function Card({ item }) {
    return (
        <div className="chroma glass rounded-2xl p-6">
            <span className="font-mono text-xs text-muted">{item.date}</span>
            <h3 className="font-heading font-bold text-xl text-ink mt-1">{item.role}</h3>
            <p className="text-secondary-light text-sm mb-4">{item.company}</p>
            <ul className="space-y-2 mb-4">
                {item.points.map((p, i) => (
                    <li key={i} className="text-muted text-sm flex gap-2 leading-relaxed">
                        <span className="text-gold mt-0.5 shrink-0">▸</span>
                        {p}
                    </li>
                ))}
            </ul>
            <div className="flex flex-wrap gap-2">
                {item.tech.map((t) => (
                    <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-muted border border-white/5">
                        {t}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function Experience() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start center', 'end center'],
    });
    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="experience" className="section-pad bg-night relative">
            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase">/ Journey</span>
                    <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl mt-3">EXPERIENCE</h2>
                </div>

                <div ref={ref} className="relative">
                    {/* Drawing center line (desktop) */}
                    <svg
                        className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-2"
                        preserveAspectRatio="none"
                        viewBox="0 0 2 100"
                        aria-hidden="true"
                    >
                        <line x1="1" y1="0" x2="1" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                        <motion.line
                            x1="1" y1="0" x2="1" y2="100"
                            stroke="#C9A96E" strokeWidth="2"
                            style={{ pathLength }}
                        />
                    </svg>
                    {/* Mobile line */}
                    <span className="md:hidden absolute left-[7px] top-0 h-full w-px bg-white/10" />

                    <div className="space-y-10 md:space-y-16">
                        {ITEMS.map((item, i) => {
                            const left = i % 2 === 0;
                            return (
                                <div key={item.company} className="relative md:grid md:grid-cols-2 md:gap-12 items-center">
                                    {/* Dot */}
                                    <div className="absolute left-0 md:left-1/2 top-1 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10">
                                        <Dot />
                                    </div>

                                    {/* Card */}
                                    <motion.div
                                        initial={{ opacity: 0, x: left ? -60 : 60 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: '-80px' }}
                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        className={`pl-8 md:pl-0 ${
                                            left ? 'md:col-start-1' : 'md:col-start-2'
                                        }`}
                                    >
                                        <Card item={item} />
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
