import { Head, router, useForm, usePage } from '@inertiajs/react';
import {
    Bell,
    Calendar,
    DollarSign,
    Eye,
    TrendingUp,
    Users,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';
import OperatorDashboardLayout from '@/layouts/operator-dashboard-layout';
import { dashboard as operatorDashboard } from '@/routes/operator';
import { switchRole } from '@/routes/user';
import { dashboard as userDashboard } from '@/routes/user';
import { type SharedData } from '@/types';

// ─── Static data ────────────────────────────────────────────────────────────

const MONTHLY_DATA = [
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 5800 },
    { month: 'Mar', revenue: 9100 },
    { month: 'Apr', revenue: 7200 },
    { month: 'May', revenue: 10500 },
    { month: 'Jun', revenue: 13200 },
];

const WEEK_DATA = [
    { day: 'Mon', bookings: 12 },
    { day: 'Tue', bookings: 18 },
    { day: 'Wed', bookings: 15 },
    { day: 'Thu', bookings: 22 },
    { day: 'Fri', bookings: 19 },
    { day: 'Sat', bookings: 28 },
    { day: 'Sun', bookings: 17 },
];

const TOP_COURSES = [
    {
        title: 'Guided Meditation Masterclass',
        enrollments: '142 enrollments',
        amount: '$7,093.58',
    },
    {
        title: 'Introduction to Reiki',
        enrollments: '89 enrollments',
        amount: '$7,119.11',
    },
    {
        title: 'Yoga for Beginners',
        enrollments: '67 enrollments',
        amount: '$3,349.33',
    },
];

const TOP_PRODUCTS = [
    {
        title: 'Relaxation Essential Oils Kit',
        sold: '127 sold',
        amount: '$4,381.5',
    },
    { title: 'Crystal Healing Collection', sold: '156 sold', amount: '$6,552' },
    { title: 'Meditation Cushion Set', sold: '89 sold', amount: '$5,339.11' },
];

type ActivityStatus = 'completed' | 'new' | 'pending';

const RECENT_ACTIVITY: Array<{
    title: string;
    meta: string;
    status: ActivityStatus;
}> = [
    {
        title: 'Reiki Healing Session with John D.',
        meta: 'Consultation • 2 hours ago',
        status: 'completed',
    },
    {
        title: 'New enrollment in Meditation Fundamentals',
        meta: 'Course • 4 hours ago',
        status: 'new',
    },
    {
        title: 'New 5-star review from Sarah M.',
        meta: 'Review • 6 hours ago',
        status: 'new',
    },
    {
        title: 'Order for Essential Oils Kit',
        meta: 'Product • 1 day ago',
        status: 'completed',
    },
    {
        title: 'Upcoming session with Emma K.',
        meta: 'Consultation • Tomorrow at 10:00 AM',
        status: 'pending',
    },
];

const KPI_STATS = [
    {
        label: 'Total Revenue',
        value: '$12,450',
        change: '+12.5%',
        icon: DollarSign,
        delay: 'delay-100',
    },
    {
        label: 'Total Bookings',
        value: '156',
        change: '+8.2%',
        icon: Calendar,
        delay: 'delay-200',
    },
    {
        label: 'Profile Views',
        value: '2,340',
        change: '+15.3%',
        icon: Eye,
        delay: 'delay-300',
    },
    {
        label: 'New Clients',
        value: '42',
        change: '+5.1%',
        icon: Users,
        delay: 'delay-400',
    },
] as const;

// ─── Chart configs ───────────────────────────────────────────────────────────

const monthlyChartConfig = {
    revenue: { label: 'Revenue', color: 'var(--figma-gold)' },
} satisfies ChartConfig;

const weeklyChartConfig = {
    bookings: { label: 'Bookings', color: 'var(--figma-gold)' },
} satisfies ChartConfig;

// ─── Sub-components ──────────────────────────────────────────────────────────

function ActivityPill({ status }: { status: ActivityStatus }) {
    const styles: Record<ActivityStatus, { bg: string; text: string }> = {
        completed: { bg: '#dcfce7', text: '#008236' },
        pending: { bg: '#fef9c2', text: '#a65f00' },
        new: { bg: '#dbeafe', text: '#1447e6' },
    };
    const s = styles[status];
    return (
        <span
            className="shrink-0 rounded-full px-3 py-1 text-[12px] leading-4"
            style={{ background: s.bg, color: s.text }}
        >
            {status}
        </span>
    );
}

// ─── Page ────────────────────────────────────────────────────────────────────

interface OperatorDashboardProps {
    user?: { first_name: string; last_name: string; email: string };
}

