import { Head, usePage } from '@inertiajs/react';

import UserDashboardLayout from '@/layouts/user-dashboard-layout.tsx';

export default function CourseShow() {
    const { course } = usePage<{ course: string }>().props;

    return (
        <UserDashboardLayout>
            <Head title="Course" />
            <div className="p-6">
                <h1 className="mb-6 text-2xl font-bold">Course</h1>
                <div className="rounded-lg bg-white p-6 shadow">
                    <p className="text-gray-600">Course: {course}</p>
                </div>
            </div>
        </UserDashboardLayout>
    );
}
