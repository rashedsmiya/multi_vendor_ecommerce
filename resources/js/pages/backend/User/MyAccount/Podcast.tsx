import { Head } from '@inertiajs/react';

import UserLayout from '@/layouts/user-layout';

export default function Podcast() {
    return (
        <UserLayout>
            <Head title="Podcast" />
            <div className="p-6">
                <h1 className="mb-6 text-2xl font-bold">Podcast</h1>
            </div>
        </UserLayout>
    );
}
