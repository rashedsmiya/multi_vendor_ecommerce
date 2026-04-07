import { Head, usePage } from '@inertiajs/react';

import UserLayout from '@/layouts/user-layout';

export default function ProductShow() {
    const { product } = usePage<{ product: string }>().props;

    return (
        <UserLayout>
            <Head title="Product" />
            <div className="p-6">
                <h1 className="mb-6 text-2xl font-bold">Product</h1>
                <div className="rounded-lg bg-white p-6 shadow">
                    <p className="text-gray-600">Product: {product}</p>
                </div>
            </div>
        </UserLayout>
    );
}
