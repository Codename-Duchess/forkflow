'use client'

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Sparkles, Mail, Users, Zap } from 'lucide-react';
import Confetti from 'react-confetti';

export default function BetaThankYouPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowContent(true);
        }, 800);
    }, []);

    return (
        <div className="h-screen w-screen">
            <Confetti width={window.innerWidth} height={window.innerHeight} />

            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">

                {/* Confetti Canvas */}
                <canvas
                    ref={canvasRef}
                    className="fixed inset-0 pointer-events-none z-50"
                    style={{ width: '100%', height: '100%' }}
                />

                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
                    <div className="absolute -bottom-32 left-40 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
                </div>

                {/* Main content */}
                <div className={`relative z-20 max-w-2xl mx-auto text-center transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {/* Success icon with animation */}
                    <div className="mb-8 pt-4 relative">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full shadow-2xl transform transition-all duration-1000 hover:scale-110 animate-bounce">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                    </div>

                    {/* Main heading */}
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-6 animate-fade-in-up">
                        Welcome to the Beta!
                    </h1>

                    {/* Subheading */}
                    <p className="text-2xl text-gray-700 mb-8 animate-fade-in-up animation-delay-300">
                        Thank you for joining our exclusive Beta trial
                    </p>

                    {/* Success message */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-emerald-100 mb-8 animate-fade-in-up animation-delay-600">
                        <p className="text-lg text-gray-600 leading-relaxed">
                            🎉 You're all set! We're thrilled to have you as one of our early testers.
                            Your feedback will help shape the future of our platform, and as a thank you you'll be eligible for discounted modules.
                        </p>
                    </div>

                    {/* Next steps */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animation-delay-900">
                            <Mail className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
                            <h3 className="font-semibold text-gray-800 mb-2">Check your email</h3>
                            <p className="text-sm text-gray-600">We've sent you some information and will email you again once the Beta version is ready for use</p>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animation-delay-1200">
                            <Users className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
                            <h3 className="font-semibold text-gray-800 mb-2">Join our community</h3>
                            <p className="text-sm text-gray-600">Connect with other Beta testers, share feedback, and more with limited access to our Discord server</p>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animation-delay-1500">
                            <Zap className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
                            <h3 className="font-semibold text-gray-800 mb-2">Spread the word</h3>
                            <p className="text-sm text-gray-600">Once the Beta version has some initial feedback and some additional features have been added, we will issue you with some invite codes.</p>
                        </div>
                    </div>

                </div>

                {/* Custom styles */}
                <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .animation-delay-900 {
          animation-delay: 900ms;
        }
        
        .animation-delay-1200 {
          animation-delay: 1200ms;
        }
        
        .animation-delay-1500 {
          animation-delay: 1500ms;
        }
        
        .animation-delay-1800 {
          animation-delay: 1800ms;
        }
        
        .animation-delay-2100 {
          animation-delay: 2100ms;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
            </div>
        </div>

    );
}