"use client";

import { Plus, Filter, MoreVertical } from 'lucide-react';
import { mockContacts } from '@/constants/mock-contacts';
import { useEffect } from 'react';

interface DashboardProps {
    user: any
}

const Dashboard = ({ user }: DashboardProps) => {


    useEffect(() => {
        console.log("Dashboard component mounted with user:", user);
    }, []);

    return (
        <div aria-label="page-content">
            {/* Page header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                        <p className="mt-1 text-sm text-gray-500">Welcome
                            {user === false && <span> back</span>}, ! Here's what's happening today.</p>
                    </div>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors">
                        <Plus size={16} className="mr-2" />
                        Add Contact
                    </button>
                </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Contacts', value: '2,847', change: '+12%' },
                    { label: 'Active Leads', value: '156', change: '+8%' },
                    { label: 'Closed Deals', value: '43', change: '+23%' },
                    { label: 'Revenue', value: '$127K', change: '+15%' },
                ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                            </div>
                            <div>
                                <span className="inline-flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent contacts table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Table header */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Contacts</h3>
                        <div className="flex space-x-3">
                            <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                                <Filter size={16} className="mr-2" />
                                Filter
                            </button>
                            <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                                <MoreVertical size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table content */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mockContacts.map((contact, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-sm font-medium text-emerald-600">
                                                    {contact.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.company}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${contact.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                                            contact.status === 'Lead' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {contact.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-emerald-600 hover:text-emerald-900 transition-colors">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;