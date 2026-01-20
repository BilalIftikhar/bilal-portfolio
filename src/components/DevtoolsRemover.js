'use client';

import { useEffect } from 'react';

export default function DevtoolsRemover() {
    useEffect(() => {
        // Remove devtools indicator elements
        const removeDevtoolsIndicator = () => {
            const indicators = document.querySelectorAll(
                '[id="devtools-indicator"], [id*="devtools"], [class*="devtools-indicator"]'
            );
            indicators.forEach((el) => {
                el.remove();
            });
        };

        // Remove immediately
        removeDevtoolsIndicator();

        // Use MutationObserver to catch dynamically added elements
        const observer = new MutationObserver(() => {
            removeDevtoolsIndicator();
        });

        // Observe the entire document for changes
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        // Cleanup
        return () => {
            observer.disconnect();
        };
    }, []);

    return null;
}
