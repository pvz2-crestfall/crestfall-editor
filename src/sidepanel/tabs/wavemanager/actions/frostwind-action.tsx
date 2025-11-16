import { Button } from '@/components/ui/button';
import { DeleteButton } from '@/components/ui/delete-button';
import { Label } from '@/components/ui/label';
import { OptionalNumberInput } from '@/components/ui/optional-ninput';
import type { FrostWindWaveActionProps, WaveAction, WindObject } from '@/lib/levelModules/wavemanager/wavetypes';
import { cn } from '@/lib/utils';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { useEffect, useState } from 'react';

let currentId = 1;
const windIdMap = new WeakMap();
export const getWindId = (action: WindObject) => {
    if (windIdMap.has(action)) {
        return windIdMap.get(action);
    } else {
        const newId = `wind-${currentId++}`;
        windIdMap.set(action, newId);
        return newId;
    }
};

export function FrostwindWaveAction({ waveaction }: { waveaction: WaveAction<FrostWindWaveActionProps> }) {
    const [winds, setWinds] = useState(waveaction.data.Winds);

    useEffect(() => {
        waveaction.data.Winds = winds;
    }, [winds]);

    const removeWind = (id: string) => {
        setWinds((prev) => prev.filter((w) => getWindId(w) == id));
    };
    const addNewWind = () => {
        const newWind: WindObject = structuredClone({ Direction: 'right', Row: 0 });
        setWinds((prev) => [...prev, newWind]);
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setWinds((prev) => {
                const oldIndex = prev.findIndex((w) => getWindId(w) == active.id);
                const newIndex = prev.findIndex((w) => getWindId(w) == over.id);
                return arrayMove(prev, oldIndex, newIndex);
            });
        }
    };

    return (
        <div className="flex flex-col w-full items-center justify-center gap-2">
            <ul className="w-full px-4 py-2 border rounded-md">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={winds.map((w) => getWindId(w))} strategy={verticalListSortingStrategy}>
                        {winds.map((wind) => {
                            const id = getWindId(wind);
                            return <SortableWind key={id} id={id} onRemove={removeWind} wind={wind} />;
                        })}
                    </SortableContext>
                </DndContext>
                <li
                    key="+"
                    className={cn(
                        'flex items-center justify-between rounded-md border p-2 shadow-sm',
                        'hover:bg-primary-foreground transition-colors duration-300',
                    )}
                    onClick={() => addNewWind()}
                >
                    <div className="w-full h-8 flex items-center justify-center gap-2">
                        <Label>Add Wind</Label>
                    </div>
                </li>
            </ul>
        </div>
    );
}

function SortableWind({ id, onRemove, wind }: { id: string; onRemove: (id: string) => void; wind: WindObject }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [row, setRow] = useState(wind.Row + 1);

    useEffect(() => {
        wind.Row = row - 1;
    }, [row]);

    return (
        <li
            ref={setNodeRef}
            style={style}
            className="flex items-center justify-between rounded-md border p-2 bg-primary-foreground shadow-sm"
        >
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" {...attributes} {...listeners}>
                    <GripVertical className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex flex-row gap-5">
                <Label>Wind Row</Label>
                <OptionalNumberInput
                    className="w-18"
                    optional={false}
                    value={row}
                    min={1}
                    max={5}
                    placeholder="Row"
                    onChange={(val) => setRow(Number(val))}
                />
            </div>
            <DeleteButton onClick={() => onRemove(id)} />
        </li>
    );
}
