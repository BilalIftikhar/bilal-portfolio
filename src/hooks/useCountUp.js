'use client';

import { useEffect, useRef, useState } from 'react';
import { onAppReady } from '@/lib/appReady';

/**
 * Counts up to `target` once the element scrolls into view.
 * Returns [ref, value].
 *
 * Hardened against the "stuck on 0" cases that a naive
 * IntersectionObserver + requestAnimationFrame version hits:
 *
 *  1. Background tabs freeze requestAnimationFrame, so a counter that is
 *     "in view" on load in an unfocused tab never ticks and renders 0.
 *     There we skip the animation and show the real number straight away.
 *  2. IntersectionObserver does not model occlusion, so a counter under the
 *     intro overlay used to burn down unseen. `startDelay` lets the caller
 *     hold the hero counters until the overlay has lifted.
 *  3. If the animation is ever lost (aborted frame, throttled timer, an
 *     observer callback that lands after first paint) a safety timer armed
 *     at trigger time snaps to the target, so the number is never wrong.
 *
 * Respects prefers-reduced-motion by snapping straight to the target.
 */
export function useCountUp(target, { duration = 1800, startDelay = 0 } = {}) {
    const ref = useRef(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let raf = 0;
        let safety = 0;
        let startTimer = 0;
        let observer = null;
        let offReady = null;
        let triggered = false;
        let settled = false;

        const settle = () => {
            if (settled) return;
            settled = true;
            cancelAnimationFrame(raf);
            setValue(target);
        };

        const animate = () => {
            if (settled) return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                settle();
                return;
            }
            let start;
            const tick = (ts) => {
                if (settled) return;
                if (start === undefined) start = ts;
                const p = Math.min((ts - start) / duration, 1);
                if (p >= 1) {
                    settle();
                    return;
                }
                setValue(Math.round((1 - Math.pow(2, -10 * p)) * target));
                raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
        };

        /**
         * Trigger the count once the element is in view, the intro overlay is
         * gone, and the tab is genuinely visible.
         */
        const trigger = () => {
            if (triggered) return;
            triggered = true;

            // Loaded into a background tab: requestAnimationFrame is frozen, so
            // an animation here would render "0" to nobody and only resolve on
            // the safety timer. There is nothing to watch, so jump to the real
            // number — a correct value beats an animation the visitor missed.
            if (document.visibilityState !== 'visible') {
                settle();
                return;
            }

            // Whatever else happens to the animation, the real number lands.
            safety = window.setTimeout(settle, startDelay + duration + 4000);

            offReady = onAppReady(() => {
                offReady = null;
                startTimer = window.setTimeout(animate, startDelay);
            });
        };

        const isOnScreen = () => {
            const r = el.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;
            return r.top < vh - 40 && r.bottom > 40;
        };

        if (typeof IntersectionObserver === 'undefined') {
            trigger();
        } else {
            observer = new IntersectionObserver(
                (entries) => {
                    if (!entries.some((e) => e.isIntersecting)) return;
                    observer?.disconnect();
                    observer = null;
                    trigger();
                },
                { rootMargin: '0px 0px -40px 0px', threshold: 0.01 }
            );
            observer.observe(el);
            // Synchronous fallback: the observer callback can land after first
            // paint, which is what left the counter reading "0".
            if (isOnScreen()) {
                observer.disconnect();
                observer = null;
                trigger();
            }
        }

        return () => {
            settled = true;
            cancelAnimationFrame(raf);
            clearTimeout(safety);
            clearTimeout(startTimer);
            observer?.disconnect();
            offReady?.();
        };
    }, [target, duration, startDelay]);

    return [ref, value];
}
