import { useMemo, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Zombies, ZombieDisplayNames } from '@/lib/zombies';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { VirtualizedCommandList } from '../ui/virtual-command-list';
import { CommandEmpty, CommandGroup, CommandInput, CommandList, Command } from '../ui/command';

export function WaveEditorZombieSelector({
    zombieType,
    onSelect,
}: {
    zombieType: string;
    onSelect?: (zombie: string) => void;
}) {
    const [zombieSearchOpen, setZombieSearchOpen] = useState(false);
    const [search, setSearch] = useState('');

    const filteredList = useMemo(() => {
        const s = search.toLowerCase().trim();
        if (!s) return Zombies;
        return Zombies.filter((p) => `${p.displayName} ${p.codename}`.toLowerCase().includes(s));
    }, [Zombies, search]);

    return (
        <Popover open={zombieSearchOpen} onOpenChange={setZombieSearchOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={zombieSearchOpen}
                    className="w-40 justify-between bg-transparent"
                >
                    <span className="overflow-hidden">
                        {zombieType ? ZombieDisplayNames[zombieType] : 'Select Zombie.'}
                    </span>
                    <ChevronDown className="shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Command shouldFilter={false}>
                    <CommandInput value={search} onValueChange={setSearch} placeholder="Search Zombies..." />
                    <CommandList>
                        <CommandEmpty>No zombie found.</CommandEmpty>
                        <CommandGroup>
                            <VirtualizedCommandList
                                items={filteredList}
                                onSelect={(zombie) => {
                                    onSelect?.(zombie);
                                    setZombieSearchOpen(false);
                                }}
                            />
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
