import { Menu } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/sonner';
import { useAppearance } from '@/hooks/use-appearance';
import { OperatorSidebar } from '@/layouts/partials/operator/sidebar';

interface OperatorDashboardLayoutProps {
    children: ReactNode;
}

export default function OperatorDashboardLayout({
    children,
}: OperatorDashboardLayoutProps) {
    const [open, setOpen] = useState(false);
    const { appearance, updateAppearance } = useAppearance();
    useEffect(() => {
        if (appearance !== 'light') {
            updateAppearance('light');
        }
    }, [appearance, updateAppearance]);
    return (
        <div className="bg-figma-stone min-h-dvh">
            <Toaster position="top-right" richColors />
            <div className="relative mx-auto flex min-h-dvh overflow-hidden">
                {/* Desktop sidebar */}
                <div className="hidden h-screen xl:sticky xl:top-0 xl:block">
                    <OperatorSidebar />
                </div>

                {/* Mobile sidebar drawer */}
                <div className="xl:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <button
                                type="button"
                                className="border-figma-border text-figma-slate fixed top-4 left-4 z-40 inline-flex size-10 items-center justify-center rounded-xl border bg-white shadow-sm"
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
                            <OperatorSidebar
                                variant="drawer"
                                onNavigate={() => setOpen(false)}
                            />
                        </SheetContent>
                    </Sheet>
                </div>

                <main className="h-screen min-w-0 flex-1 overflow-y-auto p-4 pt-16 xl:p-8 xl:pt-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
