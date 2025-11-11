import { Zombies } from '@/lib/zombies';
import { useMemo, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from '../ui/command';
import { VirtualizedCommandList } from '../ui/virtual-command-list';

export function AddZombieButton({ className, onSelect }: { className?: string; onSelect: (zombie: string) => void }) {
    const [zombieSearchOpen, setZombieSearchOpen] = useState(false);
    const [search, setSearch] = useState('');

    const filteredList = useMemo(() => {
        const s = search.toLowerCase().trim();
        if (!s) return Zombies;
        return Zombies.filter((p) => `${p.displayName} ${p.codename}`.toLowerCase().includes(s));
    }, [Zombies, search]);

    return (
        <Popover open={zombieSearchOpen} onOpenChange={setZombieSearchOpen}>
            <PopoverTrigger className="w-full mt-2">
                <li
                    key="+"
                    className={cn(
                        'flex items-center justify-between rounded-md border p-2 shadow-sm ',
                        'hover:bg-primary-foreground transition-colors duration-300',
                        className,
                    )}
                >
                    <div className="w-full h-8 flex items-center justify-center gap-2">
                        <Label>Add Zombie</Label>
                    </div>
                </li>
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
                                    onSelect(zombie);
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
