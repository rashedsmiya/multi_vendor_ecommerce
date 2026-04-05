import { Head } from '@inertiajs/react';

import BringPracticeOnlineSection from '@/components/frontend/home/bring-practice-online-section.tsx';
import HowItWorksSection from '@/components/frontend/home/how-it-works-section.tsx';
// import PractitionerCtaSection from '@/components/frontend/home/practitioner-cta-section';
import FrontendLayout from '@/layouts/frontend-layout';
import LandingHero from '@/components/frontend/home/landing-hero';

export default function Home() {
    return (
        <FrontendLayout>
            <Head title="Home Page" />

            {/* <HeroSection /> */}
            <LandingHero />
            <HowItWorksSection />
            <BringPracticeOnlineSection />
            {/* <CategoriesSection />
            <MeetOperatorsSection />
            <TestimonialSection />
            <ReadyCtaSection /> */}
            {/* <PractitionerCtaSection /> */}
        </FrontendLayout>
    );
}