import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import {
    Bell,
    BookOpen,
    ChevronRight,
    Clock,
    Package,
    Play,
    Users,
} from 'lucide-react';

import UserDashboardLayout from '@/layouts/user-dashboard-layout.tsx';
import { switchRole } from '@/routes/user';
import { dashboard as operatorDashboard } from '@/routes/operator';
import { dashboard as userDashboard } from '@/routes/user';
import { type SharedData } from '@/types';  

const figmaImages = {
    courseThumbnail: '/assets/figma/user-dashboard/course-thumbnail.png',
};

const statCards = [
    {
        label: 'Enrolled Courses',
        value: '5',
        sub: '2 completed',
        subColor: 'text-green-600',
        icon: BookOpen,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
    },
    {
        label: 'Upcoming Sessions',
        value: '3',
        sub: 'Next: Tomorrow',
        subColor: 'text-figma-slate',
        icon: Users,
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
    },
    {
        label: 'Products Owned',
        value: '8',
        sub: null,
        subColor: '',
        icon: Package,
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600',
    },
    {
        label: 'Learning Time',
        value: '24h',
        sub: 'This month',
        subColor: 'text-figma-slate',
        icon: Clock,
        iconBg: 'bg-figma-cream',
        iconColor: 'text-figma-gold',
    },
];

const continueWatching = [
    {
        title: 'Mindfulness Meditation Masterclass',
        author: 'Dr. Sarah Johnson',
        progress: 45,
        next: 'Lesson 5: Advanced Breathing Techniques',
    },
    {
        title: 'Yoga for Beginners',
        author: 'Emily Chen',
        progress: 10,
        next: 'Lesson 2: Sun Salutations',
    },
];

const upcomingConsultations = [
    {
        title: 'Nutrition Consultation',
        with: 'Dr. Sarah Johnson',
        when: 'Tomorrow',
        time: '2:00 PM',
        duration: '60 min',
    },
    {
        title: 'Career Coaching',
        with: 'Michael Brown',
        when: 'Mar 16',
        time: '10:00 AM',
        duration: '45 min',
    },
];

