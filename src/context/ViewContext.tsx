'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ViewContextType {
    selectedView: string;
    setSelectedView: (view: string) => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider = ({ children }: { children: ReactNode }) => {
    const [selectedView, setSelectedView] = useState('dashboard');

    return (
        <ViewContext.Provider value={{ selectedView, setSelectedView }}>
            {children}
        </ViewContext.Provider>
    );
};

export const useView = () => {
    const context = useContext(ViewContext);
    if (context === undefined) {
        throw new Error('useView must be used within a ViewProvider');
    }
    return context;
};