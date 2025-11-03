import type { WaveZombie } from '@/lib/levelModules/wavemanager/wavetypes';
import { useState, type ReactNode } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../collapsible';
import { ChevronRight, Trash2 } from 'lucide-react';
import { Button } from '../button';
import { cn, fromRTID } from '@/lib/utils';
import { OptionalNumberInput } from '../optional-ninput';
import { ZombieDisplayNames } from '@/lib/zombies';

export function WaveEditorZombieList({
    list,
    enableRow,
    onRemove,
    children,
}: {
    list: WaveZombie[];
    enableRow?: boolean;
    onRemove: (index: number) => void;
    children?: ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full w-max-128">
            <CollapsibleTrigger className="w-full flex flex-row items-center justify-center">
                <h4 className="text-sm">Zombie List</h4>
                <CollapsibleTrigger>
                    <Button variant="ghost" size="icon" className="size-8">
                        <ChevronRight
                            className={cn('transition-transform duration-200 ease-in-out', isOpen ? 'rotate-90' : '')}
                        />
                    </Button>
                </CollapsibleTrigger>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col">
                <ul className="w-full">
                    {list.map((zombie, index) => (
                        <li
                            key={index}
                            className="flex items-center justify-between rounded-md border p-2 bg-background shadow-sm"
                        >
                            {enableRow && (
                                <OptionalNumberInput
                                    className="w-18"
                                    value={zombie.Row}
                                    min={1}
                                    max={5}
                                    placeholder="Row"
                                    onChange={(val) => (zombie.Row = val)}
                                />
                            )}

                            <div className="flex flex-row items-center justify-between gap">
                                <span className="break-all">
                                    {ZombieDisplayNames[fromRTID(zombie.Type).name] ?? fromRTID(zombie.Type).name}
                                </span>
                                <div className="flex flex-row items-center"></div>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onRemove(index)}
                                className="text-muted-foreground hover:text-destructive hover:bg-red-100"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </li>
                    ))}
                    {children}
                </ul>
            </CollapsibleContent>
        </Collapsible>
    );
}
