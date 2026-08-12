'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Gradient reading-progress bar pinned to the top of the viewport.
 * Driven entirely by a motion value, so scrolling never re-renders React.
 */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 140,
        damping: 28,
        restDelta: 0.001,
    });

    return (
        <motion.div
            aria-hidden="true"
            style={{ scaleX, transformOrigin: '0%' }}
            className="fixed top-0 inset-x-0 z-[9600] h-[3px] bg-gradient-to-r from-primary via-secondary to-gold"
        />
    );
}
