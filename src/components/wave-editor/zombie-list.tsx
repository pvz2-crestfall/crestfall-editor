import type { WaveZombie } from '@/lib/levelModules/wavemanager/types';
import { cn, fromRTID } from '@/lib/utils';
import { ZombieDisplayNames } from '@/lib/zombies';
import { ChevronRight } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Button } from '../ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { OptionalNumberInput } from '../ui/optional-ninput';
import { Label } from '../ui/label';
import { DeleteButton } from '../ui/delete-button';

export function WaveEditorZombieList({
    list,
    disableRow,
    onRemove,
    children,
}: {
    list: WaveZombie[];
    disableRow?: boolean;
    onRemove: (index: number) => void;
    children?: ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full w-max-128">
            <div className="w-full flex flex-row items-center justify-center">
                <CollapsibleTrigger asChild className="flex flex-row">
                    <div>
                        <Label className="text-sm">Zombie List</Label>
                        <Button variant="ghost" size="icon">
                            <ChevronRight
                                className={cn(
                                    'transition-transform duration-200 ease-in-out',
                                    isOpen ? 'rotate-90' : '',
                                )}
                            />
                        </Button>
                    </div>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="flex flex-col">
                <ul className="w-full">
                    {list.map((zombie, index) => (
                        <li
                            key={index}
                            className="flex items-center justify-between rounded-md border p-2 bg-primary-foreground shadow-sm"
                        >
                            <OptionalNumberInput
                                disabled={disableRow}
                                className={cn('w-18', disableRow && 'opacity-50 cursor-not-allowed')}
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

                            <DeleteButton onClick={() => onRemove(index)} />
                        </li>
                    ))}
                    {children}
                </ul>
            </CollapsibleContent>
        </Collapsible>
    );
}
