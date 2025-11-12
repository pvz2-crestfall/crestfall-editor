import type { WaveAction } from '@/lib/levelModules/wavemanager/wavetypes';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight, Eye, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Actions } from './actions';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';

export function RenderWaveAction<T = unknown>({
    waveaction,
    onRemove,
}: {
    children?: React.ReactNode;
    onRemove: () => void;
    waveaction: WaveAction<T>;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const action = Actions[waveaction.type] ?? Actions['UnknownAction'];

    return (
        <div className="flex flex-col justify-between gap-2 w-full">
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
                <div className="flex flex-row items-center justify-between px-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemove()}
                        className="text-muted-foreground hover:text-destructive hover:bg-red-100"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex flex-row items-center w-full justify-between">
                        <h4 className="text-sm">{action.name}</h4>
                        <Toggle
                            aria-label={'Toggle Preview for: ' + action.name}
                            size="sm"
                            variant={'default'}
                            className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:stroke-primary"
                        >
                            <Eye className="h-4 w-4" />
                        </Toggle>
                    </div>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <ChevronRight
                                className={cn(
                                    'transition-transform duration-200 ease-in-out',
                                    isOpen ? 'rotate-90' : '',
                                )}
                            />
                        </Button>
                    </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="pt-1">
                    <action.component waveaction={waveaction} />
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}
