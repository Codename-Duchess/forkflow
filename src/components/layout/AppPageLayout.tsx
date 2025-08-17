'use client';

import { Bell, ChevronDown, Menu, User } from "lucide-react";
import { useState } from "react";
import Sidebar from "./sidebar";
import { useView } from "@/context/ViewContext";

interface AppPageLayoutProps {
    children: React.ReactNode;
    user: any;
}

const AppPageLayout = ({ children, user }: AppPageLayoutProps) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { selectedView, setSelectedView } = useView();

    const handleViewChange = (view: string) => {
        console.log(`Changing view to: ${view}`);
        setSelectedView(view);
        setSidebarOpen(false); 
    };

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
            <Sidebar sidebarOpen={sidebarOpen} handleViewChange={handleViewChange} setSidebarOpen={setSidebarOpen} />

            {/* Main content area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top navbar */}
                <header className="bg-ff-light-blue shadow-sm flex-shrink-0">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                        {/* Left side */}
                        <div className="flex items-center flex-1">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-md text-ff-dark-blue hover:text-ff-light-blue hover:bg-ff-dark-blue mr-4 transition-colors"
                            >
                                <Menu size={20} />
                            </button>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center space-x-4 ml-4">
                            <button className="p-2 text-ff-dark-blue hover:text-ff-light-blue hover:bg-ff-dark-blue rounded-lg transition-colors"aria-label="Notifications">
                                <Bell size={20} />
                            </button>

                            {/* User profile */}
                            <div className="flex items-center space-x-3 cursor-pointer group">
                                <div className="w-8 h-8 bg-ff-dark-blue rounded-full flex items-center justify-center">
                                    <User size={16} className="text-ff-light-blue" />
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-medium text-ff-dark-blue">{user.firstName} {user.lastName}</p>
                                    <p className="text-xs text-ff-dark-blue">{user.role || ''}</p>
                                </div>
                                <ChevronDown size={16} className="text-ff-dark-blue group-hover:text-ff-light-blue group-hover:bg-ff-dark-blue transition-colors" />
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