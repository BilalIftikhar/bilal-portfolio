'use client';

import { useEffect, useRef } from 'react';

/**
 * Dot (instant) + ring (lerp lag) cursor with contextual states driven by
 * data attributes on hovered elements:
 *   [data-cursor="view"]  -> gold "VIEW" pill
 *   [data-cursor="text"]  -> thin I-beam
 *   a/button/[data-magnetic] -> enlarged ring
 * Hidden on touch / reduced-motion.
 */
export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!fine || reduced) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mx = window.innerWidth / 2;
        let my = window.innerHeight / 2;
        let rx = mx;
        let ry = my;
        let raf = 0;
        let running = false;

        const onMove = (e) => {
            mx = e.clientX;
            my = e.clientY;
            dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
            start();
        };

        // The ring lerps toward the pointer, so once it has caught up there is
        // nothing left to animate — parking the loop keeps an idle page at 0%
        // CPU instead of running a frame callback forever.
        const loop = () => {
            const dx = mx - rx;
            const dy = my - ry;
            if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
                rx = mx;
                ry = my;
                ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
                running = false;
                return;
            }
            rx += dx * 0.16;
            ry += dy * 0.16;
            ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
            raf = requestAnimationFrame(loop);
        };

        function start() {
            if (running) return;
            running = true;
            raf = requestAnimationFrame(loop);
        }

        // Park both elements at the centre up front. Without this the loop is
        // idle until the first mousemove and the untransformed ring sits in
        // the top-left corner of the page.
        const park = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
        dot.style.transform = park;
        ring.style.transform = park;

        const onOver = (e) => {
            const viewEl = e.target.closest('[data-cursor="view"]');
            const textEl = e.target.closest('[data-cursor="text"]');
            const hoverEl = e.target.closest('a, button, [data-magnetic], input, textarea');
            ring.classList.toggle('is-view', !!viewEl);
            ring.classList.toggle('is-text', !!textEl && !viewEl);
            ring.classList.toggle('is-hover', !!hoverEl && !viewEl && !textEl);
            ring.textContent = viewEl ? 'VIEW' : '';
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        document.addEventListener('mouseover', onOver, { passive: true });

        return () => {
            running = false;
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
        };
    }, []);

    return (
        <>
            <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
            <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
        </>
    );
}
