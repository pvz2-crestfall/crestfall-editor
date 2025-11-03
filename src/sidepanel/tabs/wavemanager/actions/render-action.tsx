import type { WaveAction } from '@/lib/levelModules/wavemanager/wavetypes';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Actions } from './actions';

export function RenderWaveAction<T = unknown>({
    children,
    waveaction,
}: {
    children?: React.ReactNode;
    waveaction: WaveAction<T>;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const action = Actions[waveaction.type] ?? Actions['UnknownAction'];

    return (
        <div className="flex flex-col justify-between gap-2 w-full">
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
                <div className="flex flex-row items-center justify-between px-4">
                    {children}
                    <h4 className="text-sm">{action.name}</h4>
                    <CollapsibleTrigger>
                        <Button variant="ghost" size="icon" className="size-8">
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
