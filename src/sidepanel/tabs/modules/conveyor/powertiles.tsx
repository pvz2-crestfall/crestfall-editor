import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PlantSearchCombobox } from '@/components/ui/plant-search';
import { Switch } from '@/components/ui/switch';
import { levelState } from '@/lib/state';
import type { ConveyorSeedBankPlantObject } from '@/types/PVZTypes';
import { useState } from 'react';
import { PowerTiles, PowerTilesDisplayNames } from '@/lib/plants';
import { ConveyorPlantList } from '@/components/conveyor/plant-list';

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
                <Switch
                    defaultChecked={enabled}
                    onCheckedChange={setEnabled}
                />
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
                    <ConveyorPlantList
                        list={items}
                        displayNames={PowerTilesDisplayNames}
                        setPlants={setPlants}
                        onRemove={removeItem}
                    />
                </div>
            )}
        </div>
    );
}
