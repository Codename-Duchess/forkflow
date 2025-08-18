import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Phone, Mail, Calendar, Clock, Users } from 'lucide-react';
import { StaffMember } from '@/types/staff';

interface StaffTableProps {
    staffData: StaffMember[];
}

const StaffTable = ({ staffData }: StaffTableProps) => {

    const [staff, setStaff] = useState(staffData);

    useEffect(() => {
        setStaff(staffData);
    }, [staffData]);

    const handleEditStaffMemberRequest = (staffMember: StaffMember) => {
        console.log("Editing staff member: ", staffMember);
    }

    const handleDeleteStaffMemberRequest = (staffMember: StaffMember) => {
        console.log("Deleting staff member: ", staffMember);
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact details</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emergency contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {staff.map((staffMember: StaffMember) => (
                            <tr key={staffMember.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                                    #{staffMember.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {staffMember.restaurant_id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {staffMember.first_name} {staffMember.last_name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {staffMember.department}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {staffMember.job_title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        <span>{staffMember.staff_member_email}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 mt-1">
                                        <Clock className="h-4 w-4 text-gray-400" />
                                        <span>{staffMember.staff_member_phone}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        <span>{staffMember.ice_name}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 mt-1">
                                        <Clock className="h-4 w-4 text-gray-400" />
                                        <span>{staffMember.ice_phone}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div>{new Date(staffMember.last_updated).toLocaleString('en-GB')}</div>
                                    <div className="text-xs">by {staffMember.updated_by}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditStaffMemberRequest(staffMember)}
                                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                            title="Edit staff member"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteStaffMemberRequest(staffMember)}
                                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                            title="Delete staff member"
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
                {staff.map((staffMember: StaffMember) => (
                    <div key={staffMember.id} className="border-b border-gray-200 p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-sm font-mono text-gray-500">#{staffMember.id}</span>
                                <div className="font-medium text-gray-900">{staffMember.first_name} {staffMember.last_name}</div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEditStaffMemberRequest(staffMember)}
                                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                >
                                    <Edit className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteStaffMemberRequest(staffMember)}
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
                                    <span>{staffMember.department}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-gray-600 mt-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{staffMember.job_title}</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center space-x-1 text-gray-600">
                                    <Users className="h-4 w-4" />
                                    <span>{staffMember.staff_member_email}</span>
                                </div>
                                <div className="mt-1">
                                    {staffMember.staff_member_phone}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                                <Mail className="h-3 w-3" />
                                <span>{staffMember.ice_name}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Phone className="h-3 w-3" />
                                <span>{staffMember.ice_phone}</span>
                            </div>
                        </div>

                        

                        <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                            <div>Last updated: {new Date(staffMember.last_updated).toLocaleString()} by {staffMember.updated_by}</div>
                        </div>
                    </div>
                ))}
            </div>

            {staff.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No staff members found</p>
                </div>
            )}
        </div>
    );
};

export default StaffTable;