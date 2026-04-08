import { Link, router, usePage } from '@inertiajs/react';
import { ChevronDown, Menu, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import AppLogo from '@/components/app-logo';
// Ensure the file exists at resources/js/components/language-switcher.tsx
import { LanguageSwitcher } from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { type SharedData } from '@/types';

interface UserHeaderProps {
    showProfileMenu?: boolean;
}

export function UserHeader({ showProfileMenu = true }: UserHeaderProps) {
    const { auth } = usePage<SharedData>().props;
    const { url } = usePage();
    const [searchQuery, setSearchQuery] = useState('');
    const displayName = auth.user?.name ?? 'My account';
    const initial = auth.user?.name?.charAt(0).toUpperCase() ?? 'M';

    useEffect(() => {
        // Keep input synced when navigating (e.g. back/forward).
        try {
            const u = new URL(url, window.location.origin);
            const q = u.searchParams.get('query') ?? '';
            setSearchQuery(q);
        } catch {
            // noop
        }
         
    }, [url]);

    const handleLogout = (): void => {
        router.post(route('logout'));
    };

    const submitSearch = () => {
        const q = searchQuery.trim();
        router.get(route('search'), q ? { query: q } : {}, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
            <div className="container mx-auto flex h-26.5 items-center justify-between px-4 py-4">
                {/* Logo/Brand */}
                <Link href={route('home')} className="flex items-center gap-3">
                    <AppLogo className="h-20 w-auto" />
                </Link>

                {/* Search Bar - Desktop */}
                <div className="hidden md:flex md:flex-1 md:justify-center md:px-8">
                    <div className="relative w-full max-w-md">
                        <button
                            type="button"
                            onClick={submitSearch}
                            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            aria-label="Search"
                        >
                            <Search className="h-4 w-4" />
                        </button>
                        <input
                            type="text"
                            placeholder="Search courses, products, consultations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') submitSearch();
                            }}
                            className="h-12 w-full rounded-full border border-primary-300 bg-white pr-4 pl-10 text-sm placeholder-gray-500 transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                        />
                    </div>
                </div>

                {showProfileMenu && auth.user ? (
                    <>
                        {/* Desktop Profile Menu */}
                        <div className="hidden items-center gap-4 md:flex">
                            <LanguageSwitcher />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex h-auto items-center gap-2 rounded-md p-2 hover:bg-gray-50 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    >
                                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-linear-to-br from-amber-500 to-yellow-600">
                                            <span className="text-xs font-semibold text-white">
                                                {initial}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">
                                            {displayName}
                                        </span>
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-64 border-none p-2 shadow-sm"
                                    align="end"
                                    sideOffset={8}
                                >
                                    <UserMenuContent user={auth.user} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Mobile Menu */}
                        <div className="flex items-center gap-2 md:hidden">
                            <LanguageSwitcher />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="relative h-9 w-9 rounded-md ring-offset-background transition-all hover:ring-2 hover:ring-ring"
                                    >
                                        <Menu className="size-6" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-64 border-none p-2 shadow-sm"
                                    align="end"
                                    sideOffset={8}
                                >
                                    <UserMenuContent user={auth.user} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </>
                ) : (
                    <Button
                        variant="ghost"
                        className="text-gray-700 hover:text-gray-900"
                        onClick={handleLogout}
                    >
                        Log out
                    </Button>
                )}
            </div>
        </header>
    );
}
