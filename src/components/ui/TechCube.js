'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

const FACES = [
    { label: 'AI', t: 'translateZ(70px)', cls: 'text-success', glow: '16,185,129' },
    { label: 'TS', t: 'rotateY(90deg) translateZ(70px)', cls: 'text-primary', glow: '79,142,247' },
    { label: 'PY', t: 'rotateY(180deg) translateZ(70px)', cls: 'text-gold', glow: '201,169,110' },
    { label: 'JS', t: 'rotateY(-90deg) translateZ(70px)', cls: 'text-secondary-light', glow: '124,58,237' },
    { label: '{ }', t: 'rotateX(90deg) translateZ(70px)', cls: 'text-primary-light', glow: '79,142,247' },
    { label: 'GPT', t: 'rotateX(-90deg) translateZ(70px)', cls: 'text-success', glow: '16,185,129' },
];

/**
 * Interactive 3D cube. Idles on a slow auto-spin and hands control to the
 * pointer on hover or drag, easing back to the idle spin on release.
 *
 * The spin loop is driven by a motion value (no React renders) and is
 * suspended whenever the cube scrolls off screen or the tab is hidden, so
 * it costs nothing while the visitor is elsewhere on the page.
 */
export default function TechCube() {
    const reduced = useReducedMotion();
    const hostRef = useRef(null);

    const rotY = useMotionValue(0);
    const rotX = useMotionValue(-20);
    const springY = useSpring(rotY, { stiffness: 90, damping: 18, mass: 0.8 });
    const springX = useSpring(rotX, { stiffness: 90, damping: 18, mass: 0.8 });

    const dragging = useRef(false);
    const hovering = useRef(false);

    useEffect(() => {
        if (reduced) return;
        const host = hostRef.current;
        if (!host) return;

        let raf = 0;
        let last = 0;
        let onScreen = true;
        let running = false;

        const frame = (ts) => {
            if (!running) return;
            const dt = last ? Math.min(ts - last, 64) : 16;
            last = ts;
            if (!dragging.current && !hovering.current) {
                rotY.set(rotY.get() + dt * 0.026); // ~9.4°/s — a lap every ~38s
            }
            raf = requestAnimationFrame(frame);
        };

        const start = () => {
            if (running || !onScreen || document.visibilityState !== 'visible') return;
            running = true;
            last = 0;
            raf = requestAnimationFrame(frame);
        };
        const stop = () => {
            running = false;
            cancelAnimationFrame(raf);
        };

        const io = new IntersectionObserver(
            ([entry]) => {
                onScreen = entry.isIntersecting;
                onScreen ? start() : stop();
            },
            { threshold: 0.01 }
        );
        io.observe(host);

        const onVisibility = () => (document.visibilityState === 'visible' ? start() : stop());
        document.addEventListener('visibilitychange', onVisibility);
        start();

        return () => {
            stop();
            io.disconnect();
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [reduced, rotY]);

    const pointFromEvent = (e) => {
        const r = hostRef.current?.getBoundingClientRect();
        if (!r) return;
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        rotY.set(rotY.get() + nx * 6);
        rotX.set(Math.max(-70, Math.min(70, -20 - ny * 50)));
    };

    const handlers = reduced
        ? {}
        : {
              onPointerEnter: () => (hovering.current = true),
              onPointerLeave: () => {
                  hovering.current = false;
                  dragging.current = false;
                  rotX.set(-20);
              },
              onPointerDown: (e) => {
                  dragging.current = true;
                  e.currentTarget.setPointerCapture?.(e.pointerId);
              },
              onPointerUp: (e) => {
                  dragging.current = false;
                  e.currentTarget.releasePointerCapture?.(e.pointerId);
              },
              onPointerMove: (e) => {
                  if (!hovering.current && !dragging.current) return;
                  pointFromEvent(e);
              },
          };

    return (
        <div
            ref={hostRef}
            {...handlers}
            className="glass chroma rounded-2xl p-5 flex items-center justify-center min-h-[160px] cursor-grab active:cursor-grabbing touch-none"
            style={{ perspective: '700px' }}
        >
            <motion.div
                className="relative w-[100px] h-[100px]"
                // Always the same motion values, reduced or not — the spin loop
                // simply never starts for reduced motion. Branching the style
                // here would change the server-rendered transform.
                style={{
                    transformStyle: 'preserve-3d',
                    rotateX: springX,
                    rotateY: springY,
                }}
            >
                {FACES.map((f) => (
                    <div
                        key={f.label}
                        className={`absolute inset-0 grid place-items-center font-display text-3xl border border-white/10 ${f.cls}`}
                        style={{
                            transform: f.t,
                            backfaceVisibility: 'hidden',
                            background: `linear-gradient(140deg, rgba(${f.glow},0.16), rgba(10,10,26,0.75))`,
                            boxShadow: `inset 0 0 24px rgba(${f.glow},0.18)`,
                        }}
                    >
                        {f.label}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
