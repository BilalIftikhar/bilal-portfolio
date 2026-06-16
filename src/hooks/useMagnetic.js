'use client';

import { useRef } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Magnetic pull: returns a ref + x/y spring motion values.
 * Attach ref to the element and use x/y on a wrapped motion element.
 * The element drifts toward the cursor while hovered, springs back on leave.
 */
export function useMagnetic({ strength = 0.4, radius = 80 } = {}) {
    const ref = useRef(null);
    const reduced = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

    const onMouseMove = (e) => {
        if (reduced || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const max = Math.max(rect.width, rect.height) / 2 + radius;
        if (dist < max) {
            x.set(dx * strength);
            y.set(dy * strength);
        }
    };
    const onMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return { ref, x: sx, y: sy, onMouseMove, onMouseLeave };
}
