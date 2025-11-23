import { useMemo, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { VirtualizedCommandList } from './ui/virtual-command-list';
import { CommandEmpty, CommandGroup, CommandInput, CommandList, Command } from './ui/command';
import { PlantDisplayNames, Plants } from '@/lib/plants';
import { PlantIcon } from './ui/asset-icons';

export function PlantSelector({
    className,
    plantType,
    onSelect,
}: {
    className?: string;
    plantType: string;
    onSelect?: (plant: string) => void;
}) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [search, setSearch] = useState('');

    const filteredList = useMemo(() => {
        const s = search.toLowerCase().trim();
        if (!s) return Plants;
        return Plants.filter((p) => `${p.displayName} ${p.codename}`.toLowerCase().includes(s));
    }, [Plants, search]);

    return (
        <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={searchOpen}
                    className="w-40 justify-between bg-transparent"
                >
                    <span className="overflow-hidden flex flex-row gap-2">
                        {plantType ? PlantDisplayNames[plantType] : 'Select Plant.'}
                        {PlantIcon({ type: plantType, size: 7 })}
                    </span>
                    <ChevronDown className="shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={className}>
                <Command shouldFilter={false}>
                    <CommandInput value={search} onValueChange={setSearch} placeholder="Search Plants..." />
                    <CommandList>
                        <CommandEmpty>No plants found.</CommandEmpty>
                        <CommandGroup>
                            <VirtualizedCommandList
                                items={filteredList}
                                icon={PlantIcon}
                                onSelect={(plant) => {
                                    onSelect?.(plant);
                                    setSearchOpen(false);
                                }}
                            />
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
