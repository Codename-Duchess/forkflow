'use client';

import { ReactNode } from 'react';
import { useAxe } from '@/hooks/useAxe';

export default function AxeWrapper({ children }: { children: ReactNode }) {
    useAxe();
    return <>{children}</>;
}