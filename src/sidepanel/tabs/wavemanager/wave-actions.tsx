import { levelState } from '@/lib/state';
import { animationDuration } from './waves';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronsRight, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RenderWaveAction } from './actions/render-action';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Actions } from './actions/actions';
import type { WaveAction } from '@/lib/levelModules/wavemanager/wavetypes';

export function WaveActionList({
    waveIndex,
    setIndex,
}: {
    waveIndex: number | null;
    setIndex: (index: number | null) => void;
}) {
    const { levelBuilder } = levelState();

    const [wave, setWaveState] = useState<WaveAction[]>([]);

    const validIndex = waveIndex ?? -1;
    const waveActions = levelBuilder.waveManager.waves[validIndex] ?? [];

    useEffect(() => {
        if (waveIndex != null) setWaveState(waveActions);
        else setWaveState([]);
    }, [waveIndex, waveActions]);

    const setWave = useCallback(
        (newWave: WaveAction[]) => {
            if (waveIndex == null) return;
            levelBuilder.waveManager.waves[waveIndex] = newWave;
            setWaveState(newWave);
        },
        [waveIndex],
    );

    const addAction = useCallback(
        (type: string) => {
            const newAction = {
                type,
                name: `NewWaveAction${wave.length}`,
                data: Object.create(Actions[type].defaultData),
            };
            setWave([...wave, newAction]);
        },
        [wave],
    );

    const removeAction = useCallback(
        (index: number) => {
            const newWave = [...wave];
            newWave.splice(index, 1);
            setWave(newWave);
        },
        [wave],
    );

    if (waveIndex == null) {
        return <div className="p-4 text-muted-foreground">Select a wave to edit its actions</div>;
    }

    return (
        <div className="w-full flex-shrink-0">
            <div
                className={cn(
                    `flex flex-col ease-out transition-opacity duration-${animationDuration}`,
                    waveIndex != null ? 'opacity-100' : 'opacity-0',
                )}
            >
                {/*back button*/}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setIndex(null)}>
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                    <Label className="text-md">Wave {waveIndex !== null ? waveIndex + 1 : ''} Actions</Label>
                </div>

                {/*content*/}
                <div className="flex flex-col items-center justify-between gap-2">
                    {wave &&
                        wave.map((action, index) => (
                            <div
                                key={action.type + waveIndex}
                                className="flex items-center rounded-md justify-center border shadow-sm p-2 w-full"
                            >
                                <RenderWaveAction waveaction={action}>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeAction(index)}
                                        className="text-muted-foreground hover:text-destructive hover:bg-red-100"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </RenderWaveAction>
                            </div>
                        ))}

                    <AddActionButton onSelect={addAction} />
                </div>
            </div>
        </div>
    );
}

function AddActionButton({ className, onSelect }: { className?: string; onSelect: (action: string) => void }) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [search, setSearch] = useState('');

    const actionList = useMemo(() => {
        const AddButtonExceptions = ['UnknownAction'];
        return Object.entries(Actions).filter(([key, _]) => !AddButtonExceptions.includes(key));
    }, [Actions]);

    const filteredList = useMemo(() => {
        const s = search.toLowerCase().trim();
        if (!s) return actionList;
        return actionList.filter((p) => `${p[1].name} ${p[0]}`.toLowerCase().includes(s));
    }, [actionList, search]);

    return (
        <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <PopoverTrigger className="w-full mt-2">
                <div
                    key="+"
                    className={cn(
                        'flex items-center justify-between rounded-md border p-2 bg-background shadow-sm ',
                        'hover:bg-gray-200 transition-colors duration-300',
                        className,
                    )}
                >
                    <div className="w-full h-8 flex items-center justify-center gap-2">
                        <Label>New Action</Label>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <Command shouldFilter={false}>
                    <CommandInput value={search} onValueChange={setSearch} placeholder="Search Actions..." />
                    <CommandList>
                        <CommandEmpty>No actions found.</CommandEmpty>
                        <CommandGroup>
                            {filteredList.map((action) => {
                                return (
                                    <div key={action[0]} className="w-full">
                                        <CommandItem
                                            value={action[0]}
                                            onSelect={() => {
                                                setSearchOpen(false);
                                                onSelect(action[0]);
                                            }}
                                        >
                                            {action[1].name}
                                        </CommandItem>
                                    </div>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
