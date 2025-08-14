'use client';

import { Bell, ChevronDown, Menu, Search, User, X } from "lucide-react";
import { useState } from "react";
import { sidebarItems } from "@/constants/sidebar-items";

interface AppPageLayoutProps {
    children: React.ReactNode;
}

const AppPageLayout = ({ children }: AppPageLayoutProps) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="h-screen bg-gray-50 flex">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0 lg:flex lg:flex-col`}>
                {/* Sidebar Header */}
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
                    <h1 className="text-xl font-bold text-gray-900">Forkflow</h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <nav className="flex-1 px-4 py-6 overflow-y-auto">
                    <ul className="space-y-2">
                        {sidebarItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${item.active ? 'bg-emerald-50 text-emerald-700 border-r-4 border-emerald-500' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                                    >
                                        <Icon size={20} className="mr-3 flex-shrink-0" />
                                        <span>{item.label}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>

            {/* Main content area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top navbar */}
                <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                        {/* Left side */}
                        <div className="flex items-center flex-1">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 mr-4 transition-colors"
                            >
                                <Menu size={20} />
                            </button>

                            {/* Search bar */}
                            <div className="relative max-w-md w-full">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={16} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search contacts, companies..."
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center space-x-4 ml-4">
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <Bell size={20} />
                            </button>

                            {/* User profile */}
                            <div className="flex items-center space-x-3 cursor-pointer group">
                                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <User size={16} className="text-emerald-600" />
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-medium text-gray-900">Joe Bloggs</p>
                                    <p className="text-xs text-gray-500">Admin</p>
                                </div>
                                <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 overflow-auto">
                    <div className="p-4 sm:p-6 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AppPageLayout;