import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plants, type PlantType } from '@/lib/plants';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { useState } from 'react';

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

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn('flex w-[240px] justify-between', className)}
                >
                    {value
                        ? list.find((plant) => plant.codename === value)?.displayName
                        : 'Add plant...'}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn('w-[200px] p-0', cmdClassName)}>
                <Command
                    filter={(itemValue, search) => {
                        const plant = list.find((p) => p.codename === itemValue);
                        if (!plant) return 0;
                        const haystack = `${plant.displayName} ${plant.codename}`.toLowerCase();
                        return haystack.includes(search.toLowerCase()) ? 1 : 0;
                    }}
                >
                    <CommandInput placeholder="Search plants..." />
                    <CommandList>
                        <CommandEmpty>No plant found.</CommandEmpty>
                        <CommandGroup>
                            {list.map((plant) => (
                                <CommandItem
                                    key={plant.codename}
                                    value={plant.codename}
                                    onSelect={(currentValue: string) => {
                                        onChange(currentValue === value ? '' : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {plant.displayName}
                                    {value === plant.codename && (
                                        <CheckIcon className="mr-2 h-4 w-4" />
                                    )}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
