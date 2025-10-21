import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plants } from '@/lib/plants';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { useState } from 'react';

export function PlantSearchCombobox({ value = '', onChange }: { value: string; onChange: (newValue: string) => void }) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="flex w-[240px] justify-between">
                    {value ? Plants.find((plant) => plant.codename === value)?.displayName : 'Add plant...'}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command
                    filter={(itemValue, search) => {
                        const plant = Plants.find((p) => p.codename === itemValue);
                        if (!plant) return 0;
                        const haystack = `${plant.displayName} ${plant.codename}`.toLowerCase();
                        return haystack.includes(search.toLowerCase()) ? 1 : 0;
                    }}
                >
                    <CommandInput placeholder="Search plants..." />
                    <CommandList>
                        <CommandEmpty>No plant found.</CommandEmpty>
                        <CommandGroup>
                            {Plants.map((plant) => (
                                <CommandItem
                                    key={plant.codename}
                                    value={plant.codename}
                                    onSelect={(currentValue: string) => {
                                        onChange(currentValue === value ? '' : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {plant.displayName}
                                    {value === plant.codename && <CheckIcon className="mr-2 h-4 w-4" />}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
