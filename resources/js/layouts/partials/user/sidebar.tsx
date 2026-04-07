import { Link, router, usePage } from '@inertiajs/react';
import {
    BookOpen,
    CalendarDays,
    Home,
    LayoutGrid,
    LogOut,
    MessageSquare,
    Mic,
    Package,
    Settings,
    User,
    Users,
} from 'lucide-react';

import AppLogo from '@/components/app-logo';

type NavItem = {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    isActive?: boolean;
};

function SidebarItem({
    title,
    href,
    icon: Icon,
    isActive,
    onNavigate,
}: NavItem & { onNavigate?: () => void }) {
    const base =
        'flex h-12 w-full items-center gap-3 rounded-lg pl-4 text-base leading-6 transition-colors';
    const active = 'bg-yellow-500 text-gray-900';
    const inactive = 'text-gray-600 hover:bg-slate-100';

    return (
        <Link
            href={href}
            onClick={() => onNavigate?.()}
            className={`${base} ${isActive ? active : inactive}`}
        >
            <span className="relative shrink-0 size-5">
                <Icon className="size-5" />
            </span>
            <span className={`${isActive ? 'font-medium' : 'font-normal'} font-sans`}>
                {title}
            </span>
        </Link>
    );
}

export function UserSidebar({
    variant = 'desktop',
    onNavigate,
}: {
    variant?: 'desktop' | 'drawer';
    onNavigate?: () => void;
}) {
    const { url } = usePage();

    const currentPageName = url.startsWith('/user/dashboard')
        ? 'Dashboard'
        : url.startsWith('/user/my-learning')
            ? 'My Learning'
            : url.startsWith('/user/my-account/consultations')
                ? 'My Consultations'
                : url.startsWith('/user/my-account/podcast')
                    ? 'My Podcasts'
                    : url.startsWith('/user/my-account/products')
                        ? 'My Purchases'
                        : url.startsWith('/user/my-account/profile')
                            ? 'Profile'
                            : url.startsWith('/user/my-account/about')
                                ? 'About'
                                : url.startsWith('/community')
                                    ? 'Community'
                                    : 'Dashboard';

    const handleLogout = (): void => {
        onNavigate?.();
        router.post(route('logout'));
    };

    const items: NavItem[] = [
        {
            title: 'Home',
            href: route('home'),
            icon: Home,
            isActive: url.startsWith('/'),
        },
        {
            title: 'Dashboard',
            href: route('user.dashboard'),
            icon: LayoutGrid,
            isActive: url.startsWith('/user/dashboard'),
        },
        {
            title: 'My Learning',
            href: route('user.my-learning'),
            icon: BookOpen,
            isActive: url.startsWith('/user/my-learning'),
        },
        {
            title: 'My Consultations',
            href: route('user.my-account.consultations'),
            icon: CalendarDays,
            isActive: url.startsWith('/user/my-account/consultations'),
        },
        {
            title: 'My Podcasts',
            href: route('user.my-account.podcast'),
            icon: Mic,
            isActive: url.startsWith('/user/my-account/podcast'),
        },
        {
            title: 'My Purchases',
            href: route('user.my-account.products'),
            icon: Package,
            isActive: url.startsWith('/user/my-account/products'),
        },
        {
            title: 'Messages',
            href: route('user.messages'),
            icon: MessageSquare,
            isActive: url.startsWith('/user/messages'),
        },

        {
            title: 'Profile',
            href: route('user.my-account.profile'),
            icon: User,
            isActive: url.startsWith('/user/my-account/profile'),
        },
        {
            title: 'Community',
            href: route('user.community'),
            icon: Users,
            isActive: url.startsWith('/user/community'),
        },

        // {
        //     title: 'Refer & Earn',
        //     href: route('user.refer'),
        //     icon: Gift,
        //     isActive: url.startsWith('/user/refer'),
        // }
    ];

    const asideClassName =
        variant === 'drawer'
            ? 'flex h-full w-full flex-col bg-white'
            : 'sticky top-0 flex h-screen w-[280px] shrink-0 flex-col border-r border-gray-200 bg-white';

    return (
        <aside className={asideClassName}>
            <div className="border-b border-gray-200 px-6 pb-4 pt-6">
                <Link href={route('user.dashboard')} className="inline-flex">
                    <AppLogo className="h-[74px] w-auto max-w-[134px]" />
                </Link>
            </div>

            {currentPageName && (
                <div className="border-b border-gray-200 px-4 py-3">
                    <p className="font-epilogue text-sm font-medium text-figma-slate">
                        Current page
                    </p>
                    <p className="font-epilogue text-lg font-semibold text-figma-heading-alt">
                        {currentPageName}
                    </p>
                </div>
            )}

            <nav className="flex-1 overflow-y-auto px-4 pt-4">
                <div className="flex flex-col gap-1">
                    {items.map((item) => (
                        <SidebarItem key={item.title} {...item} onNavigate={onNavigate} />
                    ))}
                </div>
            </nav>

            <div className="mt-auto border-t border-gray-200 px-4 pt-[17px] pb-4">
                <Link
                    href="#"
                    className="flex h-12 w-full items-center gap-3 rounded-lg pl-4 text-gray-900 hover:bg-slate-100"
                >
                    <Settings className="size-5" />
                    <span className="font-sans text-base leading-6">Settings</span>
                </Link>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 flex h-12 w-full items-center gap-3 rounded-lg pl-4 text-gray-900 hover:bg-slate-100"
                >
                    <LogOut className="size-5" />
                    <span className="font-sans text-base leading-6">Log Out</span>
                </button>
            </div>
        </aside>
    );
}

