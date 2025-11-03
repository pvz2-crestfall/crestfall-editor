import { Button } from '@/components/ui/button';
import { PlantSearchCombobox } from '@/components/ui/plant-search';
import { levelState } from '@/lib/state';
import type { ConveyorSeedBankPlantObject } from '@/types/PVZTypes';
import { useState } from 'react';
import { PlantDisplayNames } from '@/lib/plants';
import { ConveyorPlantList } from '@/components/conveyor/plant-list';

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
                <PlantSearchCombobox className="w-[80%]" onChange={(val) => setNewItem(val)} value={newItem ?? ''} />
                <Button onClick={addItem}>Add</Button>
            </div>
            <ConveyorPlantList
                list={items}
                displayNames={PlantDisplayNames}
                setPlants={setPlants}
                onRemove={removeItem}
            />
        </div>
    );
}
