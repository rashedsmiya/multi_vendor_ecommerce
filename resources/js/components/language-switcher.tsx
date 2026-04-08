import { router, usePage } from '@inertiajs/react';
import { Languages } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { locale as localeRoute } from '@/routes';
import { type AvailableLocale, type SharedData } from '@/types';

type LanguageSwitcherProps = {
    align?: 'start' | 'end';
};

export function LanguageSwitcher({ align = 'end' }: LanguageSwitcherProps) {
    const { locale: currentLocale, availableLocales } =
        usePage<SharedData>().props;

    const currentLabel =
        availableLocales.find((l: AvailableLocale) => l.code === currentLocale)
            ?.native ?? currentLocale;

    const changeLocale = (code: string): void => {
        router.post(
            localeRoute.url(),
            { locale: code },
            { preserveScroll: true },
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    type="button"
                >
                    <Languages className="h-5 w-5" />
                    <span className="sr-only">Language: {currentLabel}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={align}>
                {availableLocales.map((l: AvailableLocale) => (
                    <DropdownMenuItem
                        key={l.code}
                        disabled={l.code === currentLocale}
                        onSelect={() => {
                            if (l.code !== currentLocale) {
                                changeLocale(l.code);
                            }
                        }}
                    >
                        <span
                            className={
                                l.code === currentLocale
                                    ? 'font-semibold'
                                    : undefined
                            }
                        >
                            {l.native}
                        </span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
