import { gravestoneList } from '../grave-list';
import { useMemo, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '../ui/command';
import { GravestoneIcon } from '../ui/asset-icons';

const MappedList = Object.entries(gravestoneList).map(([key, value]) => {
    return { codename: key, displayName: value.label };
});

export function AddGravestoneButton({
    className,
    onSelect,
}: {
    className?: string;
    onSelect: (grave: string) => void;
}) {
    const [graveSearchOpen, setGraveSearchOpen] = useState(false);
    const [search, setSearch] = useState('');

    const filteredList = useMemo(() => {
        const s = search.toLowerCase().trim();
        if (!s) return MappedList;
        return MappedList.filter((p) => `${p.displayName} ${p.codename}`.toLowerCase().includes(s));
    }, [MappedList, search]);

    return (
        <Popover open={graveSearchOpen} onOpenChange={setGraveSearchOpen}>
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
                        <Label>Add Grave</Label>
                    </div>
                </li>
            </PopoverTrigger>
            <PopoverContent>
                <Command shouldFilter={false}>
                    <CommandInput value={search} onValueChange={setSearch} placeholder="Search Graves..." />
                    <CommandList>
                        <CommandEmpty>No Grave found.</CommandEmpty>
                        <CommandGroup>
                            {filteredList.map(({ codename, displayName }) => {
                                if ((codename == 'default') == true) return;

                                return (
                                    <CommandItem
                                        key={codename}
                                        value={codename}
                                        onSelect={(grave) => {
                                            onSelect(grave);
                                            setGraveSearchOpen(false);
                                        }}
                                    >
                                        <div className="flex flex-row items-center gap-2">
                                            <GravestoneIcon type={codename} size={5} />
                                            {displayName}
                                        </div>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
