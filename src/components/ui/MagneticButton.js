'use client';

import { motion } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic';
import { cn } from '@/lib/utils';

/**
 * Magnetic wrapper. Renders an anchor (href) or button that drifts toward
 * the cursor. Variants map to the .btn-gold / .btn-ghost styles, or pass
 * a fully custom className with variant="bare".
 */
export default function MagneticButton({
    children,
    href,
    variant = 'gold',
    className,
    strength = 0.45,
    download,
    onClick,
    type = 'button',
    ariaLabel,
    ...props
}) {
    const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic({ strength });
    const base =
        variant === 'gold' ? 'btn-gold' : variant === 'ghost' ? 'btn-ghost' : '';

    const inner = (
        <motion.span style={{ x, y }} className="inline-flex items-center gap-2 will-change-transform">
            {children}
        </motion.span>
    );

    const shared = {
        ref,
        onMouseMove,
        onMouseLeave,
        className: cn(base, className),
        'aria-label': ariaLabel,
        ...props,
    };

    if (href) {
        return (
            <a
                {...shared}
                href={href}
                download={download}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
                {inner}
            </a>
        );
    }
    return (
        <button {...shared} type={type} onClick={onClick}>
            {inner}
        </button>
    );
}
