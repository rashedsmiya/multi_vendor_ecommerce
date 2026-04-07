import { Head, usePage } from '@inertiajs/react';

import UserLayout from '@/layouts/user-layout';

export default function PodcastShow() {
    const { episode } = usePage<{ episode: string }>().props;

    return (
        <UserLayout>
            <Head title="Podcast Episode" />
            <div className="p-6">
                <h1 className="mb-6 text-2xl font-bold">Podcast Episode</h1>
                <div className="rounded-lg bg-white p-6 shadow">
                    <p className="text-gray-600">Episode: {episode}</p>
                </div>
            </div>
        </UserLayout>
    );
}
