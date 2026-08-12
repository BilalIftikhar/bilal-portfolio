'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Pointer-driven 3D tilt card.
 *
 * The pointer position is written into motion values, so tilting never
 * triggers a React render — the whole effect runs on the compositor.
 * A specular highlight tracks the cursor across the surface, and children
 * can be pushed onto their own Z plane with `<Tilt3D.Layer depth={n}>`.
 *
 * No-ops for coarse pointers and prefers-reduced-motion.
 */
export default function Tilt3D({
    children,
    className,
    max = 12,
    scale = 1.02,
    glare = true,
    perspective = 900,
    as: Tag = 'div',
    style,
    ...props
}) {
    const reduced = useReducedMotion();
    const ref = useRef(null);

    // -0.5 … 0.5 relative to the card centre
    const px = useMotionValue(0);
    const py = useMotionValue(0);
    const lift = useMotionValue(0);

    const spring = { stiffness: 220, damping: 22, mass: 0.6 };
    const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);
    const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);
    const s = useSpring(lift, spring);
    const cardScale = useTransform(s, [0, 1], [1, scale]);

    const glareX = useTransform(px, [-0.5, 0.5], ['0%', '100%']);
    const glareY = useTransform(py, [-0.5, 0.5], ['0%', '100%']);
    const glareOpacity = useSpring(useTransform(lift, [0, 1], [0, 0.16]), spring);
    const glareBg = useTransform(
        [glareX, glareY],
        ([x, y]) => `radial-gradient(circle at ${x} ${y}, #ffffff, transparent 55%)`
    );

    // Reduced motion disables the *behaviour*, not the markup — returning a
    // different element here would break hydration, since useReducedMotion is
    // always false on the server.
    const onPointerMove = (e) => {
        if (reduced || e.pointerType !== 'mouse') return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
        lift.set(1);
    };

    const onPointerLeave = () => {
        px.set(0);
        py.set(0);
        lift.set(0);
    };

    const MotionTag = motion[Tag] ?? motion.div;

    return (
        <MotionTag
            ref={ref}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            style={{
                // Caller styles first, so the tilt transform can never be
                // clobbered by an incoming `style` prop.
                ...style,
                rotateX,
                rotateY,
                scale: cardScale,
                // Set on the element itself: a `display: contents` wrapper has
                // no box, so a `perspective` there would never apply.
                transformPerspective: perspective,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
            }}
            className={cn('relative', className)}
            {...props}
        >
            {children}
            {glare && (
                <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
                    style={{ background: glareBg, opacity: glareOpacity }}
                />
            )}
        </MotionTag>
    );
}

/**
 * Lifts its children off the card surface for real parallax depth.
 * Must be used inside a <Tilt3D>.
 */
function Layer({ depth = 40, children, className, ...props }) {
    return (
        <div
            className={cn('relative', className)}
            style={{ transform: `translateZ(${depth}px)`, transformStyle: 'preserve-3d' }}
            {...props}
        >
            {children}
        </div>
    );
}

Tilt3D.Layer = Layer;
