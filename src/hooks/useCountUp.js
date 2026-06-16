'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Counts up to `target` once the element scrolls into view.
 * Returns [ref, value]. Respects prefers-reduced-motion (snaps to target).
 */
export function useCountUp(target, { duration = 1800 } = {}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const reduced =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) {
            setValue(target);
            return;
        }
        let raf;
        let start;
        const tick = (ts) => {
            if (start === undefined) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            setValue(Math.round(eased * target));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, target, duration]);

    return [ref, value];
}
