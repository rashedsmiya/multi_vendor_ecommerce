import { Head, usePage } from '@inertiajs/react';

import UserDashboardLayout from '@/layouts/user-dashboard-layout.tsx';

export default function ConsultationShow() {
    const { slug } = usePage<{ slug: string }>().props;

    return (
        <UserDashboardLayout>
            <Head title="Consultation Details" />
            <div className="p-6">
                <h1 className="mb-6 text-2xl font-bold">
                    Consultation Details
                </h1>
                <div className="rounded-lg bg-white p-6 shadow">
                    <p className="text-gray-600">Consultation slug: {slug}</p>
                </div>
            </div>
        </UserDashboardLayout>
    );
}
