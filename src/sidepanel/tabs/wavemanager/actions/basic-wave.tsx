import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { OptionalNumberInput } from '@/components/ui/optional-ninput';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { SpawnZombiesJitteredWaveActionPropsObject, WaveAction } from '@/lib/levelModules/wavemanager/wavetypes';
import { cn, fromRTID, RTIDTypes, toRTID } from '@/lib/utils';
import { ZombieDisplayNames, Zombies } from '@/lib/zombies';
import { Trash2 } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { VirtualizedCommandList } from '@/components/ui/virtual-command-list';

export function BasicWaveAction({ waveaction }: { waveaction: WaveAction<SpawnZombiesJitteredWaveActionPropsObject> }) {
    const [plantFoodCount, _setPFCount] = useState(waveaction.data.AdditionalPlantfood);
    const [zombies, _setZombies] = useState(waveaction.data.Zombies);

    console.log('BasicWaveAction render');

    const setZombies = (val: { Type: string; row?: number }[]) => {
        waveaction.data.Zombies = val;
        _setZombies(val);
    };

    const setPlantFoodCount = (val: number | undefined) => {
        waveaction.data.AdditionalPlantfood = val;
        _setPFCount(val);
    };

    const addNewZombie = useCallback((zombie: string) => {
        setZombies([...zombies, { Type: toRTID(zombie, RTIDTypes.zombie) }]);
    }, []);

    const removeZombie = (index: number) => {
        const newZombies = [...zombies];
        newZombies.splice(index, 1);
        setZombies(newZombies);
    };

    return (
        <div className="flex flex-col w-full items-center justify-center gap-2">
            <div className="flex flex-row justify-center">Basic Zombie Wave</div>

            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                <Label>Additional Plant Food</Label>
                <OptionalNumberInput value={plantFoodCount} onChange={setPlantFoodCount} />
            </div>

            <ul className="w-full">
                {waveaction.data.Zombies.map((zombie, index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between rounded-md border p-2 bg-background shadow-sm"
                    >
                        <OptionalNumberInput
                            className="w-18"
                            value={zombie.Row}
                            min={1}
                            max={5}
                            placeholder="Row"
                            onChange={(val) => (zombie.Row = val)}
                        />

                        <div className="flex flex-row items-center justify-between gap">
                            <span className="break-all">
                                {ZombieDisplayNames[fromRTID(zombie.Type).name] ?? fromRTID(zombie.Type).name}
                            </span>
                            <div className="flex flex-row items-center"></div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeZombie(index)}
                            className="text-muted-foreground hover:text-destructive hover:bg-red-100"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </li>
                ))}
                <AddZombieButton onSelect={addNewZombie} />
            </ul>
        </div>
    );
}

function AddZombieButton({ onSelect }: { onSelect: (zombie: string) => void }) {
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
                        'flex items-center justify-between rounded-md border p-2 bg-background shadow-sm ',
                        'hover:bg-gray-200 transition-colors duration-300',
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
