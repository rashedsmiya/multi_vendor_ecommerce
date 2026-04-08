import * as React from 'react';
import { Tooltip, TooltipProps } from 'recharts';

import { cn } from '@/lib/utils';

export type ChartConfig = Record<
    string,
    { label: string; color?: string }
>;

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    config: ChartConfig;
}

export function ChartContainer({ config, className, children, ...props }: ChartContainerProps) {
    const style = Object.fromEntries(
        Object.entries(config).map(([key, val]) => [
            `--color-${key}`,
            val.color ?? '',
        ]),
    ) as React.CSSProperties;

    return (
        <div className={cn('w-full', className)} style={style} {...props}>
            {/* recharts requires a sized container */}
            <ResponsiveWrapper>{children}</ResponsiveWrapper>
        </div>
    );
}

function ResponsiveWrapper({ children }: { children: React.ReactNode }) {
    // Pass children through — recharts components handle their own sizing
    // when wrapped in a div with explicit height/width via className.
    return <>{children}</>;
}

// Re-export Tooltip primitives under chart-friendly names
export const ChartTooltip = Tooltip;

interface ChartTooltipContentProps extends Omit<TooltipProps<number, string>, 'formatter'> {
    formatter?: (value: number | string) => string;
}

export function ChartTooltipContent({ active, payload, label, formatter }: ChartTooltipContentProps) {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-md text-xs">
            {label && <p className="mb-1 font-medium text-gray-700">{label}</p>}
            {payload.map((entry) => (
                <p key={entry.dataKey as string} style={{ color: entry.color }}>
                    {entry.name}:{' '}
                    <span className="font-semibold">
                        {formatter ? formatter(entry.value as number) : entry.value}
                    </span>
                </p>
            ))}
        </div>
    );
}
