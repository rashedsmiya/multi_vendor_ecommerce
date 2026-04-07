import { Head } from '@inertiajs/react';

import UserLayout from '@/layouts/user-layout';

export default function Products() {
    return (
        <UserLayout>
            <Head title="Products" />
            <div className="p-6">
                <h1 className="mb-6 text-2xl font-bold">Products</h1>
            </div>
        </UserLayout>
    );
}

