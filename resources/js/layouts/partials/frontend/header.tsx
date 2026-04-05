
import { Link } from '@inertiajs/react';
import { Menu, Search } from 'lucide-react';
import { useState } from 'react';

import AppLogo from '@/components/app-logo';

export function FrontendHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="border-y-2 border-sky-100 bg-white shadow-lg">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="#" className="flex items-center gap-3">
                        <AppLogo className="h-20 w-auto" />
                    </Link>

                    <div className="hidden items-center gap-6 text-sm font-medium md:flex">
                        {/* <Link
                            href={route('login')}
                            className="flex w-64 items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-gray-900 transition hover:border-slate-300 hover:text-slate-500"
                        >
                            <Search className="mr-2 h-4 w-4" />
                            <span>Search...</span>
                        </Link> */}

                        <Link href={route('login')} className="text-gray-900 transition hover:text-slate-900">
                            Login
                        </Link>
                        <Link
                            href={route('register')}
                            className="rounded-full bg-primary-500 text-base px-6 py-3 text-white shadow-md transition hover:-translate-y-0.5 hover:bg-primary-600"
                        >
                            Sign Up Free
                        </Link>
                    </div>

                    <button
                        type="button"
                        className="flex h-11 w-11 items-center justify-center rounded-full text-slate-700 md:hidden"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                    >
                        <span className="sr-only">Toggle navigation</span>
                        <Menu className="h-8 w-8" />
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="mt-4 flex flex-col gap-3 rounded-2xl border-t p-4 text-sm font-medium shadow-md md:hidden">
                        {/* <Link
                            href={route('login')}
                            className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-400 transition hover:border-slate-300 hover:text-slate-500"
                        >
                            <Search className="mr-2 h-4 w-4" />
                            <span>Search...</span>
                        </Link> */}
                        {/* <Link href={route('login')} className="text-slate-700 transition hover:text-slate-900">
                            Login
                        </Link> */}
                        <Link
                            href={route('login')}
                            className="rounded-full  bg-secondary px-6 py-2 text-center text-white shadow-md transition hover:-translate-y-0.5 hover:bg-primary-600"
                        >
                            Login
                        </Link>
                        <Link
                            href={route('register')}
                            className="rounded-full  bg-primary-500 px-6 py-2 text-center text-white shadow-md transition hover:-translate-y-0.5 hover:bg-primary-600"
                        >
                            Sign Up Free
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}