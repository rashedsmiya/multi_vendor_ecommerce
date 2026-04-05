import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, Download, ExternalLink, Package, Receipt } from 'lucide-react';

import MarketplaceItemCard from '@/components/marketplace-item-card';
import UserLayout from '@/layouts/user-layout';
import { type SharedData } from '@/types';

type ResumeKind = 'digital' | 'physical';

interface ResumeItem {
    kind: ResumeKind;
    image: string;
    title: string;
    providerName: string;
    dateLabel: string;
    priceLabel: string;
    delivered?: boolean;
    trackingNumber?: string;
}

interface FollowedOperator {
    name: string;
    specialty: string;
    avatar: string;
}

const sectionReveal = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45 },
    },
};

export default function HomeAferLogin() {
    const { auth } = usePage<SharedData>().props;
    const firstName = auth.user?.name?.split(/\s+/)[0] ?? 'there';

    const DASHBOARD_IMAGES = {
        tarotReading: '/assets/dashboard/tarot-reading.png',
        oliviaBrown1: '/assets/dashboard/olivia-brown-1.png',
        mindfulMeditation: '/assets/dashboard/mindful-meditation.png',
        michaelTorres: '/assets/dashboard/michael-torres.png',
        sageSmudge: '/assets/dashboard/sage-smudge.png',
        sarahChen: '/assets/dashboard/sarah-chen.png',
        astrologyChart: '/assets/dashboard/astrology-chart.png',
        oliviaBrown2: '/assets/dashboard/olivia-brown-2.png',
        meditationGuide: '/assets/dashboard/meditation-guide.png',
        oliviaBrown7: '/assets/dashboard/olivia-brown-7.png',
        oliviaBrown3: '/assets/dashboard/olivia-brown-3.png',
        oliviaBrown4: '/assets/dashboard/olivia-brown-4.png',
    };

    const recommended = [
        {
            image: DASHBOARD_IMAGES.tarotReading,
            providerImage: DASHBOARD_IMAGES.oliviaBrown1,
            title: 'Tarot Reading Session',
            description: 'Find clarity on your path',
            providerName: 'Olivia Brown',
            rating: 4.9,
            reviewCount: 145,
            price: 65,
            verified: true,
            duration: '75 min',
            sessionType: '1:1',
        },
        {
            image: DASHBOARD_IMAGES.mindfulMeditation,
            providerImage: DASHBOARD_IMAGES.michaelTorres,
            title: 'Mindful Meditation Mastery',
            description: 'Discover the fundamentals of mindfulness',
            providerName: 'Michael Torres',
            rating: 4.9,
            reviewCount: 156,
            price: 129,
            verified: true,
            courseLength: '8 weeks',
            pacing: 'Self-paced',
        },
        {
            image: DASHBOARD_IMAGES.sageSmudge,
            providerImage: DASHBOARD_IMAGES.sarahChen,
            title: 'Sage Smudge Bundle',
            description: 'Cleanse your space naturally',
            providerName: 'Sarah Chen',
            rating: 4.9,
            reviewCount: 203,
            price: 24,
            verified: true,
        },
        {
            image: DASHBOARD_IMAGES.astrologyChart,
            providerImage: DASHBOARD_IMAGES.oliviaBrown2,
            title: 'Astrology Chart',
            description: 'Discover your cosmic blueprint',
            providerName: 'Olivia Brown',
            rating: 4.9,
            reviewCount: 134,
            price: 95,
            verified: true,
            duration: '75 min',
            sessionType: '1:1',
        },
    ];

    const resumeJourney: ResumeItem[] = [
        {
            kind: 'digital',
            image: DASHBOARD_IMAGES.meditationGuide,
            title: 'Complete Meditation Guide eBook',
            providerName: 'Dr. Sarah Johnson',
            dateLabel: 'Jan 28, 2026',
            priceLabel: '$29.99',
        },
        {
            kind: 'physical',
            image: DASHBOARD_IMAGES.sageSmudge,
            title: 'Yoga Mat Premium Bundle',
            providerName: 'Emily Chen',
            dateLabel: 'Jan 25, 2026',
            priceLabel: '$89.99',
            delivered: true,
            trackingNumber: 'TRK123456789',
        },
        {
            kind: 'digital',
            image: DASHBOARD_IMAGES.tarotReading,
            title: 'Sound Healing Foundations eBook',
            providerName: 'Olivia Brown',
            dateLabel: 'Jan 18, 2026',
            priceLabel: '$34.99',
        },
    ];

    const followedOperators: FollowedOperator[] = [
        {
            name: 'Laura Bianchi',
            specialty: 'Naturopata',
            avatar: DASHBOARD_IMAGES.oliviaBrown1,
        },
        {
            name: 'Marco Verdi',
            specialty: 'Mindfulness',
            avatar: DASHBOARD_IMAGES.michaelTorres,
        },
        {
            name: 'Elena Rossi',
            specialty: 'Crystal therapy',
            avatar: DASHBOARD_IMAGES.sarahChen,
        },
        {
            name: 'Olivia Brown',
            specialty: 'Tarot & astrology',
            avatar: DASHBOARD_IMAGES.oliviaBrown2,
        },
    ];

    const categoryIconsBase = '/assets/icons/categories';
    const categories = [
        {
            label: 'Naturopathy',
            iconSrc: `${categoryIconsBase}/Frame.svg`,
            href: route('user.my-account.consultations'),
        },
        {
            label: 'Mindfulness',
            iconSrc: `${categoryIconsBase}/Frame%20(1).svg`,
            href: route('user.my-account.courses'),
        },
        {
            label: 'Personal growth',
            iconSrc: `${categoryIconsBase}/Frame%20(2).svg`,
            href: route('user.my-learning'),
        },
        {
            label: 'Crystal therapy',
            iconSrc: `${categoryIconsBase}/Frame%20(3).svg`,
            href: route('user.my-account.products'),
        },
        {
            label: 'Tarot',
            iconSrc: `${categoryIconsBase}/Frame%20(4).svg`,
            href: route('user.my-account.consultations'),
        },
    ];

    return (
        <UserLayout>
            <Head title="Marketplace" />

            <div className="bg-white pb-16">
                <div className="container mx-auto px-4 pt-8 md:pt-10">
                    {/* Welcome */}
                    <motion.header
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-10 md:mb-12"
                    >
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                            Welcome back, {firstName}{' '}
                            <span className="inline-block" aria-hidden>
                                👋
                            </span>
                        </h1>
                        <p className="mt-2 text-base text-gray-500 md:text-lg">
                            Ready for your daily dose of wellness?
                        </p>
                    </motion.header>

                    {/* Recommended for you */}
                    <motion.section
                        variants={sectionReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        className="mb-14 md:mb-16"
                    >
                        <div className="rounded-3xl bg-gray-100 px-5 py-8 md:px-10 md:py-10">
                            <h2 className="mb-8 text-2xl font-bold text-gray-900 md:text-3xl">
                                Recommended for you
                            </h2>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {recommended.map((item, index) => (
                                    <MarketplaceItemCard key={item.title} {...item} delay={index * 0.06} />
                                ))}
                            </div>
                        </div>
                    </motion.section>

                     {/* Explore Categories */}
                    <motion.section
                        variants={sectionReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        className="mb-14 md:mb-16"
                    >
                        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                            Explore Categories
                        </h2>
                        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
                            {categories.map(({ label, iconSrc, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="flex min-h-[148px] flex-col items-center rounded-2xl border border-transparent bg-gray-50 px-4 py-6 transition hover:border-gray-300 hover:bg-gray-100/80"
                                >
                                    <div className="mb-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FEF9E7]">
                                        <img
                                            src={iconSrc}
                                            alt=""
                                            className="h-7 w-7 object-contain"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                    <span className="text-center text-sm font-medium text-gray-900">{label}</span>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-10 flex justify-center">
                            <Link
                                href={route('user.my-account.consultations')}
                                className="inline-flex min-w-[200px] items-center justify-center rounded-xl bg-[#EAB308] px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm transition hover:bg-[#CA8A04]"
                            >
                                Discover Now
                            </Link>
                        </div>
                    </motion.section>

                    {/* Resume Your Journey */}
                    <motion.section
                        variants={sectionReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        className="mb-14 md:mb-16"
                    >
                        <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                            Resume Your Journey
                        </h2>
                        <div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {resumeJourney.map((item) => (
                                <article
                                    key={item.title}
                                    className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-gray-100">
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                        {item.kind === 'digital' && (
                                            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-[#F3E8FF] px-2 py-1 text-xs font-semibold text-[#7E22CE]">
                                                <Download className="h-3 w-3 shrink-0" />
                                                Digital
                                            </span>
                                        )}
                                        {item.kind === 'physical' && (
                                            <>
                                                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-[#FEF3C7] px-2 py-1 text-xs font-semibold text-[#92400E]">
                                                    <Package className="h-3 w-3 shrink-0" />
                                                    Physical
                                                </span>
                                                {item.delivered && (
                                                    <span className="absolute right-3 top-3 rounded-md bg-[#DCFCE7] px-2 py-1 text-xs font-semibold text-[#15803D]">
                                                        Delivered
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col p-4 md:p-5">
                                        <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                                        <p className="mt-1 text-sm text-[#6B7280]">{item.providerName}</p>
                                        <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                                            <span className="inline-flex items-center gap-1.5 text-[#6B7280]">
                                                <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
                                                {item.dateLabel}
                                            </span>
                                            <span className="shrink-0 font-semibold text-gray-900">{item.priceLabel}</span>
                                        </div>
                                        {item.trackingNumber && (
                                            <div className="mt-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2.5">
                                                <p className="text-xs font-medium text-[#6B7280]">Tracking Number</p>
                                                <p className="mt-1 font-mono text-sm font-semibold text-gray-900">
                                                    {item.trackingNumber}
                                                </p>
                                            </div>
                                        )}
                                        <div className="mt-auto flex w-full flex-col gap-2 pt-4">
                                            {item.kind === 'digital' && (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#EAB308] px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-[#CA8A04]"
                                                    >
                                                        <Download className="h-4 w-4 shrink-0" />
                                                        Download
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="inline-flex w-full items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
                                                    >
                                                        Buy More
                                                    </button>
                                                </>
                                            )}
                                            {item.kind === 'physical' && (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
                                                    >
                                                        Order again
                                                        <ExternalLink className="h-4 w-4 shrink-0" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
                                                    >
                                                        <Receipt className="h-4 w-4 shrink-0" />
                                                        View Receipt
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </motion.section>

                    {/* Holistic Operator You Follow */}
                    <motion.section
                        variants={sectionReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                    >
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
                            Holistic Operator You Follow
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {followedOperators.map((op) => (
                                <div
                                    key={op.name}
                                    className="flex flex-col items-center rounded-2xl border-2 border-yellow-400/90 bg-white px-5 py-8 text-center shadow-sm"
                                >
                                    <img
                                        src={op.avatar}
                                        alt=""
                                        className="h-24 w-24 rounded-full object-cover ring-2 ring-yellow-100"
                                    />
                                    <p className="mt-4 text-lg font-bold text-gray-900">{op.name}</p>
                                    <p className="mt-1 text-sm font-medium text-yellow-600">{op.specialty}</p>
                                    <Link
                                        href={route('user.community')}
                                        className="mt-5 text-sm font-semibold text-yellow-600 underline-offset-4 hover:underline"
                                    >
                                        Vedi Profilo
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-center">
                            <Link
                                href={route('user.community')}
                                className="inline-flex min-w-[240px] items-center justify-center rounded-2xl bg-yellow-500 px-8 py-3.5 text-center text-base font-semibold text-gray-900 shadow-sm transition hover:bg-yellow-600"
                            >
                                View all practitioners
                            </Link>
                        </div>
                    </motion.section>
                </div>
            </div>
        </UserLayout>
    );
}
