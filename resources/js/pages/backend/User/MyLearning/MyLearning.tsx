import { Head } from '@inertiajs/react';

import UserDashboardLayout from '@/layouts/user-dashboard-layout.tsx';

export default function MyLearning() {
    return (
        <UserDashboardLayout>
            <Head title="My Learning" />
            <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">My Learning</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-2">Course Progress</h2>
                    <p className="text-gray-600">Your learning progress will appear here.</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-2">Recent Lessons</h2>
                    <p className="text-gray-600">Your recent lessons will appear here.</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-2">Achievements</h2>
                    <p className="text-gray-600">Your achievements will appear here.</p>
                </div>
            </div>
            </div>
        </UserDashboardLayout>
    );
}