export default function UserDashboard() {
    const { auth } = usePage<SharedData>().props;
    const isOperator = auth.user?.is_operator ?? false;
    const { post, processing } = useForm({});
    const handleRoleSwitch = () => {
        post(switchRole.url(), {
            onSuccess: () => {
                router.visit(
                    isOperator ? operatorDashboard.url() : userDashboard.url(),
                );
            },
        });
    };

    const switchButtonLabel = isOperator
        ? 'Switch to Buyer'
        : 'Switch to Seller';

    const displayName = `${auth.user?.first_name ?? ''} ${auth.user?.last_name ?? ''}`.trim();
    const firstName = displayName.split(/\s+/)[0] || displayName || 'Client';

    return (
        <UserDashboardLayout>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-8">
                <header className="mb-6 flex flex-col gap-4 lg:mb-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        {/* LEFT SECTION */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
                            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                {/* IMAGE */}
                                <div className="image-card hidden h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-figma-gold-border shadow-gold sm:block sm:h-20 sm:w-20">
                                    <img
                                        src="/assets/dashboard/hero.png"
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* TEXT */}
                                <div className="flex min-w-0 flex-1 flex-col">
                                    <h1
                                        className="text-lg leading-7 font-medium tracking-tight sm:text-2xl sm:leading-9 md:text-3xl"
                                        style={{ color: 'var(--figma-heading-alt)' }}
                                    >
                                        Welcome back, {firstName}!
                                    </h1>

                                    <p
                                        className="mt-1 text-xs leading-relaxed sm:text-sm md:text-base"
                                        style={{ color: 'var(--figma-slate)' }}
                                    >
                                        Here's what's happening with your wellness services today.
                                    </p>
                                </div>
                            </div>

                            {/* BUTTON */}
                            <button
                                type="button"
                                onClick={handleRoleSwitch}
                                disabled={processing}
                                className="w-full sm:w-auto inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-xs sm:text-sm font-medium transition hover:opacity-90 disabled:opacity-60"
                                style={{
                                    borderColor: 'var(--figma-gold)',
                                    color: 'var(--figma-gold)',
                                }}
                            >
                                {switchButtonLabel}
                            </button>
                        </div>

                        {/* RIGHT SECTION */}
                        <div className="flex items-center justify-end gap-3 fixed right-5 top-5 z-50 xl:relative xl:top-0 xl:right-0">
                            {/* NOTIFICATION + AVATAR */}
                            <div className="flex items-center gap-2 sm:gap-3">
                                <button
                                    type="button"
                                    className="relative flex size-9 items-center justify-center rounded-full border border-figma-border bg-white text-figma-slate hover:bg-figma-trust-bg"
                                    aria-label="Notifications"
                                >
                                    <Bell className="size-5" />
                                    <span className="absolute top-1 right-1 size-2 rounded-full bg-red-500" />
                                </button>

                                <div
                                    className="flex size-9 sm:size-10 items-center justify-center rounded-full text-xs font-bold text-white"
                                    style={{
                                        background:
                                            'linear-gradient(180deg, var(--figma-gold) 0%, var(--figma-gold-dark) 100%)',
                                    }}
                                >
                                    {firstName.slice(0, 2).toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Stat cards - 4 cols */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {statCards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={card.label}
                                className="flex flex-col gap-2 rounded-[14px] border border-figma-input-border bg-white p-4 shadow-sm lg:gap-6 lg:p-6"
                            >
                                <div className="mb-2 flex items-center justify-between gap-2 sm:mb-0 md:flex-col-reverse md:items-start">
                                    <p className="font-epilogue text-2xl leading-none font-semibold text-figma-heading-alt sm:text-3xl">
                                        {card.value}
                                    </p>
                                    <div
                                        className={`flex size-9 shrink-0 items-center justify-center rounded-[10px] ${card.iconBg} ${card.iconColor}`}
                                    >
                                        <Icon className="size-5" />
                                    </div>
                                </div>
                                <p className="text-sm leading-5 text-figma-slate">
                                    {card.label}
                                </p>
                                {card.sub && (
                                    <p
                                        className={`text-xs leading-4 ${card.subColor || 'text-figma-slate'}`}
                                    >
                                        {card.sub}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Continue Watching */}
                <div className="flex flex-col gap-5 rounded-[14px] border border-figma-input-border bg-white p-4 shadow-sm sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h2 className="font-epilogue text-xl leading-7 font-semibold text-figma-heading-alt">
                            Continue Watching
                        </h2>
                        <Link
                            href="#"
                            className="inline-flex items-center gap-1 font-epilogue text-sm font-medium text-figma-gold hover:underline"
                        >
                            View All
                            <ChevronRight className="size-4" />
                        </Link>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {continueWatching.map((item) => (
                            <div
                                key={item.title}
                                className="flex gap-4 rounded-[10px] bg-figma-stone p-3 sm:p-4"
                            >
                                <div className="relative size-24 shrink-0 overflow-hidden rounded-[10px] bg-gray-200 sm:size-[128px]">
                                    <img
                                        src={figmaImages.courseThumbnail}
                                        alt=""
                                        className="size-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                        <div className="flex size-9 items-center justify-center rounded-full bg-white/90 sm:size-10">
                                            <Play className="size-4 fill-figma-heading-alt text-figma-heading-alt sm:size-5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-epilogue text-sm font-medium text-figma-heading-alt">
                                        {item.title}
                                    </p>
                                    <p className="text-xs leading-4 text-figma-slate">
                                        {item.author}
                                    </p>
                                    <div className="mt-2">
                                        <p className="text-xs text-figma-slate">
                                            {item.progress}% complete
                                        </p>
                                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                                            <div
                                                className="h-full rounded-full bg-figma-gold"
                                                style={{
                                                    width: `${item.progress}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <p className="mt-2 text-xs text-figma-slate">
                                        Next: {item.next}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Consultations */}
                <div className="flex flex-col gap-5 rounded-[14px] border border-figma-input-border bg-white p-4 shadow-sm sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h2 className="font-epilogue text-xl leading-7 font-semibold text-figma-heading-alt">
                            Upcoming Consultations
                        </h2>
                        <Link
                            href="#"
                            className="inline-flex items-center gap-1 font-epilogue text-sm font-medium text-figma-gold hover:underline"
                        >
                            View All
                            <ChevronRight className="size-4" />
                        </Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        {upcomingConsultations.map((item) => (
                            <div
                                key={item.title}
                                className="flex flex-wrap items-center gap-3 rounded-[10px] bg-figma-stone p-3 sm:flex-nowrap"
                            >
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-purple-100 text-purple-600">
                                    <Users className="size-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-epilogue text-sm font-medium text-figma-heading-alt">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-figma-slate">
                                        with {item.with}
                                    </p>
                                    <p className="mt-0.5 text-xs text-figma-slate">
                                        {item.when} • {item.time} •{' '}
                                        {item.duration}
                                    </p>
                                </div>
                                <Link
                                    href="#"
                                    className="shrink-0 rounded-lg border border-figma-input-border bg-figma-warm-white px-3 py-1.5 font-epilogue text-xs font-medium text-figma-heading hover:bg-figma-stone"
                                >
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </UserDashboardLayout>
    );
}
