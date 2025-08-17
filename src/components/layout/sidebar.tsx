"use client";

import Image from "next/image";
import { Home, Users, Building2, Calendar, BarChart3, Settings, X } from 'lucide-react';
import { useState } from "react";

interface SidebarProps {
    sidebarOpen: boolean;
    handleViewChange: (view: string) => void;
    setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ sidebarOpen, handleViewChange, setSidebarOpen }: SidebarProps) => {

    const [activeItem, setActiveItem] = useState('dashboard');

    const sidebarItems = [
        { icon: Home, label: 'Dashboard' },
        { icon: Calendar, label: 'Bookings' },
        { icon: Building2, label: 'Restaurants' },
        { icon: Users, label: 'Staff' },
        { icon: BarChart3, label: 'Reports' },
        { icon: Settings, label: 'Settings' },
    ];

    const handleSelectAdminItem = (item: string) => {
        setActiveItem(item.toLowerCase());
        handleViewChange(item.toLowerCase());
    }

    return (
        <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-ff-light-blue transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0 lg:flex lg:flex-col`}>
            {/* Sidebar Header */}
            <div className="flex items-center justify-center text-center h-16 px-6 flex-shrink-0">
                <Image src={"/forkflow-logo-full.png"} height={150} width={400} alt={"Forkflow logo"} style={{ alignSelf: 'center' }} priority />
                {/* <h1 className="text-3xl font-bold text-ff-dark-blue ff-title-font">Forkflow</h1> */}
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden p-2 rounded-md text-ff-dark-blue hover:text-ff-light-blue hover:bg-ff-dark-blue transition-colors"
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
                                <div
                                    onClick={() => handleSelectAdminItem(item.label.toLowerCase())}
                                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${item.label.toLowerCase() === activeItem ? 'bg-ff-mid-blue text-ff-dark-blue border-r-4 border-ff-dark-blue' : 'text-ff-dark-blue hover:text-gray-900 hover:bg-ff-mid-blue'}`}
                                >
                                    <Icon size={20} className="mr-3 flex-shrink-0" />
                                    <span>{item.label}</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;