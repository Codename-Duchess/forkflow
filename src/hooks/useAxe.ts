'use client';

import { useEffect } from 'react';

export function useAxe() {
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_NODE_ENV === 'development' && typeof window !== 'undefined') {
            import('@axe-core/react').then((axe) => {
                axe.default(require('react'), require('react-dom'), 1000);
            });
        }
    }, []);
}