import { Head, usePage } from '@inertiajs/react';
import { User } from 'lucide-react';

import UserDashboardLayout from '@/layouts/user-dashboard-layout';
import { type SharedData } from '@/types';

interface Props {
    // Add any props that might be passed from the controller
}

export default function Profile({}: Props) {
    const { props } = usePage<SharedData>();
    const user = props.auth.user;

    if (!user) {
        return (
            <UserDashboardLayout>
                <Head title="Profile" />
                <div className="text-center py-8">
                    <p className="text-gray-500">User not found</p>
                </div>
            </UserDashboardLayout>
        );
    }

    return (
        <UserDashboardLayout>
            <Head title="Profile" />

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <User className="h-8 w-8 text-blue-600" />
                    <h1 className="text-2xl font-semibold">Profile</h1>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Name</label>
                            <p className="mt-1 text-lg">{user.name}</p>
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-gray-500">Email</label>
                            <p className="mt-1 text-lg">{user.email}</p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-500">Role</label>
                            <p className="mt-1 text-lg capitalize">{user.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        </UserDashboardLayout>
    );
}
