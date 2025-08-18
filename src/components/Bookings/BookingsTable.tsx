import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Phone, Mail, Calendar, Clock, Users } from 'lucide-react';
import { Booking } from '@/types/booking';

interface BookingsTableProps {
    bookingsData: Booking[];
}

const BookingsTable = ({ bookingsData }: BookingsTableProps) => {

    const [bookings, setBookings] = useState(bookingsData);

    useEffect(() => {
        setBookings(bookingsData);
    }, [bookingsData]);

    const handleEditBookingRequest = (booking: Booking) => {
        console.log("Editing booking: ", booking);
    }

    const handleDeleteBookingRequest = (booking: Booking) => {
        console.log("Deleting booking: ", booking);
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
                        {bookings.map((booking: Booking) => (
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
                                        <span>{new Date(booking.booking_date).toLocaleString('en-GB')}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 mt-1">
                                        <Clock className="h-4 w-4 text-gray-400" />
                                        <span>{new Date(booking.booking_time).toLocaleTimeString()}</span>
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
                                    {booking.booking_status}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                                    <div className="truncate" title={booking.special_requests}>
                                        {booking.special_requests || '-'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div>{new Date(booking.last_updated).toLocaleString('en-GB')}</div>
                                    <div className="text-xs">by {booking.updated_by}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditBookingRequest(booking)}
                                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                            title="Edit booking"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteBookingRequest(booking)}
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
                {bookings.map((booking: Booking) => (
                    <div key={booking.id} className="border-b border-gray-200 p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-sm font-mono text-gray-500">#{booking.id}</span>
                                <div className="font-medium text-gray-900">{booking.booking_name}</div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEditBookingRequest(booking)}
                                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                >
                                    <Edit className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteBookingRequest(booking)}
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
                                    <span>{new Date(booking.booking_date).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-gray-600 mt-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{new Date(booking.booking_time).toLocaleTimeString()}</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center space-x-1 text-gray-600">
                                    <Users className="h-4 w-4" />
                                    <span>{booking.party_size} guests</span>
                                </div>
                                <div className="mt-1">
                                    {booking.booking_status}
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
                            <div>Last updated: {new Date(booking.last_updated).toLocaleString()} by {booking.updated_by}</div>
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