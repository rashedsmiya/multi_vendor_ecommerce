import { Head } from '@inertiajs/react';

import UserDashboardLayout from '@/layouts/user-dashboard-layout.tsx';

export default function Courses() {
    return (
        <UserDashboardLayout>
            <Head title="My Courses" />
            <div className="p-6">
                <h1 className="mb-6 text-2xl font-bold">My Courses</h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-2 text-lg font-semibold">
                            Enrolled courses
                        </h2>
                        <p className="text-gray-600">
                            Your enrolled courses will appear here.
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-2 text-lg font-semibold">In progress</h2>
                        <p className="text-gray-600">
                            Continue where you left off.
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-2 text-lg font-semibold">Completed</h2>
                        <p className="text-gray-600">
                            Completed courses will be listed here.
                        </p>
                    </div>
                </div>
            </div>
        </UserDashboardLayout>
    );
}
