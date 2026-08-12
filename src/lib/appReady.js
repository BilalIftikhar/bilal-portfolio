/**
 * Tiny "the intro overlay is gone, the page is actually being looked at"
 * signal.
 *
 * IntersectionObserver has no concept of occlusion, so anything that animates
 * on enter would otherwise play out underneath the full-screen preloader and
 * be finished before the visitor ever sees the page. Entrance animations
 * subscribe here instead.
 */

let ready = false;
const waiters = new Set();
let failsafe = null;

export function markAppReady() {
    if (ready) return;
    ready = true;
    if (failsafe) {
        clearTimeout(failsafe);
        failsafe = null;
    }
    for (const fn of waiters) fn();
    waiters.clear();
}

export function isAppReady() {
    return ready;
}

/**
 * Runs `fn` once the app is ready (immediately if it already is).
 * Returns an unsubscribe function.
 */
export function onAppReady(fn) {
    if (ready) {
        fn();
        return () => {};
    }
    waiters.add(fn);

    // If the preloader never mounts or throws, nothing should stay stuck.
    if (failsafe === null && typeof window !== 'undefined') {
        failsafe = setTimeout(markAppReady, 4000);
    }

    return () => waiters.delete(fn);
}
