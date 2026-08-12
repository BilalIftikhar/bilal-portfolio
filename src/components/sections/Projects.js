'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiGithub } from 'react-icons/fi';

const PROJECTS = [
    {
        title: 'IGIVU',
        category: 'XR Platform',
        desc: 'End-to-end VR/AR/MR platform serving 3,000+ organizations including Stanford, with synchronized multi-user sessions.',
        image: '/projects/igivu.png',
        tech: ['Next.js', 'Laravel', 'WebGL', 'AWS'],
        live: 'https://igivu.com/',
        repo: null,
        accent: '124,58,237',
    },
    {
        title: 'AV Leads',
        category: 'Talent Network',
        desc: 'Networking platform pairing live-event organizers with elite AV engineers via smart matching and real-time job flows.',
        image: '/projects/avleads.png',
        tech: ['React', 'Laravel', 'Redis', 'AWS'],
        live: 'https://avleads.com/',
        repo: null,
        accent: '16,185,129',
    },
    {
        title: 'PoolStore',
        category: 'E-Commerce',
        desc: "The UK's leading pool & spa retailer — a high-performance storefront with payments, inventory and faceted search.",
        image: '/projects/poolstore.png',
        tech: ['Vue.js', 'Laravel', 'Stripe'],
        live: 'https://poolstore.co.uk/',
        repo: null,
        accent: '79,142,247',
    },
    {
        title: 'SevenLift',
        category: 'Rental Platform',
        desc: 'Enterprise heavy-equipment rental for the UAE with real-time availability, multi-region coverage and booking.',
        image: '/projects/sevenlift.png',
        tech: ['Next.js', 'Node.js', 'PostgreSQL'],
        live: 'https://www.sevenlift.net/',
        repo: null,
        accent: '201,169,110',
    },
];

const COUNT = PROJECTS.length;

/** How far a neighbouring card sits from the centre, as a share of card width. */
const SPREAD = 0.62;
/** Cards further than this from the centre are fully faded out. */
const RANGE = 1.85;

/**
 * A single slide in the 3D deck.
 *
 * Every transform is derived from `pos` — the deck's current fractional index —
 * and is measured *relative to the centre of the stage*, so a card can never
 * travel past the edge of the viewport no matter how many projects exist. The
 * old horizontal track translated by the full track width and left the screen
 * completely empty at the end of the section.
 */
function DeckCard({ p, index, pos, onSelect }) {
    const offset = useTransform(pos, (v) => index - v);
    const clamped = useTransform(offset, (o) => Math.max(-RANGE, Math.min(RANGE, o)));
    const dist = useTransform(clamped, (o) => Math.abs(o));

    const x = useTransform(clamped, (o) => `${o * SPREAD * 100}%`);
    const rotateY = useTransform(clamped, (o) => -o * 34);
    const z = useTransform(dist, (d) => -d * 240);
    const scale = useTransform(dist, (d) => 1 - d * 0.16);
    const opacity = useTransform(dist, [0, 1, RANGE], [1, 0.55, 0]);
    const brightness = useTransform(dist, (d) => `brightness(${1 - Math.min(d, 1) * 0.45})`);
    const glow = useTransform(dist, [0, 0.6], [0.6, 0]);

    // Keep the centre card on top and stop faded cards swallowing clicks.
    const [interactive, setInteractive] = useState(index === 0);
    const [depth, setDepth] = useState(0);
    useMotionValueEvent(dist, 'change', (d) => {
        setInteractive(d < 0.5);
        setDepth(Math.round((RANGE - d) * 100));
    });

    return (
        // Outer layer fills the stage and flex-centres the card, so the card's
        // transform origin is always the middle of the screen. Positioning the
        // card itself with `absolute` alone left it at the container's start
        // edge, and the offsets then pushed it off screen.
        <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
                zIndex: depth,
                pointerEvents: interactive ? 'auto' : 'none',
                transformStyle: 'preserve-3d',
            }}
        >
        <motion.div
            className="relative w-[min(40vw,560px,46vh)]"
            style={{
                x,
                z,
                rotateY,
                scale,
                opacity,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
            }}
        >
            {/* Accent bloom behind the active card */}
            <motion.span
                aria-hidden="true"
                className="absolute -inset-10 rounded-[40px] blur-3xl"
                style={{
                    opacity: glow,
                    background: `radial-gradient(circle, rgba(${p.accent},0.55), transparent 70%)`,
                }}
            />

            <motion.article
                data-cursor="view"
                className="relative rounded-2xl overflow-hidden glass-strong ring-1 ring-white/10 shadow-2xl"
                style={{ filter: brightness }}
            >
                {/* Browser chrome — reads as a product shot rather than a bare image */}
                <div className="flex items-center gap-2 px-4 py-3 bg-night/80 border-b border-white/10">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                    <span className="ml-3 flex-1 truncate font-mono text-[10px] text-muted/80">
                        {p.live.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </span>
                    <span className="font-display text-lg text-gold leading-none">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={() => onSelect(index)}
                    aria-label={`Show ${p.title}`}
                    className="block relative w-full aspect-[16/10] cursor-pointer"
                >
                    <Image
                        src={p.image}
                        alt={`${p.title} — ${p.category.toLowerCase()} built with ${p.tech.join(', ')}`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 90vw, 560px"
                    />
                    {/* Light sweep across the active card */}
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background:
                                'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.14) 50%, transparent 65%)',
                        }}
                    />
                </button>
            </motion.article>

            {/* Floor reflection */}
            <motion.div
                aria-hidden="true"
                className="mt-2 h-12 rounded-2xl overflow-hidden opacity-25"
                style={{
                    transform: 'rotateX(180deg)',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
                }}
            >
                <div className="relative w-full aspect-[16/10]">
                    <Image
                        src={p.image}
                        alt=""
                        aria-hidden="true"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 90vw, 560px"
                    />
                </div>
            </motion.div>
        </motion.div>
        </div>
    );
}

