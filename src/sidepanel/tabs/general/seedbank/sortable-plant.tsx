import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { GripVertical, Trash2 } from 'lucide-react';

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
            className="flex items-center justify-between rounded-md border p-2 bg-background shadow-sm"
        >
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" {...attributes} {...listeners}>
                    <GripVertical className="h-4 w-4" />
                </Button>
                <span>{displayName ?? id}</span>
            </div>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(id)}
                className="text-muted-foreground hover:text-destructive hover:bg-red-100"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </li>
    );
}
