'use client';

import { useEffect } from 'react';
import AOS from 'aos';

export default function AOSWrapper({ children }) {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
        });
    }, []);

    return <>{children}</>;
}
