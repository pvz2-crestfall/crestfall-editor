import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SortablePlant } from '@/sidepanel/tabs/general/seedbank/sortable-plant';
import { Plants } from '@/lib/plants';
import { levelState } from '@/lib/state';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { PlantSearchCombobox } from '../../../../components/ui/plant-search';

export function PresetPlantList() {
    const { levelBuilder, reloadComponents } = levelState();

    const setPlants = (plants: string[] | ((prev: string[]) => string[])) => {
        const prev = levelBuilder.seedBank.presetPlants;
        const values = typeof plants === 'function' ? plants(prev || []) : plants;

        levelBuilder.seedBank.presetPlants = values;
        reloadComponents();
    };

    const [newItem, setNewItem] = useState('');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        setPlants([...levelBuilder.seedBank.presetPlants, newItem]);
        setNewItem('');
    };

    const removeItem = (id: string) => {
        setPlants(levelBuilder.seedBank.presetPlants.filter((item) => item !== id));
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
                    <SortableContext items={levelBuilder.seedBank.presetPlants} strategy={verticalListSortingStrategy}>
                        <ul className="w-full">
                            {levelBuilder.seedBank.presetPlants.map((id, index) => (
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
