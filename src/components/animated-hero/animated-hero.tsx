"use client";

import { useState, useEffect } from 'react';
import { Button } from '../ui/button/button';

export default function AnimatedHero() {
    const [showF, setShowF] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowF(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleScrollToForm = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative">
                {/* Main text container */}
                <div className="flex items-center text-7xl font-bold text-ff-dark-blue tracking-tight justify-center">
                    {/* Container for W and sliding F */}
                    <div className="relative inline-block overflow-hidden">
                        <h1>
                            <span className="inline-block ff-title-font">W</span>
                            {/* Sliding F that completely covers the W */}
                            <div
                                className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transform transition-transform duration-700 ease-out ${showF ? 'translate-y-0' : '-translate-y-full'
                                    } bg-ff-mid-blue`}
                            >
                                {/* Placeholder for your stylised F image - replace src with your actual image */}
                                <img
                                    src="forkflow-logo-right-aligned.png"
                                    alt="Stylised F"
                                    className="text-8xl font-bold text-white"
                                    style={{ width: '1em', height: '0.8em' }}
                                />
                            </div>
                        </h1>
                    </div>

                    <span className="ff-title-font">orkflow</span>
                </div>

                {/* Optional subtitle */}
                <div className="text-center mt-6">
                    <h2 className="text-xl text-ff-dark-blue ff-title-font">
                        Optimise your restaurant management with Forkflow
                    </h2>
                </div>
                <div className="text-center">
                    <Button className="mt-8 text-xl ff-title-font" variant="default" onClick={handleScrollToForm}>
                        Get started
                    </Button>
                </div>
            </div>
        </div>
    );
}