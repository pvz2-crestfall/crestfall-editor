import { levelState } from '@/lib/state/levelstate';
import { animationDuration } from './waves';
import { ChevronsLeft, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Actions } from './actions/actions';
import { DeleteButton } from '@/components/ui/delete-button';
import { CSS } from '@dnd-kit/utilities';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { WaveAction } from '@/lib/levelModules/wavemanager/types';
import type { WaveListType } from '@/lib/levelModules/wavemanager/wavemanager';

export function WaveList({
    waveIndex,
    setIndex,
}: {
    waveIndex: number | null;
    setIndex: (index: number | null) => void;
}) {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const [waves, _setWaves] = useState(levelBuilder.waveManager.waves);
    const [removingIndex, setRemovingIndex] = useState<number | null>(null);

    const setWaves = (newWaves: WaveListType) => {
        levelBuilder.waveManager.waves = newWaves;
        _setWaves(newWaves);
    };

    const addNewWave = () => {
        const defaultWaveType = 'SpawnZombiesJitteredWaveActionProps';
        const defaultWave = {
            id: crypto.randomUUID(),
            actions: [
                {
                    name: 'NewWave' + (waves.length + 1).toString(),
                    type: defaultWaveType,
                    data: structuredClone(Actions[defaultWaveType]?.defaultData ?? {}),
                },
            ],
        };
        setWaves([...waves, defaultWave]);
    };

    const removeWave = (index: number) => {
        setRemovingIndex(index);
        setTimeout(() => {
            const newWaves = [...waves];
            newWaves.splice(index, 1);
            setWaves(newWaves);
            setRemovingIndex(null);
        }, 300); // match the CSS animation duration
    };

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = waves.findIndex((wave) => wave.id === active.id);
        const newIndex = waves.findIndex((wave) => wave.id === over.id);

        const newWaves = arrayMove(waves, oldIndex, newIndex);
        setWaves(newWaves);
    };

    return (
        <div
            className={cn(
                `w-full min-h-120 shrink-0 transition-opacity ease-out duration-${animationDuration}`,
                waveIndex == null ? 'opacity-100' : 'opacity-0',
            )}
        >
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={waves.map((wave) => wave.id)} strategy={verticalListSortingStrategy}>
                    <ul className="w-full">
                        {waves.map((wave, index) => (
                            <SortableWaveItem
                                key={wave.id}
                                id={wave.id}
                                index={index}
                                actions={wave.actions}
                                removingIndex={removingIndex}
                                setIndex={setIndex}
                                removeWave={removeWave}
                            />
                        ))}

                        {/* Add button */}
                        <li
                            key="+"
                            onClick={addNewWave}
                            className={cn(
                                'flex items-center justify-between rounded-md border p-2 shadow-sm',
                                'hover:bg-primary/10 transition-colors duration-300',
                            )}
                        >
                            <div className="w-full h-8 flex items-center justify-center gap-2">
                                <Label>New Wave</Label>
                            </div>
                        </li>
                    </ul>
                </SortableContext>
            </DndContext>
        </div>
    );
}

function SortableWaveItem({
    id,
    index,
    actions,
    removingIndex,
    setIndex,
    removeWave,
}: {
    id: string;
    index: number;
    actions: WaveAction[];
    removingIndex: number | null;
    setIndex: (index: number) => void;
    removeWave: (index: number) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={cn(
                'flex items-center justify-between rounded-md border p-2',
                removingIndex === index
                    ? 'transition-all duration-300 ease-out opacity-0 translate-x-4 scale-95 max-h-0 py-0 mb-0'
                    : 'opacity-100 max-h-20',
            )}
        >
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setIndex(index)}>
                    <ChevronsLeft className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex items-center">
                <span>Wave {index + 1}</span>
                {/* drag handle */}
                <Button variant="ghost" size="icon" {...listeners} className="cursor-grab active:cursor-grabbing">
                    <GripVertical className="h-4 w-4" />
                </Button>
                <span>Actions {actions.length}</span>
            </div>

            <DeleteButton onClick={() => removeWave(index)} />
        </li>
    );
}
