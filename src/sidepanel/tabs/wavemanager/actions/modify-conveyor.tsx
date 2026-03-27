import { AddPlantButton } from '@/components/conveyor/add-plant-button';
import { ConveyorPlantList } from '@/components/conveyor/plant-list';
import type {
    ModifyConveyorWaveActionPlant as ModifyConveyorPlant,
    ModifyConveyorWaveActionProps,
    WaveAction,
} from '@/lib/levelModules/wavemanager/types';
import { PlantDisplayNames } from '@/lib/plants';
import { fromRTID, RTIDTypes, toRTID } from '@/lib/utils';
import type { ConveyorSeedBankPlantObject } from '@/types/PVZTypes';
import { useState } from 'react';

export function ModifyConveyorAction({ waveaction }: { waveaction: WaveAction<ModifyConveyorWaveActionProps> }) {
    return (
        <div className="flex flex-col gap-2">
            <PlantsToAdd waveaction={waveaction} />
            <PlantsToRemove waveaction={waveaction} />
        </div>
    );
}

function PlantsToAdd({ waveaction }: { waveaction: WaveAction<ModifyConveyorWaveActionProps> }) {
    const [addList, setAddList] = useState(
        waveaction.data.Add.map((plant) => {
            return { ...plant, PlantType: fromRTID(plant.Type).name } as ConveyorSeedBankPlantObject;
        }),
    );

    const setPlants = (plants: ConveyorSeedBankPlantObject[]) => {
        let newPlants = plants.map((plant) => {
            let newPlant: ModifyConveyorPlant = {
                Type: toRTID(plant.PlantType, RTIDTypes.plant),
            };

            newPlant.MaxCount = plant.MaxCount;
            newPlant.MaxWeightFactor = plant.MaxWeightFactor;
            newPlant.Weight = plant.Weight;
            newPlant.MaxCountCooldownSeconds = plant.MaxCountCooldownSeconds;
            newPlant.MinWeightFactor = plant.MinWeightFactor;
            newPlant.MaxDelivered = plant.MaxDelivered;
            newPlant.MinCount = plant.MinCount;
            newPlant.ForceBoosted = plant.ForceBoosted;
            newPlant.Level = plant.Level;

            return newPlant;
        });

        waveaction.data.Add = newPlants;
        setAddList(plants);
    };

    const addItem = (plant: string) => {
        setPlants([...addList, { PlantType: plant, Weight: 50 }]);
    };
    const removeItem = (plant: ConveyorSeedBankPlantObject) => {
        setPlants(addList.filter((item) => item.PlantType !== plant.PlantType));
    };

    return (
        <div className="flex flex-col border rounded-md p-2 gap-2 shadow-sm">
            <ConveyorPlantList
                collapsible
                collapsibleLabel="Plants To Add"
                list={addList}
                displayNames={PlantDisplayNames}
                setPlants={setPlants}
                onRemove={removeItem}
            >
                <AddPlantButton onSelect={addItem} />
            </ConveyorPlantList>
        </div>
    );
}

function PlantsToRemove({ waveaction }: { waveaction: WaveAction<ModifyConveyorWaveActionProps> }) {
    const [removeList, setRemoveList] = useState(
        waveaction.data.Remove.map((plant) => {
            return { PlantType: fromRTID(plant.Type).name } as ConveyorSeedBankPlantObject;
        }),
    );

    const setPlants = (plants: ConveyorSeedBankPlantObject[]) => {
        let newPlants = plants.map((plant) => {
            return { Type: toRTID(plant.PlantType, RTIDTypes.plant) } as ModifyConveyorPlant;
        });

        waveaction.data.Remove = newPlants;
        setRemoveList(plants);
    };

    const addItem = (plant: string) => {
        setPlants([...removeList, { PlantType: plant }]);
    };
    const removeItem = (plant: ConveyorSeedBankPlantObject) => {
        setPlants(removeList.filter((item) => item.PlantType !== plant.PlantType));
    };

    return (
        <div className="flex flex-col border rounded-md p-2 gap-2 shadow-sm">
            <ConveyorPlantList
                disableSettings
                collapsible
                collapsibleLabel="Plants To Remove"
                list={removeList}
                displayNames={PlantDisplayNames}
                setPlants={setPlants}
                onRemove={removeItem}
            >
                <AddPlantButton onSelect={addItem} />
            </ConveyorPlantList>
        </div>
    );
}
