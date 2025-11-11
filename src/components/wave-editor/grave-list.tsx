import type { GravestonePool } from '@/lib/levelModules/wavemanager/wavetypes';
import { cn, fromRTID } from '@/lib/utils';
import { ChevronRight, Trash2 } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { GravestoneIcon } from '../grave-editor-window';
import { gravestoneList } from '../grave-list';
import { Button } from '../ui/button';
import { OptionalNumberInput } from '../ui/optional-ninput';
import { Label } from '../ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

export function WaveEditorGravestoneList({
    list,
    disableRow,
    removeRow,
    onRemove,
    children,
    header = 'Grave Counts',
}: {
    list: GravestonePool[];
    removeRow?: boolean;
    disableRow?: boolean;
    header?: string;
    onRemove: (index: number) => void;
    children?: ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full w-max-128">
            <div className="w-full flex flex-row items-center justify-center">
                <CollapsibleTrigger asChild className="flex flex-row">
                    <div>
                        <Label className="text-sm">{header}</Label>
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
                    {list.map((grave, index) => {
                        const graveType = fromRTID(grave.Type).name;

                        return (
                            <li
                                key={index}
                                className="flex items-center justify-between rounded-md border p-2 bg-primary-foreground shadow-sm"
                            >
                                {!removeRow && (
                                    <OptionalNumberInput
                                        disabled={disableRow}
                                        className={cn('w-12', disableRow && 'opacity-50 cursor-not-allowed')}
                                        value={grave.Count}
                                        min={0}
                                        max={99}
                                        placeholder="0"
                                        onChange={(val) => (grave.Count = val ?? 0)}
                                    />
                                )}
                                {!removeRow ? (
                                    <div className="flex flex-row items-center justify-between gap-2">
                                        <span className="break-all">{gravestoneList[graveType].label}</span>
                                        <GravestoneIcon type={graveType} size={5} />
                                    </div>
                                ) : (
                                    <>
                                        <GravestoneIcon type={graveType} size={5} />
                                        <div className="flex flex-row items-center justify-between gap-2">
                                            <span className="break-all">{gravestoneList[graveType].label}</span>
                                        </div>
                                    </>
                                )}

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onRemove(index)}
                                    className="text-muted-foreground hover:text-destructive hover:bg-destructive"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </li>
                        );
                    })}
                    {children}
                </ul>
            </CollapsibleContent>
        </Collapsible>
    );
}
