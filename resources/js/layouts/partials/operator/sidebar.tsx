import { Link, router, usePage } from '@inertiajs/react';
import {
    BarChart3,
    BookOpen,
    Gift,
    Home,
    LayoutGrid,
    LogOut,
    MessageSquare,
    Mic,
    Settings,
    ShoppingBag,
    Star,
    UserCog,
    Users,
    Wallet,
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
    const active = 'bg-figma-gold text-gray-900';
    const inactive = 'text-gray-900 hover:bg-slate-100';

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

function SidebarLinkSm({
    title,
    href,
    icon: Icon,
    isActive,
    onNavigate,
}: {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    isActive?: boolean;
    onNavigate?: () => void;
}) {
    const base =
        'flex h-11 w-full items-center gap-3 rounded-lg pl-4 transition-colors';
    const active = 'bg-yellow-500 text-white';
    const inactive = 'text-slate-600 hover:bg-slate-100';

    return (
        <Link
            href={href}
            onClick={() => onNavigate?.()}
            className={`${base} ${isActive ? active : inactive}`}
        >
            <span className="relative shrink-0 size-5">
                <Icon className="size-5" />
            </span>
            <span className="font-sans text-sm font-medium leading-5">{title}</span>
        </Link>
    );
}

export function OperatorSidebar({
    variant = 'desktop',
    onNavigate,
}: {
    variant?: 'desktop' | 'drawer';
    onNavigate?: () => void;
}) {
    const { url } = usePage();

    const handleLogout = (): void => {
        onNavigate?.();
        router.post(route('logout'));
    };

    const items: NavItem[] = [
        {
            title: 'Home',
            href: route('home'),
            icon: Home,
            isActive: url === '/' || url.startsWith('/?'),
        },
        {
            title: 'Dashboard',
            href: route('operator.dashboard'),
            icon: LayoutGrid,
            isActive: url.startsWith('/operator/dashboard'),
        },
        {
            title: 'Profile Settings',
            href: route('operator.profile-settings'),
            icon: UserCog,
            isActive: url.startsWith('/operator/profile-settings') || url.startsWith('/operator/profile-verification') || url.startsWith('/operator/verify-profile'),
        },
        {
            title: 'Messages',
            href: route('operator.messages'),
            icon: MessageSquare,
            isActive: url.startsWith('/operator/messages'),
        },
        {
            title: 'Consultations',
            href: route('operator.consultations.index'),
            icon: BarChart3,
            isActive: url.startsWith('/operator/consultations'),
        },
        {
            title: 'Courses',
            href: route('operator.courses.index'),
            icon: BookOpen,
            isActive: url.startsWith('/operator/courses'),
        },
        {
            title: 'Products',
            href: route('operator.products.index'),
            icon: ShoppingBag,
            isActive: url.startsWith('/operator/products'),
        },
        {
            title: 'Podcasts',
            // href: route('operator.manage-podcasts'),
            // icon: Mic,
            // isActive: url.startsWith('/operator/manage-podcasts'),
            href: route('operator.podcasts.index'),
            icon: Mic,
            isActive: url.startsWith('/operator/podcasts'),
        },
    ];

    const asideClassName =
        variant === 'drawer'
            ? 'flex h-full w-full flex-col bg-white'
            : 'sticky top-0 flex h-screen w-[280px] shrink-0 flex-col border-r border-gray-200 bg-white';

    return (
        <aside className={asideClassName}>
            <div className="border-b border-gray-200 px-6 pb-4 pt-6">
                <Link href={route('operator.dashboard')} className="inline-flex">
                    <AppLogo className="h-[74px] w-auto max-w-[134px]" />
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 pt-4">
                <div className="flex flex-col gap-1">
                    {items.map((item) => (
                        <SidebarItem key={item.title} {...item} onNavigate={onNavigate} />
                    ))}

                    {/* Community */}
                    <SidebarItem
                        title="Community"
                        href={route('operator.community')}
                        icon={Users}
                        isActive={url.startsWith('/operator/community')}
                        onNavigate={onNavigate}
                    />

                    {/* Wallet & Earnings */}
                    <SidebarItem
                        title="Wallet & Earnings"
                        href={route('operator.withdraws.index')}
                        icon={Wallet}
                        isActive={url.startsWith('/operator/withdraws')}
                        onNavigate={onNavigate}
                    />

                    {/* Reviews */}
                    <SidebarItem
                        title="Reviews"
                        href={route('operator.reviews')}
                        icon={Star}
                        isActive={url.startsWith('/operator/reviews')}
                        onNavigate={onNavigate}
                    />

                    {/* Refer & Earn (smaller link style in Figma) */}
                    {/* <SidebarLinkSm title="Refer & Earn"
                        href={route('operator.refer')}
                        icon={Gift}
                        isActive={url.startsWith('/operator/refer')}
                        onNavigate={onNavigate} /> */}
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

