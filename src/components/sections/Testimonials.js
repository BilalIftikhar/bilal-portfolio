'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

const DATA = [
    { name: 'Sarah Johnson', company: 'CEO, TechStart Inc.', quote: 'Bilal shipped an LLM assistant into our product that actually scaled. Clean architecture, sharp UX instincts, zero hand-holding.' },
    { name: 'Michael Chen', company: 'CTO, AV Leads', quote: 'He built our platform end-to-end and layered in AI matching. The code quality and reliability are simply outstanding.' },
    { name: 'Emily Rodriguez', company: 'PM, PoolStore', quote: 'Beautiful, fast and conversion-focused. His attention to detail made the entire project feel effortless.' },
    { name: 'David Thompson', company: 'Founder, IGIVU', quote: 'Complex XR integrations delivered as a robust system serving thousands of orgs. A genuinely senior engineer.' },
    { name: 'Aisha Khan', company: 'Head of Product, NovaAI', quote: 'Our RAG pipeline went from flaky prototype to grounded, citation-backed answers. Exactly the AI partner we needed.' },
];

const initials = (n) => n.split(' ').map((x) => x[0]).slice(0, 2).join('');
const GRADS = [
    'from-primary to-secondary',
    'from-success to-primary',
    'from-gold to-secondary',
    'from-secondary to-primary',
    'from-primary to-success',
];

export default function Testimonials() {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const n = DATA.length;
    const touch = useRef(null);

    const go = (dir) => setActive((a) => (a + dir + n) % n);

    useEffect(() => {
        if (paused) return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) return;
        const id = setInterval(() => setActive((a) => (a + 1) % n), 4000);
        return () => clearInterval(id);
    }, [paused, n]);

    const onDown = (e) => (touch.current = e.clientX ?? e.touches?.[0]?.clientX);
    const onUp = (e) => {
        if (touch.current == null) return;
        const end = e.clientX ?? e.changedTouches?.[0]?.clientX;
        const d = end - touch.current;
        if (Math.abs(d) > 50) go(d < 0 ? 1 : -1);
        touch.current = null;
    };

    return (
        <section id="testimonials" className="section-pad bg-surface/30 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase">/ Kind Words</span>
                    <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl mt-3">TESTIMONIALS</h2>
                </div>

                {/* 3D stage */}
                <div
                    className="relative h-[420px] sm:h-[380px] select-none"
                    style={{ perspective: '1400px' }}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onPointerDown={onDown}
                    onPointerUp={onUp}
                >
                    {DATA.map((t, i) => {
                        let offset = i - active;
                        if (offset > n / 2) offset -= n;
                        if (offset < -n / 2) offset += n;
                        const abs = Math.abs(offset);
                        const isActive = offset === 0;
                        return (
                            <div
                                key={t.name}
                                className="absolute inset-0 grid place-items-center"
                                style={{ zIndex: 10 - abs, pointerEvents: isActive ? 'auto' : 'none' }}
                            >
                            <motion.article
                                className="w-[88vw] max-w-[440px]"
                                animate={{
                                    x: `${offset * 60}%`,
                                    rotateY: offset * -34,
                                    scale: isActive ? 1 : 0.82,
                                    opacity: abs > 2 ? 0 : isActive ? 1 : 0.45,
                                    filter: isActive ? 'blur(0px)' : 'blur(2px)',
                                }}
                                transition={{ type: 'spring', stiffness: 200, damping: 26 }}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div className="chroma glass-strong rounded-3xl p-8 h-[340px] flex flex-col">
                                    <span className="font-display text-6xl text-gold/40 leading-none mb-2" aria-hidden="true">
                                        &ldquo;
                                    </span>
                                    <p className="font-heading italic text-ink/90 text-lg leading-relaxed flex-1">
                                        {t.quote}
                                    </p>
                                    <div className="flex items-center gap-3 mt-4">
                                        <span className={`w-12 h-12 rounded-full grid place-items-center font-heading font-bold text-white bg-gradient-to-br ${GRADS[i % GRADS.length]}`}>
                                            {initials(t.name)}
                                        </span>
                                        <div>
                                            <p className="text-ink font-semibold text-sm">{t.name}</p>
                                            <p className="text-muted text-xs">{t.company}</p>
                                        </div>
                                        <div className="ml-auto flex gap-0.5 text-gold">
                                            {Array.from({ length: 5 }).map((_, s) => (
                                                <motion.span
                                                    key={s}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 1 }}
                                                    transition={{ delay: isActive ? s * 0.08 : 0 }}
                                                >
                                                    <FiStar className="fill-gold" size={13} />
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                            </div>
                        );
                    })}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 mt-8">
                    <button onClick={() => go(-1)} aria-label="Previous" className="w-11 h-11 grid place-items-center rounded-full glass text-ink hover:text-gold transition-colors">
                        <FiChevronLeft />
                    </button>
                    <div className="flex gap-2">
                        {DATA.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                aria-label={`Go to testimonial ${i + 1}`}
                                className={`h-2 rounded-full transition-all ${i === active ? 'w-7 bg-gold' : 'w-2 bg-white/20'}`}
                            />
                        ))}
                    </div>
                    <button onClick={() => go(1)} aria-label="Next" className="w-11 h-11 grid place-items-center rounded-full glass text-ink hover:text-gold transition-colors">
                        <FiChevronRight />
                    </button>
                </div>
            </div>
        </section>
    );
}
