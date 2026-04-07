import { Head } from '@inertiajs/react';

import UserDashboardLayout from '@/layouts/user-dashboard-layout.tsx';

export default function Consultations() {
    return (
        <UserDashboardLayout>
            <Head title="Consultations" />
            <div className="p-6">
                <h1 className="mb-6 text-2xl font-bold">Consultations</h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-2 text-lg font-semibold">
                            Upcoming Sessions
                        </h2>
                        <p className="text-gray-600">
                            Your upcoming consultation sessions will appear
                            here.
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-2 text-lg font-semibold">
                            Past Sessions
                        </h2>
                        <p className="text-gray-600">
                            Your past consultation sessions will appear here.
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-2 text-lg font-semibold">Book New</h2>
                        <p className="text-gray-600">
                            Book a new consultation session.
                        </p>
                    </div>
                </div>
            </div>
        </UserDashboardLayout>
    );
}
