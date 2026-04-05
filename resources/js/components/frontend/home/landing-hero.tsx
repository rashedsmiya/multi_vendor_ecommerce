import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Star } from 'lucide-react';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1773332585749-5146862ba746?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const linkWellnessSeekers = `${route('home')}#wellness-seekers`;
const linkPractitioners = `${route('home')}#practitioners`;

const fadeUp = (delay: number = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: 'easeOut' as const },
    },
});

const badgeContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15, delayChildren: 1.1 },
    },
};

const badgeItem = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' as const },
    },
};

export default function LandingHerro() {
    const features = [
        {
            key: 'verified',
            label: 'Verified Practitioners',
            icon: (
                <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white"
                    aria-hidden
                >
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={2.5} />
                </span>
            ),
        },
        {
            key: 'reviews',
            label: 'Trusted Reviews',
            icon: <Star className="h-4 w-4 shrink-0 fill-none stroke-white stroke-[1.75]" aria-hidden />,
        },
        {
            key: 'sessions',
            label: 'Online and In-Person sessions',
            icon: <Star className="h-4 w-4 shrink-0 fill-none stroke-white stroke-[1.75]" aria-hidden />,
        },
    ];

    return (
        <section className="relative flex min-h-[calc(100vh-116px)] flex-col overflow-hidden">
            <motion.div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${HERO_IMAGE})` }}
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.6, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 bg-black/50" aria-hidden />

            <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center px-4 text-center">
                    <div className="mx-auto max-w-3xl">
                        <motion.h1
                            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]"
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp(0.25)}
                        >
                            Your Space For Holistic Wellness
                        </motion.h1>

                        <motion.p
                            className="mx-auto sm:mb-10 max-w-2xl text-base leading-relaxed text-white/95 md:text-lg"
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp(0.5)}
                        >
                            One platform for holistic practitioners and wellness seekers. Consultations, courses,
                            products, and community - all in one place.
                        </motion.p>

                        <div className="flex flex-col items-center justify-center gap-6">
                            {/* First Section (buttons) */}
                            <div className="w-full order-2 sm:order-1">
                                <motion.div
                                    className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center sm:gap-5"
                                    initial="hidden"
                                    animate="visible"
                                    variants={fadeUp(0.75)}
                                >
                                    {/* buttons */}
                                        <Link
                                            href={linkWellnessSeekers}
                                            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#D4A017] py-3.5 pl-7 pr-4 text-sm font-semibold text-gray-900 shadow-lg transition hover:bg-[#b8890f] sm:pl-8 sm:text-base"
                                            aria-label="Learn how it works for wellness seekers"
                                        >
                                            <span className="text-pretty">Find a practitioner</span>
                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black">
                                                <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                                            </span>
                                        </Link>
                                        <Link
                                            href={linkPractitioners}
                                            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#3d5246] py-3.5 pl-7 pr-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#32463b] sm:pl-8 sm:text-base"
                                            aria-label="See how to bring your practice online"
                                        >
                                            <span className="text-pretty">I&apos;m a practitioner</span>
                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white">
                                                <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                                            </span>
                                        </Link>
                                </motion.div>
                            </div>

                            {/* Second Section (badges) */}
                            <div className="w-full order-1 sm:order-2 sm:mt-0 mt-6">
                                <motion.div
                                    className="grid grid-cols-2 gap-3 px-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-4"
                                    initial="hidden"
                                    animate="visible"
                                    variants={badgeContainer}
                                >
                                        {features.map(({ key, label, icon }) => (
                                            <motion.div
                                                key={key}
                                                variants={badgeItem}
                                                className="flex items-center gap-2 md:gap-3 rounded-xl bg-white/10 px-3 py-2 text-white backdrop-blur-sm sm:bg-transparent sm:p-0"
                                            >
                                                <div className="flex h-8 w-8 min-w-8 items-center justify-center rounded-lg bg-white/20 sm:bg-transparent">
                                                    {icon}
                                                </div>

                                                <span className="text-xs leading-snug sm:text-sm md:font-medium">
                                                    {label}
                                                </span>
                                            </motion.div>
                                        ))}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}