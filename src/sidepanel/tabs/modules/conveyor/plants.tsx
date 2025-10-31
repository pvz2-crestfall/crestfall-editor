import { Button } from '@/components/ui/button';
import { PlantSearchCombobox } from '@/components/ui/plant-search';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { levelState } from '@/lib/state';
import type { ConveyorSeedBankPlantObject } from '@/types/PVZTypes';
import { Settings, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ConveyorPlantOptionsContent } from './plant-options';
import { PlantDisplayNames } from '@/lib/plants';

export function ConveyorPlants() {
    const { levelBuilder } = levelState();
    const [items, setItems] = useState(levelBuilder.conveyor.plants);

    const setPlants = (plants: ConveyorSeedBankPlantObject[]) => {
        levelBuilder.conveyor.plants = plants;
        setItems(plants);
    };

    const [newItem, setNewItem] = useState('');
    const addItem = () => {
        if (!newItem.trim()) return;
        setPlants([...items, { PlantType: newItem, Weight: 50 }]);
        setNewItem('');
    };
    const removeItem = (plant: ConveyorSeedBankPlantObject) => {
        setPlants(items.filter((item) => item.PlantType !== plant.PlantType));
    };

    return (
        <div className="flex flex-col">
            <div className="flex gap-2 justify-between">
                <PlantSearchCombobox
                    className="w-[80%]"
                    onChange={(val) => setNewItem(val)}
                    value={newItem ?? ''}
                />
                <Button onClick={addItem}>Add</Button>
            </div>
            <ul className="w-full">
                {items.map((plant, index) => (
                    <li className="flex items-center justify-between rounded-md border p-2 bg-background shadow-sm">
                        <div className="flex items-center gap-2">
                            <Popover>
                                <PopoverTrigger>
                                    <Button variant="ghost" size="icon" className="group">
                                        <Settings className="h-4 w-4 transform transition-transform duration-700 group-hover:rotate-120" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-112">
                                    <ConveyorPlantOptionsContent
                                        plant={plant}
                                        index={index}
                                        items={items}
                                        setPlants={setPlants}
                                    />
                                </PopoverContent>
                            </Popover>
                            <span>{PlantDisplayNames[plant.PlantType]}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(plant)}
                            className="text-muted-foreground hover:text-destructive hover:bg-red-100"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
