import { Head } from '@inertiajs/react';

import UserDashboardLayout from '@/layouts/user-dashboard-layout.tsx';

export default function MyLearning() {
    return (
        <UserDashboardLayout>
            <Head title="My Learning" />
            <div className="p-6">
                <h1 className="mb-6 text-2xl font-bold">My Learning</h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-2 text-lg font-semibold">In Progress</h2>
                        <p className="text-gray-600">Your active learning materials will appear here.</p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-2 text-lg font-semibold">Completed</h2>
                        <p className="text-gray-600">Your completed learning materials will appear here.</p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-2 text-lg font-semibold">Saved</h2>
                        <p className="text-gray-600">Your saved learning materials will appear here.</p>
                    </div>
                </div>
            </div>
        </UserDashboardLayout>
    );
}
