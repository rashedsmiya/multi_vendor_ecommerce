import { type ReactNode, useEffect, useState } from 'react';

import { UserSidebar } from '@/layouts/partials/user/sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';

interface UserDashboardLayoutProps {
    children: ReactNode;
}

export default function UserDashboardLayout({ children }: UserDashboardLayoutProps) {
    const [open, setOpen] = useState(false);

    const { appearance, updateAppearance } = useAppearance();
    useEffect(() => {
        if (appearance !== 'light') {
            updateAppearance('light');
        }
    }, [appearance, updateAppearance]);

    return (
        <div className="h-screen bg-figma-stone">
            <div className="mx-auto flex h-screen overflow-hidden ">
                {/* Desktop sidebar */}
                <div className="hidden xl:block">
                    <UserSidebar />
                </div>

                {/* Mobile sidebar drawer */}
                <div className="xl:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <button
                                type="button"
                                className="fixed left-4 top-4 z-40 inline-flex size-10 items-center justify-center rounded-xl border border-figma-border bg-white text-figma-slate shadow-sm"
                                aria-label="Open menu"
                            >
                                <Menu className="size-5" />
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            showCloseButton={true}
                            className="w-[280px] max-w-[280px] p-0"
                        >
                            <UserSidebar
                                variant="drawer"
                                onNavigate={() => setOpen(false)}
                            />
                        </SheetContent>
                    </Sheet>
                </div>

                <main className="min-w-0 flex-1 overflow-y-auto p-4 pt-16 xl:p-8 xl:pt-8 h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}

