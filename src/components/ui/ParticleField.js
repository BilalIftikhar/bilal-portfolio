'use client';

import { useEffect, useRef } from 'react';

/**
 * Lightweight canvas particle field — max 30 nodes on a single rAF loop.
 *
 * The loop is suspended whenever the canvas scrolls out of view or the tab is
 * hidden, so it stops burning frames as soon as the visitor moves past the
 * hero. Disabled entirely for reduced motion.
 */
export default function ParticleField({ count = 28, className = '' }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let raf = 0;
        let w = 0;
        let h = 0;
        let running = false;
        let onScreen = true;
        const n = Math.min(count, 30);
        const colors = ['rgba(79,142,247,', 'rgba(124,58,237,', 'rgba(201,169,110,'];
        let parts = [];

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = canvas.offsetWidth;
            h = canvas.offsetHeight;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const seed = () => {
            parts = Array.from({ length: n }, (_, i) => ({
                x: (((i * 97) % 100) / 100) * w,
                y: (((i * 53) % 100) / 100) * h,
                vx: ((i % 7) - 3) / 12,
                vy: ((i % 5) - 2) / 14,
                r: 1 + (i % 3),
                c: colors[i % colors.length],
            }));
        };

        const draw = () => {
            if (!running) return;
            ctx.clearRect(0, 0, w, h);
            for (const p of parts) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.c + '0.55)';
                ctx.fill();
            }
            raf = requestAnimationFrame(draw);
        };

        const start = () => {
            if (running || !onScreen || document.visibilityState !== 'visible') return;
            running = true;
            raf = requestAnimationFrame(draw);
        };
        const stop = () => {
            running = false;
            cancelAnimationFrame(raf);
        };

        // Named handler so it can actually be removed on cleanup — the previous
        // version registered an inline closure and removed a different function,
        // leaking a listener on every mount.
        const onResize = () => {
            resize();
            seed();
        };

        const onVisibility = () => (document.visibilityState === 'visible' ? start() : stop());

        const io = new IntersectionObserver(
            ([entry]) => {
                onScreen = entry.isIntersecting;
                onScreen ? start() : stop();
            },
            { threshold: 0 }
        );

        resize();
        seed();
        io.observe(canvas);
        window.addEventListener('resize', onResize, { passive: true });
        document.addEventListener('visibilitychange', onVisibility);
        start();

        return () => {
            stop();
            io.disconnect();
            window.removeEventListener('resize', onResize);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [count]);

    return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
