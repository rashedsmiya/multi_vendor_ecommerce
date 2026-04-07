import { Head, Link, useForm, usePage } from '@inertiajs/react';
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
        post(switchRole.url());
    };

    const switchButtonLabel = isOperator
        ? 'Switch to Buyer'
        : 'Switch to Seller';

    const displayName =
        `${auth.user?.first_name ?? ''} ${auth.user?.last_name ?? ''}`.trim();
    const firstName = displayName.split(/\s+/)[0] || displayName || 'Client';

    return (
        <UserDashboardLayout>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-8">
                <header className="mb-6 flex flex-col gap-4 lg:mb-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        {/* LEFT SECTION */}
                        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                {/* IMAGE */}
                                <div className="image-card border-figma-gold-border shadow-gold hidden h-16 w-16 shrink-0 overflow-hidden rounded-2xl border sm:block sm:h-20 sm:w-20">
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
                                        style={{
                                            color: 'var(--figma-heading-alt)',
                                        }}
                                    >
                                        Welcome back, {firstName}!
                                    </h1>

                                    <p
                                        className="mt-1 text-xs leading-relaxed sm:text-sm md:text-base"
                                        style={{ color: 'var(--figma-slate)' }}
                                    >
                                        Here's what's happening with your
                                        wellness services today.
                                    </p>
                                </div>
                            </div>

                            {/* BUTTON */}
                            <button
                                type="button"
                                onClick={handleRoleSwitch}
                                disabled={processing}
                                className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium transition hover:opacity-90 disabled:opacity-60 sm:w-auto sm:text-sm"
                                style={{
                                    borderColor: 'var(--figma-gold)',
                                    color: 'var(--figma-gold)',
                                }}
                            >
                                {switchButtonLabel}
                            </button>
                        </div>

                        {/* RIGHT SECTION */}
                        <div className="fixed top-5 right-5 z-50 flex items-center justify-end gap-3 xl:relative xl:top-0 xl:right-0">
                            {/* NOTIFICATION + AVATAR */}
                            <div className="flex items-center gap-2 sm:gap-3">
                                <button
                                    type="button"
                                    className="border-figma-border text-figma-slate hover:bg-figma-trust-bg relative flex size-9 items-center justify-center rounded-full border bg-white"
                                    aria-label="Notifications"
                                >
                                    <Bell className="size-5" />
                                    <span className="absolute top-1 right-1 size-2 rounded-full bg-red-500" />
                                </button>

                                <div
                                    className="flex size-9 items-center justify-center rounded-full text-xs font-bold text-white sm:size-10"
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
                                className="border-figma-input-border flex flex-col gap-2 rounded-[14px] border bg-white p-4 shadow-sm lg:gap-6 lg:p-6"
                            >
                                <div className="mb-2 flex items-center justify-between gap-2 sm:mb-0 md:flex-col-reverse md:items-start">
                                    <p className="font-epilogue text-figma-heading-alt text-2xl leading-none font-semibold sm:text-3xl">
                                        {card.value}
                                    </p>
                                    <div
                                        className={`flex size-9 shrink-0 items-center justify-center rounded-[10px] ${card.iconBg} ${card.iconColor}`}
                                    >
                                        <Icon className="size-5" />
                                    </div>
                                </div>
                                <p className="text-figma-slate text-sm leading-5">
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
                <div className="border-figma-input-border flex flex-col gap-5 rounded-[14px] border bg-white p-4 shadow-sm sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h2 className="font-epilogue text-figma-heading-alt text-xl leading-7 font-semibold">
                            Continue Watching
                        </h2>
                        <Link
                            href="#"
                            className="font-epilogue text-figma-gold inline-flex items-center gap-1 text-sm font-medium hover:underline"
                        >
                            View All
                            <ChevronRight className="size-4" />
                        </Link>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {continueWatching.map((item) => (
                            <div
                                key={item.title}
                                className="bg-figma-stone flex gap-4 rounded-[10px] p-3 sm:p-4"
                            >
                                <div className="relative size-24 shrink-0 overflow-hidden rounded-[10px] bg-gray-200 sm:size-[128px]">
                                    <img
                                        src={figmaImages.courseThumbnail}
                                        alt=""
                                        className="size-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                        <div className="flex size-9 items-center justify-center rounded-full bg-white/90 sm:size-10">
                                            <Play className="fill-figma-heading-alt text-figma-heading-alt size-4 sm:size-5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-epilogue text-figma-heading-alt text-sm font-medium">
                                        {item.title}
                                    </p>
                                    <p className="text-figma-slate text-xs leading-4">
                                        {item.author}
                                    </p>
                                    <div className="mt-2">
                                        <p className="text-figma-slate text-xs">
                                            {item.progress}% complete
                                        </p>
                                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                                            <div
                                                className="bg-figma-gold h-full rounded-full"
                                                style={{
                                                    width: `${item.progress}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <p className="text-figma-slate mt-2 text-xs">
                                        Next: {item.next}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Consultations */}
                <div className="border-figma-input-border flex flex-col gap-5 rounded-[14px] border bg-white p-4 shadow-sm sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h2 className="font-epilogue text-figma-heading-alt text-xl leading-7 font-semibold">
                            Upcoming Consultations
                        </h2>
                        <Link
                            href="#"
                            className="font-epilogue text-figma-gold inline-flex items-center gap-1 text-sm font-medium hover:underline"
                        >
                            View All
                            <ChevronRight className="size-4" />
                        </Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        {upcomingConsultations.map((item) => (
                            <div
                                key={item.title}
                                className="bg-figma-stone flex flex-wrap items-center gap-3 rounded-[10px] p-3 sm:flex-nowrap"
                            >
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-purple-100 text-purple-600">
                                    <Users className="size-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-epilogue text-figma-heading-alt text-sm font-medium">
                                        {item.title}
                                    </p>
                                    <p className="text-figma-slate text-xs">
                                        with {item.with}
                                    </p>
                                    <p className="text-figma-slate mt-0.5 text-xs">
                                        {item.when} • {item.time} •{' '}
                                        {item.duration}
                                    </p>
                                </div>
                                <Link
                                    href="#"
                                    className="border-figma-input-border bg-figma-warm-white font-epilogue text-figma-heading hover:bg-figma-stone shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium"
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
