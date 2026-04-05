import { Link } from '@inertiajs/react';
import { BriefcaseBusiness, HandCoins, UserRoundPlus } from 'lucide-react';

import FadeInSection from './fade-in-section';

const steps = [
    {
        title: 'Register and create your profile',
        description:
            'Sign up for free, build your professional profile, and list your services: consulting, courses, or physical and digital products.',
        icon: UserRoundPlus,
    },
    {
        title: 'Manage your business',
        description:
            'Use the dashboard to manage bookings, calendars, customer messages, and your sales. All in one place, hassle-free.',
        icon: BriefcaseBusiness,
    },
    {
        title: 'Earn and grow',
        description:
            'Receive payments securely. Keep 90% of every sale. We only take a 10% commission, and no fixed costs.',
        icon: HandCoins,
    },
];

export default function BringPracticeOnlineSection() {
    return (
        <FadeInSection>
            <section className="scroll-mt-24 py-14 md:py-16" id="practitioners">
                <div className="container mx-auto px-4">
                    <FadeInSection delay={80}>
                        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
                            <div className="mb-4 inline-flex rounded-full border border-primary-300 bg-primary-100 px-3 py-1 text-xs font-medium text-primary-500">
                                For holistic practitioners
                            </div>
                            <h2 className="mb-4 text-4xl font-bold leading-tight text-figma-heading-alt md:text-5xl text-gray-900">
                                Bring Your Practice Online In
                                <br />
                                3 Simple Steps
                            </h2>
                            <p className="mx-auto max-w-xl text-base text-gray-500">
                                Your trusted partner in holistic wellness with everything you need in one place.
                            </p>
                        </div>
                    </FadeInSection>

                    <div className="mb-10 grid gap-4 md:mb-12 md:grid-cols-3 md:gap-5">
                        {steps.map(({ title, description, icon: Icon }, index) => (
                            <FadeInSection key={title} delay={index * 100 + 120}>
                                <div className="flex items-center justify-center h-full flex-col rounded-2xl border-2 border-primary-200/50 bg-[#FFFBF3] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:p-6">
                                    <div className="mb-5 flex justify-center">
                                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#FAF1CC] text-primary-500">
                                            <Icon className="h-8 w-8" strokeWidth={2.2} />
                                        </div>
                                    </div>
                                    <h3 className="mb-3 text-center text-2xl font-semibold leading-tight text-figma-heading-alt text-gray-900">
                                        {title}
                                    </h3>
                                    <p className="text-center text-sm leading-relaxed text-gray-500">
                                        {description}
                                    </p>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>

                    <FadeInSection delay={400}>
                        <div className="flex justify-center">
                            <Link
                                href={route('register')}
                                className="inline-flex items-center rounded-full bg-primary-500 px-8 py-3 text-md font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600"
                            >
                                Start as Practitioners - It&apos;s Free
                            </Link>
                        </div>
                    </FadeInSection>
                </div>
            </section>
        </FadeInSection>
    );
}
