'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Splits text into per-character motion spans that fly in with stagger.
 * Each word is wrapped in an overflow-hidden span so characters clip cleanly.
 */
export default function KineticText({
    text,
    as: Tag = 'span',
    className,
    charClassName,
    stagger = 0.03,
    delay = 0,
    trigger = 'scroll', // 'scroll' | 'load'
    once = true,
}) {
    const reduced = useReducedMotion();
    const words = String(text).split(' ');

    const container = {
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
    };
    const charV = reduced
        ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
        : {
              hidden: { y: '110%', opacity: 0, rotateX: -75 },
              visible: {
                  y: '0%',
                  opacity: 1,
                  rotateX: 0,
                  transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] },
              },
          };

    const animProps =
        trigger === 'load'
            ? { initial: 'hidden', animate: 'visible' }
            : { initial: 'hidden', whileInView: 'visible', viewport: { once, margin: '-60px' } };

    return (
        <Tag className={cn('inline-block', className)}>
            <motion.span variants={container} {...animProps} className="inline-block">
                {words.map((word, wi) => (
                    <span
                        key={wi}
                        className="inline-block overflow-hidden align-bottom"
                        style={{ perspective: 600 }}
                    >
                        {word.split('').map((ch, ci) => (
                            <motion.span
                                key={ci}
                                variants={charV}
                                className={cn('inline-block', charClassName)}
                                style={{ transformOrigin: 'bottom' }}
                            >
                                {ch}
                            </motion.span>
                        ))}
                        {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
                    </span>
                ))}
            </motion.span>
        </Tag>
    );
}