export default function OperatorDashboard({ user }: OperatorDashboardProps) {
    const { auth } = usePage<SharedData>().props;
    const isOperator = auth.user?.is_operator ?? false;
    const authUser = auth.user;
    const firstName =
        user?.first_name ??
        authUser?.first_name ??
        'Client';
    const { post, processing } = useForm({});

    const handleSwitchToBuyer = () => {
        post(switchRole.url(), {
            onSuccess: () => {
                router.visit(
                    isOperator ? userDashboard.url() : operatorDashboard.url(),
                );
            },
        });
    };

    return (
        <OperatorDashboardLayout>
            <Head title="Dashboard" />

            <div className="w-full min-w-0">
                {/* ── Welcome + toolbar ─────────────────────────────────── */}
                <header className="mb-6 flex flex-col gap-4 lg:mb-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        {/* LEFT SECTION */}
                        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                {/* IMAGE */}
                                <div className="image-card border-figma-gold-border shadow-gold hidden h-16 w-16 shrink-0 overflow-hidden rounded-2xl border sm:block sm:h-20 sm:w-20">
                                    <img
                                        src="/assets/dashboard/hero.jpg"
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
                                onClick={handleSwitchToBuyer}
                                disabled={processing}
                                className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium transition hover:opacity-90 disabled:opacity-60 sm:w-auto sm:text-sm"
                                style={{
                                    borderColor: 'var(--figma-gold)',
                                    color: 'var(--figma-gold)',
                                }}
                            >
                                Switch to buyer
                            </button>
                        </div>

                        {/* RIGHT SECTION */}
                        <div className="fixed top-5 right-5 z-50 flex items-center justify-end gap-3 xl:relative xl:top-0 xl:right-0">
                            {/* BALANCE */}
                            <div
                                className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold sm:px-4"
                                style={{
                                    background: 'var(--figma-warm-bg)',
                                    color: 'var(--figma-heading-alt)',
                                }}
                            >
                                $65.50
                            </div>

                            {/* NOTIFICATION + AVATAR */}
                            <div className="flex items-center gap-2 sm:gap-3">
                                <button
                                    type="button"
                                    className="border-figma-border text-figma-slate hover:bg-figma-trust-bg relative flex size-9 items-center justify-center rounded-full border bg-white"
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
                                    {(firstName[0] ?? '').toUpperCase() + ((user?.last_name ?? authUser?.last_name ?? '')[0] ?? '').toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── KPI cards ─────────────────────────────────────────── */}
                <section className="mb-6 grid grid-cols-1 gap-4 min-[380px]:grid-cols-2 sm:mb-8 sm:gap-6 lg:grid-cols-4">
                    {KPI_STATS.map((stat) => (
                        <div
                            key={stat.label}
                            className={`dashboard-card feature-card flex min-w-0 flex-col gap-3 px-4 py-4 sm:gap-6 sm:px-6 sm:py-6 ${stat.delay}`}
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="dashboard-stat-icon flex size-9 shrink-0 items-center justify-center sm:size-12">
                                    <stat.icon
                                        className="size-4 sm:size-6"
                                        style={{ color: 'var(--figma-gold)' }}
                                    />
                                </div>
                                <span className="shrink-0 text-xs font-medium text-[#00a63e] sm:text-sm">
                                    {stat.change}
                                </span>
                            </div>
                            <p
                                className="truncate text-lg font-semibold tabular-nums sm:text-2xl md:text-3xl"
                                style={{ color: 'var(--figma-heading-alt)' }}
                            >
                                {stat.value}
                            </p>
                            <p
                                className="text-xs leading-snug sm:text-sm"
                                style={{ color: 'var(--figma-body)' }}
                            >
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </section>

                {/* ── Monthly Earnings chart ─────────────────────────────── */}
                <section className="mb-6 delay-300 sm:mb-8">
                    <div className="dashboard-card feature-card overflow-hidden px-3 py-4 sm:px-6 sm:py-6">
                        <h2
                            className="mb-4 text-sm font-semibold sm:mb-6 sm:text-base"
                            style={{ color: 'var(--figma-heading-alt)' }}
                        >
                            Monthly Earnings
                        </h2>

                        <ChartContainer
                            config={monthlyChartConfig}
                            className="aspect-auto h-[200px] w-full min-w-0 sm:h-[240px] md:h-[280px]"
                        >
                            <BarChart
                                data={MONTHLY_DATA}
                                barCategoryGap="24%"
                                margin={{
                                    top: 4,
                                    right: 4,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid
                                    vertical={false}
                                    stroke="var(--figma-border, #e5e7eb)"
                                />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fontSize: 11,
                                        fill: 'var(--figma-body, #6a7282)',
                                    }}
                                    interval={0}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fontSize: 11,
                                        fill: 'var(--figma-body, #6a7282)',
                                    }}
                                    tickFormatter={(v: number) =>
                                        `$${(v / 1000).toFixed(1)}k`
                                    }
                                    domain={[0, 14000]}
                                    ticks={[0, 3500, 7000, 10500, 14000]}
                                    width={48}
                                />
                                <ChartTooltip
                                    cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                                    content={
                                        <ChartTooltipContent
                                            formatter={(value: number | string) =>
                                                `$${Number(value).toLocaleString()}`
                                            }
                                        />
                                    }
                                />
                                <Bar
                                    dataKey="revenue"
                                    fill="var(--figma-gold)"
                                    radius={[4, 4, 0, 0]}
                                    maxBarSize={72}
                                />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </section>

                {/* ── Top Performing Courses + Products ─────────────────── */}
                <section className="mb-6 grid gap-4 sm:mb-8 sm:gap-6 lg:grid-cols-2">
                    {/* Courses */}
                    <div className="dashboard-card feature-card px-4 py-5 delay-400 sm:px-6 sm:py-6">
                        <h2
                            className="mb-4 text-sm font-semibold sm:mb-6 sm:text-base"
                            style={{ color: 'var(--figma-heading-alt)' }}
                        >
                            Top Performing Courses
                        </h2>
                        <ul className="flex flex-col gap-4">
                            {TOP_COURSES.map((c) => (
                                <li
                                    key={c.title}
                                    className="border-figma-border flex flex-col gap-2 border-b pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="flex min-w-0 items-start gap-2">
                                            <p
                                                className="min-w-0 flex-1 text-sm leading-snug font-normal"
                                                style={{
                                                    color: 'var(--figma-heading-alt)',
                                                }}
                                            >
                                                {c.title}
                                            </p>
                                            <TrendingUp className="text-figma-gold size-4 shrink-0" />
                                        </div>
                                        <p
                                            className="mt-0.5 text-xs"
                                            style={{
                                                color: 'var(--figma-body)',
                                            }}
                                        >
                                            {c.enrollments}
                                        </p>
                                    </div>
                                    <span
                                        className="shrink-0 text-sm font-normal sm:text-right"
                                        style={{ color: 'var(--figma-gold)' }}
                                    >
                                        {c.amount}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div className="dashboard-card feature-card px-4 py-5 delay-500 sm:px-6 sm:py-6">
                        <h2
                            className="mb-4 text-sm font-semibold sm:mb-6 sm:text-base"
                            style={{ color: 'var(--figma-heading-alt)' }}
                        >
                            Top Performing Products
                        </h2>
                        <ul className="flex flex-col gap-4">
                            {TOP_PRODUCTS.map((p) => (
                                <li
                                    key={p.title}
                                    className="border-figma-border flex flex-col gap-2 border-b pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="flex min-w-0 items-start gap-2">
                                            <p
                                                className="min-w-0 flex-1 text-sm leading-snug font-normal"
                                                style={{
                                                    color: 'var(--figma-heading-alt)',
                                                }}
                                            >
                                                {p.title}
                                            </p>
                                            <TrendingUp className="text-figma-gold size-4 shrink-0" />
                                        </div>
                                        <p
                                            className="mt-0.5 text-xs"
                                            style={{
                                                color: 'var(--figma-body)',
                                            }}
                                        >
                                            {p.sold}
                                        </p>
                                    </div>
                                    <span
                                        className="shrink-0 text-sm font-normal sm:text-right"
                                        style={{ color: 'var(--figma-gold)' }}
                                    >
                                        {p.amount}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ── Recent Activity + This Week's Performance ──────────── */}
                <section className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                    {/* Recent Activity */}
                    <div className="dashboard-card feature-card p-4 sm:p-6">
                        <h2 className="mb-6 text-sm leading-6 font-semibold text-[#101828] sm:mb-10 sm:text-[16px]">
                            Recent Activity
                        </h2>
                        <ul className="flex flex-col">
                            {RECENT_ACTIVITY.map((a, i) => (
                                <li
                                    key={`${a.title}-${i}`}
                                    className="flex min-h-[52px] flex-col gap-2 border-b border-[#f3f4f6] py-3 last:border-0 sm:min-h-[56px] sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                                >
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[13px] leading-5 text-[#101828] sm:text-[14px]">
                                            {a.title}
                                        </p>
                                        <p className="mt-1 text-[11px] leading-4 text-[#6a7282] sm:text-[12px]">
                                            {a.meta}
                                        </p>
                                    </div>
                                    <div className="shrink-0 self-start sm:self-center">
                                        <ActivityPill status={a.status} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* This Week's Performance */}
                    <div className="dashboard-card feature-card p-4 sm:p-6">
                        <h2 className="text-sm leading-6 font-semibold text-[#101828] sm:text-[16px] sm:leading-[27px]">
                            This Week&apos;s Performance
                        </h2>

                        <ChartContainer
                            config={weeklyChartConfig}
                            className="mt-4 aspect-auto h-48 w-full min-w-0 sm:mt-6 sm:h-72 lg:h-[300px]"
                        >
                            <BarChart
                                data={WEEK_DATA}
                                barCategoryGap="24%"
                                margin={{
                                    top: 4,
                                    right: 4,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid
                                    vertical={false}
                                    stroke="#e5e7eb"
                                />
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 11, fill: '#6b7280' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 11, fill: '#6b7280' }}
                                    domain={[0, 28]}
                                    ticks={[0, 7, 14, 21, 28]}
                                    width={26}
                                />
                                <ChartTooltip
                                    cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                                    content={<ChartTooltipContent />}
                                />
                                <Bar
                                    dataKey="bookings"
                                    fill="var(--figma-gold)"
                                    radius={[4, 4, 0, 0]}
                                    maxBarSize={48}
                                />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </section>
            </div>
        </OperatorDashboardLayout>
    );
}