/** Title, blurb, stack and links for whichever project is currently centred. */
function ProjectMeta({ active }) {
    const p = PROJECTS[active];
    return (
        <div className="relative mt-5 h-[190px] shrink-0 text-center px-6">
            <AnimatePresence mode="wait">
                <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0"
                >
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                        {p.category}
                    </span>
                    <h3 className="font-display text-4xl sm:text-5xl text-ink mt-2 leading-none">
                        {p.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed max-w-xl mx-auto mt-3">
                        {p.desc}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {p.tech.map((t, i) => (
                            <motion.span
                                key={t}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                                className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-muted border border-white/10"
                            >
                                {t}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

/**
 * Desktop: the section is pinned and scrolling moves the deck through its
 * projects in 3D. The stage is `overflow-hidden` and every card is placed
 * relative to the centre, so the deck is always on screen.
 */
function ProjectsDeck() {
    const sectionRef = useRef(null);
    const [active, setActive] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
        layoutEffect: false,
    });

    // scroll 0..1 -> fractional deck index 0..COUNT-1, smoothed so the cards
    // glide rather than tracking the scroll wheel step for step.
    const raw = useTransform(scrollYProgress, [0, 1], [0, COUNT - 1]);
    const pos = useSpring(raw, { stiffness: 120, damping: 24, mass: 0.6 });

    useMotionValueEvent(pos, 'change', (v) => {
        setActive(Math.max(0, Math.min(COUNT - 1, Math.round(v))));
    });

    /** Scroll to the window position that centres a given project. */
    const goTo = useCallback((i) => {
        const el = sectionRef.current;
        if (!el) return;
        const clampedIndex = Math.max(0, Math.min(COUNT - 1, i));
        const scrollable = el.offsetHeight - window.innerHeight;
        const top = el.offsetTop + (scrollable * clampedIndex) / (COUNT - 1);
        window.scrollTo({ top, behavior: 'smooth' });
    }, []);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative bg-night"
            style={{ height: `calc(100vh + ${(COUNT - 1) * 60}vh)` }}
            aria-roledescription="carousel"
            aria-label="Selected work"
        >
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
                <div className="text-center pt-20 shrink-0">
                    <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase">
                        / Selected Work
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-2 leading-none">
                        SELECTED <span className="text-gradient">WORK</span>
                    </h2>
                </div>

                {/* 3D stage — overflow-hidden is the hard guarantee that no card
                    can ever render outside the viewport. */}
                <div
                    className="relative flex-1 min-h-0 flex items-center justify-center overflow-hidden"
                    style={{ perspective: '1600px' }}
                >
                    <div
                        className="relative flex items-center justify-center w-full h-full"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {PROJECTS.map((p, i) => (
                            <DeckCard key={p.title} p={p} index={i} pos={pos} onSelect={goTo} />
                        ))}
                    </div>
                </div>

                <ProjectMeta active={active} />

                {/* Controls */}
                <div className="flex flex-wrap items-center justify-center gap-4 pb-8 shrink-0">
                    <button
                        type="button"
                        onClick={() => goTo(active - 1)}
                        disabled={active === 0}
                        aria-label="Previous project"
                        className="w-11 h-11 grid place-items-center rounded-full glass text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold/50 transition-colors"
                    >
                        <FiArrowLeft />
                    </button>

                    <div className="flex items-center gap-2">
                        {PROJECTS.map((p, i) => (
                            <button
                                key={p.title}
                                type="button"
                                onClick={() => goTo(i)}
                                aria-label={`Go to ${p.title}`}
                                aria-current={i === active}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i === active ? 'w-9 bg-gold' : 'w-3 bg-white/20 hover:bg-white/40'
                                }`}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => goTo(active + 1)}
                        disabled={active === COUNT - 1}
                        aria-label="Next project"
                        className="w-11 h-11 grid place-items-center rounded-full glass text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold/50 transition-colors"
                    >
                        <FiArrowRight />
                    </button>

                    <a
                        href={PROJECTS[active].live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold !py-2.5 !px-5 !text-xs ml-2"
                    >
                        Live Site <FiArrowUpRight />
                    </a>
                    {PROJECTS[active].repo && (
                        <a
                            href={PROJECTS[active].repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${PROJECTS[active].title} source code on GitHub`}
                            className="btn-ghost !py-2.5 !px-4 !text-xs"
                        >
                            <FiGithub />
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}

/** Mobile / reduced motion: a plain stacked list. Nothing overflows. */
function ProjectsList() {
    return (
        <section id="projects" className="section-pad bg-night">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase">
                        / Selected Work
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl mt-2">
                        SELECTED <span className="text-gradient">WORK</span>
                    </h2>
                </div>

                <div className="space-y-8">
                    {PROJECTS.map((p, i) => (
                        <motion.article
                            key={p.title}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                            className="chroma glass rounded-2xl overflow-hidden"
                        >
                            <div className="flex items-center gap-2 px-4 py-3 bg-night/70 border-b border-white/10">
                                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                                <span className="ml-2 flex-1 truncate font-mono text-[10px] text-muted/80">
                                    {p.live.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                                </span>
                                <span className="font-display text-lg text-gold leading-none">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </div>

                            <div className="relative w-full aspect-[16/10]">
                                <Image
                                    src={p.image}
                                    alt={`${p.title} — ${p.category.toLowerCase()} built with ${p.tech.join(', ')}`}
                                    fill
                                    className="object-cover object-top"
                                    sizes="(max-width: 768px) 92vw, 640px"
                                />
                            </div>

                            <div className="p-6">
                                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                                    {p.category}
                                </span>
                                <h3 className="font-display text-3xl text-ink mt-1.5">{p.title}</h3>
                                <p className="text-muted text-sm leading-relaxed mt-2">{p.desc}</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {p.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-muted border border-white/10"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <a
                                    href={p.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-gold !py-2.5 !px-5 !text-xs mt-5"
                                >
                                    Live Site <FiArrowUpRight />
                                </a>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function Projects() {
    // Server and first client render agree on the list; the 3D deck is swapped
    // in only once we know the viewport can carry it.
    const [deck, setDeck] = useState(false);

    useEffect(() => {
        const mqDesktop = window.matchMedia('(min-width: 768px)');
        const mqShort = window.matchMedia('(min-height: 700px)');
        const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setDeck(mqDesktop.matches && mqShort.matches && !mqReduced.matches);
        sync();
        for (const mq of [mqDesktop, mqShort, mqReduced]) mq.addEventListener('change', sync);
        return () => {
            for (const mq of [mqDesktop, mqShort, mqReduced]) mq.removeEventListener('change', sync);
        };
    }, []);

    return deck ? <ProjectsDeck /> : <ProjectsList />;
}
