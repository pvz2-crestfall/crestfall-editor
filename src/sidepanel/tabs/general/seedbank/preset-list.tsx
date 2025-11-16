import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SortablePlant } from '@/sidepanel/tabs/general/seedbank/sortable-plant';
import { Plants } from '@/lib/plants';
import { levelState } from '@/lib/state/levelstate';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { PlantSearchCombobox } from '../../../../components/ui/plant-search';

export function PresetPlantList() {
    const levelBuilder = levelState((s) => s.levelBuilder);

    const [presetPlants, setPlants] = useState(levelBuilder.seedBank.presetPlants);

    useEffect(() => {
        levelBuilder.seedBank.presetPlants = presetPlants;
    }, [presetPlants]);

    const [newItem, setNewItem] = useState('');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setPlants((prev) => {
                const oldIndex = prev.indexOf(active.id);
                const newIndex = prev.indexOf(over.id);

                return arrayMove(prev, oldIndex, newIndex);
            });
        }
    };

    const addItem = () => {
        if (!newItem.trim()) return;
        setPlants([...presetPlants, newItem]);
        setNewItem('');
    };

    const removeItem = (id: string) => {
        setPlants(presetPlants.filter((item) => item !== id));
    };

    return (
        <div className="py-1 px-2 space-y-2">
            <Label className="item-center justify-center">Preset Plants</Label>
            <div className="flex gap-2 justify-centered">
                {/* <Input placeholder="New Plant..." value={newItem} onChange={(e) => setNewItem(e.target.value)} /> */}
                <PlantSearchCombobox onChange={(val) => setNewItem(val)} value={newItem ?? ''} />
                <Button onClick={addItem}>Add</Button>
            </div>

            <div className="flex">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={presetPlants} strategy={verticalListSortingStrategy}>
                        <ul className="w-full">
                            {presetPlants.map((id, index) => (
                                <SortablePlant
                                    key={id + index}
                                    id={id}
                                    onRemove={removeItem}
                                    displayName={Plants.find((x) => x.codename == id)?.displayName}
                                />
                            ))}
                        </ul>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
}
