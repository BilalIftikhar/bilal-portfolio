'use client';

import { useEffect, useRef } from 'react';

/**
 * Lightweight canvas particle field — max 30 nodes, requestAnimationFrame,
 * transform-free (canvas draw). Disabled for reduced motion.
 */
export default function ParticleField({ count = 28, className = '' }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let raf;
        let w, h, dpr;
        const n = Math.min(count, 30);
        const colors = ['rgba(79,142,247,', 'rgba(124,58,237,', 'rgba(201,169,110,'];
        let parts = [];

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = canvas.offsetWidth;
            h = canvas.offsetHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        const seed = () => {
            parts = Array.from({ length: n }, (_, i) => ({
                x: ((i * 97) % 100) / 100 * w,
                y: ((i * 53) % 100) / 100 * h,
                vx: (((i % 7) - 3) / 12),
                vy: (((i % 5) - 2) / 14),
                r: 1 + (i % 3),
                c: colors[i % colors.length],
            }));
        };
        const draw = () => {
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

        resize();
        seed();
        draw();
        window.addEventListener('resize', () => {
            resize();
            seed();
        });
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, [count]);

    return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
