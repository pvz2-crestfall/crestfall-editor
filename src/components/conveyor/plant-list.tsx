import { ChevronRight, Settings, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ConveyorPlantOptionsContent } from './plant-options';
import type { ConveyorSeedBankPlantObject } from '@/types/PVZTypes';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Label } from '../ui/label';

interface ComponentProps {
    list: ConveyorSeedBankPlantObject[];
    displayNames: Record<string, any>;
    disableSettings?: boolean;
    setPlants: (plants: ConveyorSeedBankPlantObject[]) => void;
    onRemove: (plant: ConveyorSeedBankPlantObject) => void;
    children?: React.ReactNode;
}

export function ConveyorPlantList({
    collapsibleLabel,
    collapsible,
    ...props
}: { collapsible?: boolean; collapsibleLabel?: string } & ComponentProps) {
    const [isOpen, setIsOpen] = useState(collapsible);

    if (collapsible)
        return (
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full w-max-128">
                <div className="w-full flex flex-row items-center justify-center">
                    <CollapsibleTrigger className="flex flex-row">
                        <Label className="text-sm">{collapsibleLabel}</Label>
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
                <CollapsibleContent className="flex flex-col">
                    <ConveyorPlantsListContent {...props} />
                </CollapsibleContent>
            </Collapsible>
        );
    else return <ConveyorPlantsListContent {...props} />;
}

function ConveyorPlantsListContent({
    list,
    displayNames,
    disableSettings,
    setPlants,
    onRemove,
    children,
}: ComponentProps) {
    return (
        <ul className="w-full">
            {list.map((plant, index) => (
                <li className="flex items-center justify-between rounded-md border p-2 bg-background shadow-sm">
                    <div className="flex items-center gap-2">
                        <Popover>
                            <PopoverTrigger disabled={disableSettings}>
                                <Button disabled={disableSettings} variant="ghost" size="icon" className="group">
                                    <Settings className="h-4 w-4 transform transition-transform duration-700 group-hover:rotate-120" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-112">
                                <ConveyorPlantOptionsContent
                                    plant={plant}
                                    index={index}
                                    items={list}
                                    setPlants={setPlants}
                                />
                            </PopoverContent>
                        </Popover>
                        <span>{displayNames[plant.PlantType]}</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemove(plant)}
                        className="text-muted-foreground hover:text-destructive hover:bg-red-100"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </li>
            ))}

            {children}
        </ul>
    );
}
