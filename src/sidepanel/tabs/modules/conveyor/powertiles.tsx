import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PlantSearchCombobox } from '@/components/ui/plant-search';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { levelState } from '@/lib/state';
import type { ConveyorSeedBankPlantObject } from '@/types/PVZTypes';
import { useState } from 'react';
import { ConveyorPlantOptionsContent } from './plant-options';
import { Settings, Trash2 } from 'lucide-react';
import { PowerTiles, PowerTilesDisplayNames } from '@/lib/plants';

export function ConveyorPowerTiles() {
    const { levelBuilder } = levelState();
    const [enabled, _setEnabled] = useState(levelBuilder.conveyor.enablePowerTiles);

    const setEnabled = (val: boolean) => {
        levelBuilder.conveyor.enablePowerTiles = val;
        _setEnabled(val);
    };

    const [items, setItems] = useState(levelBuilder.conveyor.powertiles);

    const setPlants = (powertiles: ConveyorSeedBankPlantObject[]) => {
        levelBuilder.conveyor.powertiles = powertiles;
        setItems(powertiles);
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
        <div>
            <div className="flex items-center justify-between border rounded-md px-4 py-2">
                <Label className="px-4 py-1">Enable Power Tiles</Label>
                <Switch defaultChecked={enabled} onCheckedChange={setEnabled} className="data-[state=checked]:bg-blue-500" />
            </div>

            {enabled && (
                <div className="py-2">
                    <div className="flex gap-2 justify-centered">
                        <PlantSearchCombobox
                            list={PowerTiles}
                            className="w-[80%]"
                            onChange={(val) => setNewItem(val)}
                            value={newItem ?? ''}
                        />
                        <Button onClick={addItem}>Add</Button>
                    </div>
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
                                <span>{PowerTilesDisplayNames[plant.PlantType]}</span>
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
                </div>
            )}
        </div>
    );
}
