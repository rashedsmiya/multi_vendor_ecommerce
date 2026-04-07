import { Head, useForm } from '@inertiajs/react';
import { User, Mail, Save } from 'lucide-react';

import OperatorDashboardLayout from '@/layouts/operator-dashboard-layout';

interface Props {
    user: {
        name: string;
        email: string;
    };
}

export default function ProfileSettings({ user }: Props) {
    const { data, setData, patch, processing, errors, recentlySuccessful } =
        useForm({
            name: user.name ?? '',
            email: user.email ?? '',
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch('/operator/profile');
    };

    return (
        <OperatorDashboardLayout>
            <Head title="Profile Settings" />

            <div className="mx-auto max-w-2xl">
                <h1
                    className="mb-6 text-2xl font-semibold tracking-tight"
                    style={{ color: 'var(--figma-heading-alt)' }}
                >
                    Profile Settings
                </h1>

                <div className="dashboard-card feature-card p-6">
                    <form onSubmit={submit} className="flex flex-col gap-5">
                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium"
                                style={{ color: 'var(--figma-heading-alt)' }}
                            >
                                Full Name
                            </label>
                            <div className="relative">
                                <User
                                    className="absolute top-1/2 left-3 size-4 -translate-y-1/2"
                                    style={{ color: 'var(--figma-slate)' }}
                                />
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="border-figma-input-border w-full rounded-lg border bg-white py-2 pr-4 pl-9 text-sm outline-none focus:ring-2"
                                    style={
                                        {
                                            color: 'var(--figma-heading-alt)',
                                            '--tw-ring-color': 'var(--figma-gold)',
                                        } as React.CSSProperties
                                    }
                                />
                            </div>
                            {errors.name && (
                                <p className="text-xs text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium"
                                style={{ color: 'var(--figma-heading-alt)' }}
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail
                                    className="absolute top-1/2 left-3 size-4 -translate-y-1/2"
                                    style={{ color: 'var(--figma-slate)' }}
                                />
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="border-figma-input-border w-full rounded-lg border bg-white py-2 pr-4 pl-9 text-sm outline-none focus:ring-2"
                                    style={
                                        {
                                            color: 'var(--figma-heading-alt)',
                                            '--tw-ring-color': 'var(--figma-gold)',
                                        } as React.CSSProperties
                                    }
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
                                style={{
                                    background:
                                        'linear-gradient(180deg, var(--figma-gold) 0%, var(--figma-gold-dark) 100%)',
                                }}
                            >
                                <Save className="size-4" />
                                Save Changes
                            </button>

                            {recentlySuccessful && (
                                <p
                                    className="text-sm"
                                    style={{ color: 'var(--figma-gold)' }}
                                >
                                    Saved successfully.
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </OperatorDashboardLayout>
    );
}
