'use client';

import { MotionConfig } from 'framer-motion';

/**
 * `reducedMotion="user"` makes framer drop transform and layout animations
 * for visitors who ask for reduced motion, while opacity still fades.
 *
 * This has to be handled centrally rather than by each component branching on
 * useReducedMotion(): that hook resolves to `false` during server rendering,
 * so any component that changed its *markup* based on it emitted one tree on
 * the server and a different one on the client, which failed hydration and
 * forced React to throw the whole page away and re-render it.
 */
export default function MotionProvider({ children }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
