import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Phone, Mail, Calendar, Clock, Users } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';

interface BookingsTableProps {
    bookingsData: Booking[];
}

interface Booking {
    id: number,
    restaurant_id: number,
    created_at: string,
    booking_date: string,
    booking_time: string,
    party_size: number,
    special_requests: string,
    booking_status: string,
    booking_name: string,
    contact_email: string,
    contact_phone: string,
    last_updated: string,
    updated_by: number
}

const BookingsTable = async ({ bookingsData }: { bookingsData: Booking[] }) => {

    const user = await getCurrentUser();

    const [bookings, setBookings] = useState(bookingsData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/bookings?restaurant_id=${user.company_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }
                const data = await response.json();
                setBookings(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (companyId) {
            fetchBookings();
        }
    }, [companyId]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            confirmed: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            cancelled: 'bg-red-100 text-red-800',
            completed: 'bg-blue-100 text-blue-800'
        };

        return (
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
                {status}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-800">Error loading bookings: {error}</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party Size</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Special Requests</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                                    #{booking.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {booking.restaurant_id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        <span>{formatDate(booking.booking_date)}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 mt-1">
                                        <Clock className="h-4 w-4 text-gray-400" />
                                        <span>{formatTime(booking.booking_time)}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <div className="font-medium">{booking.booking_name}</div>
                                    <div className="flex items-center space-x-1 text-gray-500 mt-1">
                                        <Mail className="h-3 w-3" />
                                        <span className="text-xs">{booking.contact_email}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-gray-500 mt-1">
                                        <Phone className="h-3 w-3" />
                                        <span className="text-xs">{booking.contact_phone}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex items-center space-x-1">
                                        <Users className="h-4 w-4 text-gray-400" />
                                        <span>{booking.party_size}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getStatusBadge(booking.booking_status)}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                                    <div className="truncate" title={booking.special_requests}>
                                        {booking.special_requests || '-'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div>{formatDate(booking.last_updated)}</div>
                                    <div className="text-xs">by {booking.updated_by}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => onEdit?.(booking)}
                                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                            title="Edit booking"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete?.(booking.id)}
                                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                            title="Delete booking"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden">
                {bookings.map((booking) => (
                    <div key={booking.id} className="border-b border-gray-200 p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-sm font-mono text-gray-500">#{booking.id}</span>
                                <div className="font-medium text-gray-900">{booking.booking_name}</div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => onEdit?.(booking)}
                                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                >
                                    <Edit className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => onDelete?.(booking.id)}
                                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="flex items-center space-x-1 text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(booking.booking_date)}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-gray-600 mt-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{formatTime(booking.booking_time)}</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center space-x-1 text-gray-600">
                                    <Users className="h-4 w-4" />
                                    <span>{booking.party_size} guests</span>
                                </div>
                                <div className="mt-1">
                                    {getStatusBadge(booking.booking_status)}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                                <Mail className="h-3 w-3" />
                                <span>{booking.contact_email}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Phone className="h-3 w-3" />
                                <span>{booking.contact_phone}</span>
                            </div>
                        </div>

                        {booking.special_requests && (
                            <div className="text-sm">
                                <span className="font-medium text-gray-700">Special requests:</span>
                                <p className="text-gray-600 mt-1">{booking.special_requests}</p>
                            </div>
                        )}

                        <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                            <div>Restaurant: {booking.restaurant_id}</div>
                            <div>Last updated: {formatDate(booking.last_updated)} by {booking.updated_by}</div>
                        </div>
                    </div>
                ))}
            </div>

            {bookings.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No bookings found</p>
                </div>
            )}
        </div>
    );
};

export default BookingsTable;