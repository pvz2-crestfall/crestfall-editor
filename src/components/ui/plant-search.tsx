import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plants, type PlantType } from '@/lib/plants';
import { cn } from '@/lib/utils';
import { ChevronsUpDownIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { VirtualizedCommandList } from './virtual-command-list';

export function PlantSearchCombobox({
    list = Plants,
    value = '',
    onChange,
    className,
    cmdClassName,
}: {
    list?: PlantType[];
    className?: string;
    cmdClassName?: string;
    value: string;
    onChange: (newValue: string) => void;
}) {
    const [open, setOpen] = useState(false);

    const [search, setSearch] = useState('');
    const filteredList = useMemo(() => {
        const s = search.toLowerCase().trim();
        if (!s) return list;
        return list.filter((p) => `${p.displayName} ${p.codename}`.toLowerCase().includes(s));
    }, [list, search]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn('flex w-60 justify-between', className)}
                >
                    {value ? list.find((plant) => plant.codename === value)?.displayName : 'Add plant...'}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn('w-[200px] p-0', cmdClassName)}>
                <Command shouldFilter={false}>
                    <CommandInput value={search} onValueChange={setSearch} placeholder="Search plants..." />
                    <CommandList>
                        <CommandEmpty>No plant found.</CommandEmpty>
                        <CommandGroup>
                            <VirtualizedCommandList
                                items={filteredList}
                                onSelect={(currentValue: string) => {
                                    onChange(currentValue === value ? '' : currentValue);
                                    setOpen(false);
                                }}
                            />
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
