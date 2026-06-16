'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks scroll position: { scrolled, hidden }.
 * hidden = true when scrolling down past a threshold (navbar should hide).
 */
export function useScrollDirection({ threshold = 240 } = {}) {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        let last = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 40);
            if (y > threshold && y > last + 6) setHidden(true);
            else if (y < last - 6 || y < threshold) setHidden(false);
            last = y;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);

    return { scrolled, hidden };
}
