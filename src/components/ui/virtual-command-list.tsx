import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { CommandItem } from './command';

export function VirtualizedCommandList({ items, onSelect }: { items: any[]; onSelect: (z: string) => void }) {
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
                            <CommandItem value={zombie.codename} onSelect={() => onSelect(zombie.codename)}>
                                {zombie.displayName}
                            </CommandItem>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
