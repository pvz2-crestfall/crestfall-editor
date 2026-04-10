import { Button } from '@/components/ui/button';
import { DeleteButton } from '@/components/ui/delete-button';
import type { SaveEntry } from '@/lib/fileManager';
import { Download } from 'lucide-react';

type Props = {
    saves: SaveEntry[];
    onLoad: (save: SaveEntry) => void;
    onDelete: (index: number) => void;
};

export function SaveList({ saves, onLoad, onDelete }: Props) {
    return (
        <>
            {saves.length === 0 && <p>No Saves.</p>}
            {saves.map((save, index) => (
                <div key={index} className="flex w-full justify-between items-center border rounded-md px-3 py-2">
                    <DeleteButton onClick={() => onDelete(index)} />

                    <span>
                        {index + 1}. {save.name ?? new Date(save.timestamp).toISOString()}
                    </span>

                    <Button size="sm" onClick={() => onLoad(save)}>
                        <Download />
                    </Button>
                </div>
            ))}
        </>
    );
}
