import { Link } from '@inertiajs/react';
import { Search, CalendarCheck, Sparkles } from 'lucide-react';
import React from 'react';

import FadeInSection from './fade-in-section.tsx';

const steps = [
    {
        title: 'Search',
        description: 'Find your perfect practitioner, products, or services for your wellness needs.',
        icon: Search,
    },
    {
        title: 'Book',
        description: 'Manage appointments and payments in a simple and easy way.',
        icon: CalendarCheck,
    },
    {
        title: 'Transform yourself',
        description: 'Start your transformative journey with the support from the industry.',
        icon: Sparkles,
    },
];

export default function HowItWorksSection() {
    return (
        <FadeInSection>
            <section
                className="bg-[#FAFAF9] scroll-mt-24 py-16 md:py-20"
                id="wellness-seekers"
            >
                <div className="container mx-auto px-4">
                    <FadeInSection delay={80}>
                        <div className="mb-10 text-center">
                            <div className="mb-4 inline-flex rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800">
                                For Wellness seekers
                            </div>
                            <h2 className="mb-4 text-3xl font-bold text-figma-heading-alt md:text-4xl lg:text-5xl text-gray-900">
                                How does it work?
                            </h2>
                            <p className="mx-auto max-w-xl text-base text-gray-600">
                                Your trusted partner in holistic wellness with everything you need in one place.
                            </p>
                        </div>
                    </FadeInSection>

                    <div className="mb-10 grid gap-6 sm:grid-cols-3">
                        {steps.map(({ title, description, icon: Icon }, index) => (
                            <FadeInSection key={title} delay={index * 100 + 120}>
                                <div className="flex flex-col items-center rounded-xl h-full sm:min-h-60 border-2 border-[rgba(229,183,1,0.2)] bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                    <div className="mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-500">
                                        <Icon className="h-7 w-7" strokeWidth={2} />
                                    </div>
                                    <h3 className="mb-3 text-lg font-medium text-figma-heading-alt">{title}</h3>
                                    <p className="text-sm leading-relaxed text-gray-600">{description}</p>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>

                    <FadeInSection delay={400}>
                        <div className="flex justify-center">
                            <Link
                                href={route('login')}
                                className="inline-block rounded-full bg-primary-500 px-8 py-3 text-base font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-primary-600"
                            >
                                Start your journey now
                            </Link>
                        </div>
                    </FadeInSection>
                </div>
            </section>
        </FadeInSection>
    );
}
