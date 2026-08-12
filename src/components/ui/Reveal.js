'use client';

import { motion } from 'framer-motion';

const OFFSETS = {
    up: { y: 32, x: 0 },
    down: { y: -32, x: 0 },
    left: { x: 48, y: 0 },
    right: { x: -48, y: 0 },
    none: { x: 0, y: 0 },
};

/**
 * One scroll-reveal primitive for the whole site, so every section enters
 * with the same easing and rhythm instead of each one hand-rolling its own.
 *
 * `blur` adds a short defocus-to-focus pass; `depth` brings the element
 * forward through Z for a subtle 3D entrance.
 */
export default function Reveal({
    children,
    from = 'up',
    delay = 0,
    duration = 0.7,
    blur = false,
    depth = false,
    once = true,
    amount = 0.2,
    className,
    as = 'div',
    ...props
}) {
    // No reduced-motion branch here: swapping the element type would change the
    // markup between server and client. <MotionConfig reducedMotion="user"> at
    // the root strips the movement and keeps the fade.
    const MotionTag = motion[as] ?? motion.div;
    const offset = OFFSETS[from] ?? OFFSETS.up;

    return (
        <MotionTag
            className={className}
            initial={{
                opacity: 0,
                ...offset,
                ...(blur ? { filter: 'blur(10px)' } : null),
                ...(depth ? { z: -120, rotateX: 8 } : null),
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                ...(blur ? { filter: 'blur(0px)' } : null),
                ...(depth ? { z: 0, rotateX: 0 } : null),
            }}
            viewport={{ once, amount }}
            transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
            style={depth ? { transformPerspective: 1000, transformStyle: 'preserve-3d' } : undefined}
            {...props}
        >
            {children}
        </MotionTag>
    );
}
