
import { Link } from '@inertiajs/react';
import { CheckCircle2, Facebook, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';
import { useState } from 'react';

import AppLogo from '@/components/app-logo';

export function FrontendFooter() {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <footer className="bg-[#1A1100] text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                    <div>
                        <h2 className="mb-2 text-2xl font-bold">Stay Connected</h2>
                        <p className="text-sm text-white/70">
                            Get the latest wellness tips, exclusive offers, and new
                            <br className="hidden sm:block" />
                            practitioner announcements.
                        </p>
                    </div>
                    <form onSubmit={handleSubscribe} className="flex w-full gap-2 md:w-auto text-gray-900">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border-0 bg-white px-4 py-2.5 text-sm text-gray-900! placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 md:w-64"
                        />
                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-primary-600"
                        >
                            <Mail className="h-4 w-4" />
                            Subscribe
                        </button>
                    </form>
                </div>

                <div className="mb-12 grid grid-cols-1 gap-8 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <Link href="#" className="mb-4 inline-block">
                            <AppLogo className="h-12 w-auto" />
                        </Link>
                        <p className="mb-4 text-sm text-white/70">
                            Your trusted platform for connecting with holistic
                            <br />
                            practitioners and discovering pathways to well-being.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-primary-500" />
                                <span>Secure Payments</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-primary-500" />
                                <span>Verified Practitioners</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Platform</h3>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li>
                                <Link href="#" className="transition hover:text-white">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition hover:text-white">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition hover:text-white">
                                    For Practitioners
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition hover:text-white">
                                    For Clients
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Support</h3>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li>
                                <Link href="#" className="transition hover:text-white">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition hover:text-white">
                                    Contact Support
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition hover:text-white">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition hover:text-white">
                                    Community Guidelines
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Legal</h3>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li>
                                <Link href="#" className="transition hover:text-white">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition hover:text-white">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition hover:text-white">
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition hover:text-white">
                                    Refund Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
                    <p className="text-xs text-white/60">
                        © 2025 Holistic Marketplace. All rights reserved.
                    </p>
                    <div className="flex gap-3">
                        <Link
                            href="#"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-white transition hover:bg-primary-600"
                        >
                            <Facebook className="h-4 w-4" />
                        </Link>
                        <Link
                            href="#"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-white transition hover:bg-primary-600"
                        >
                            <Twitter className="h-4 w-4" />
                        </Link>
                        <Link
                            href="#"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-white transition hover:bg-primary-600"
                        >
                            <Instagram className="h-4 w-4" />
                        </Link>
                        <Link
                            href="#"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-white transition hover:bg-primary-600"
                        >
                            <Linkedin className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}