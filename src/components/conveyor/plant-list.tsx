import { ChevronRight, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ConveyorPlantOptionsContent } from './plant-options';
import type { ConveyorSeedBankPlantObject } from '@/types/PVZTypes';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Label } from '../ui/label';
import { DeleteButton } from '../ui/delete-button';
import { iconFromList } from '../ui/virtual-command-list';
import { plantPaths } from '@/lib/plants';

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
                    <CollapsibleTrigger asChild className="flex flex-row">
                        <div>
                            <Label className="text-sm">{collapsibleLabel}</Label>
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
                            <PopoverTrigger asChild disabled={disableSettings}>
                                <Button disabled={disableSettings} variant="ghost" size="icon" className="group">
                                    <Settings className="h-4 w-4 transform transition-transform duration-700 group-hover:rotate-120" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-md">
                                <ConveyorPlantOptionsContent
                                    plant={plant}
                                    index={index}
                                    items={list}
                                    setPlants={setPlants}
                                />
                            </PopoverContent>
                        </Popover>
                        <div className="flex flex-row gap-2">
                            <span>{displayNames[plant.PlantType]}</span>
                            {iconFromList(plantPaths, plant.PlantType, 7)}
                        </div>
                    </div>
                    <DeleteButton onClick={() => onRemove(plant)} />
                </li>
            ))}

            {children}
        </ul>
    );
}
