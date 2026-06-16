'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

const GLOWS = {
    blue: '0 0 48px rgba(79,142,247,0.22)',
    violet: '0 0 48px rgba(124,58,237,0.24)',
    green: '0 0 48px rgba(16,185,129,0.22)',
    amber: '0 0 48px rgba(201,169,110,0.24)',
    rose: '0 0 48px rgba(244,114,182,0.2)',
    none: '0 0 0 rgba(0,0,0,0)',
};

/**
 * Glassmorphism 2.0 card with optional 3D tilt-on-hover and category glow.
 */
export default function GlassCard({
    children,
    className,
    glow = 'blue',
    tilt = true,
    ...props
}) {
    const reduced = useReducedMotion();

    return (
        <motion.div
            className={cn('chroma rounded-2xl glass', className)}
            style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            whileHover={
                reduced || !tilt
                    ? { boxShadow: GLOWS[glow] }
                    : { rotateX: 4, rotateY: 4, scale: 1.02, boxShadow: GLOWS[glow] }
            }
            transition={{ type: 'spring', stiffness: 250, damping: 18 }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
