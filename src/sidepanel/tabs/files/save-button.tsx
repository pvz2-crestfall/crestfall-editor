import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { levelState } from '@/lib/state/levelstate';
import type { SaveEntry } from '@/lib/fileManager';

export function FileSaveButton({ onSave }: { onSave?: () => void }) {
    const [name, setName] = useState('');
    const levelBuilder = levelState((s) => s.levelBuilder);

    const handleSave = () => {
        if (!levelBuilder) return;

        const newSave: SaveEntry = {
            timestamp: new Date().toISOString(),
            name: name || 'Untitled Save',
            objects: levelBuilder.build(),
        };

        const raw = localStorage.getItem('manual-saves');
        let saves: SaveEntry[] = [];

        try {
            if (raw) saves = JSON.parse(raw);
        } catch {
            console.warn('Invalid manual saves');
        }

        saves.push(newSave);

        localStorage.setItem('manual-saves', JSON.stringify(saves));

        setName('');
        console.log('Manual save created:', newSave);

        onSave?.();
    };

    return (
        <div className="flex flex-col gap-2 w-full border rounded-md px-4 py-2">
            <div className="flex gap-2">
                <Input placeholder="Save name (optional)" value={name} onChange={(e) => setName(e.target.value)} />

                <Button onClick={handleSave}>Save</Button>
            </div>
        </div>
    );
}
