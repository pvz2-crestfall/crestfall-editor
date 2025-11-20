import { useMemo, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from '../ui/command';
import { VirtualizedCommandList } from '../ui/virtual-command-list';
import { plantPaths, Plants } from '@/lib/plants';

export function AddPlantButton({ className, onSelect }: { className?: string; onSelect: (plant: string) => void }) {
    const [plantSearchOpen, setPlantSearchOpen] = useState(false);
    const [search, setSearch] = useState('');

    const filteredList = useMemo(() => {
        const s = search.toLowerCase().trim();
        if (!s) return Plants;
        return Plants.filter((p) => `${p.displayName} ${p.codename}`.toLowerCase().includes(s));
    }, [Plants, search]);

    return (
        <Popover open={plantSearchOpen} onOpenChange={setPlantSearchOpen}>
            <PopoverTrigger className="w-full mt-2">
                <li
                    key="+"
                    className={cn(
                        'flex items-center justify-between rounded-md border p-2 shadow-sm ',
                        'hover:bg-primary/10 transition-colors duration-300',
                        className,
                    )}
                >
                    <div className="w-full h-8 flex items-center justify-center gap-2">
                        <Label>Add Plant</Label>
                    </div>
                </li>
            </PopoverTrigger>
            <PopoverContent>
                <Command shouldFilter={false}>
                    <CommandInput value={search} onValueChange={setSearch} placeholder="Search Zombies..." />
                    <CommandList>
                        <CommandEmpty>No plants found.</CommandEmpty>
                        <CommandGroup>
                            <VirtualizedCommandList
                                items={filteredList}
                                icons={plantPaths}
                                onSelect={(plant) => {
                                    onSelect(plant);
                                    setPlantSearchOpen(false);
                                }}
                            />
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
