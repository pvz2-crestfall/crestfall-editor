import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { CommandItem } from './command';

export function VirtualizedCommandList({
    items,
    icons,
    onSelect,
}: {
    items: { codename: string; displayName?: string }[];
    icons?: Record<string, string>;
    onSelect?: (z: string) => void;
}) {
    const parentRef = useRef<HTMLDivElement>(null);
    const rowVirtualizer = useVirtualizer({
        count: items.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 36,
    });

    const virtualItems = rowVirtualizer.getVirtualItems();

    return (
        <div ref={parentRef} className="h-64 overflow-auto relative">
            <div
                style={{
                    height: rowVirtualizer.getTotalSize(),
                    position: 'relative',
                }}
            >
                {virtualItems.map((virtualRow) => {
                    const zombie = items[virtualRow.index];
                    return (
                        <div
                            key={zombie.codename}
                            className="absolute top-0 left-0 w-full"
                            style={{
                                transform: `translateY(${virtualRow.start}px)`,
                            }}
                        >
                            <CommandItem value={zombie.codename} onSelect={() => onSelect?.(zombie.codename)}>
                                {zombie.displayName}
                                {icons != undefined && iconFromList(icons, zombie.codename, 7)}
                            </CommandItem>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export function iconFromList(icons: Record<string, string> | undefined, type: string, size: number) {
    const iconKey = (icons && icons[type]) ?? type;
    const src = icons && icons[`./${iconKey}.png`];

    const fallbackSrc = icons && icons['./unknown_plant.png'];
    const imageSrc = src || fallbackSrc;

    return (
        <div
            style={{
                width: `calc(var(--spacing) * ${size})`,
                height: `calc(var(--spacing) * ${size})`,
                objectFit: 'contain',
            }}
        >
            <img
                src={imageSrc}
                className="h-full w-full object-contain"
                onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = fallbackSrc ?? '';
                }}
            />
        </div>
    );
}
