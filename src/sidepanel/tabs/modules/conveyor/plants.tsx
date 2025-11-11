import { Button } from '@/components/ui/button';
import { PlantSearchCombobox } from '@/components/ui/plant-search';
import { levelState } from '@/lib/state';
import type { ConveyorSeedBankPlantObject } from '@/types/PVZTypes';
import { useEffect, useState } from 'react';
import { PlantDisplayNames } from '@/lib/plants';
import { ConveyorPlantList } from '@/components/conveyor/plant-list';

export function ConveyorPlants() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const [plants, setPlants] = useState(levelBuilder.conveyor.plants);

    useEffect(() => {
        levelBuilder.conveyor.plants = plants;
    }, [plants]);

    const [newItem, setNewItem] = useState('');
    const addItem = () => {
        if (!newItem.trim()) return;
        setPlants([...plants, { PlantType: newItem, Weight: 50 }]);
        setNewItem('');
    };
    const removeItem = (plant: ConveyorSeedBankPlantObject) => {
        setPlants(plants.filter((item) => item.PlantType !== plant.PlantType));
    };

    return (
        <div className="flex flex-col">
            <div className="flex gap-2 justify-between">
                <PlantSearchCombobox className="w-[80%]" onChange={(val) => setNewItem(val)} value={newItem ?? ''} />
                <Button onClick={addItem}>Add</Button>
            </div>
            <ConveyorPlantList
                list={plants}
                displayNames={PlantDisplayNames}
                setPlants={setPlants}
                onRemove={removeItem}
            />
        </div>
    );
}
