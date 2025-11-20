import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { GripVertical } from 'lucide-react';
import { DeleteButton } from '@/components/ui/delete-button';
import { iconFromList } from '@/components/ui/asset-icons';
import { PlantImages } from '@/lib/assets';

export function SortablePlant({
    id,
    displayName,
    onRemove,
}: {
    id: string;
    displayName?: string;
    onRemove: (id: string) => void;
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
            className="flex items-center justify-between rounded-md border p-2 bg-primary-foreground shadow-sm"
        >
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" {...attributes} {...listeners}>
                    <GripVertical className="h-4 w-4" />
                </Button>
                <span>{displayName ?? id}</span>
                {iconFromList({ icons: PlantImages, type: id, size: 7 })}
            </div>
            <DeleteButton onClick={() => onRemove(id)} />
        </li>
    );
}
