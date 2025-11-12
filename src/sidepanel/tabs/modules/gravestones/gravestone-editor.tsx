import { GravestoneEditorWindow } from '@/components/grave-editor-window';
import { Button } from '@/components/ui/button';
import { levelState } from '@/lib/state/levelstate';
import { useState } from 'react';

export function GravestoneEditor() {
    const [open, setOpen] = useState(false);

    const levelBuilder = levelState((s) => s.levelBuilder);

    const onGridClick = (position: { row: number; col: number }, selectedTool: string, selectedGrave: string) => {
        console.log(position, selectedTool, selectedGrave);
        if (selectedTool == 'none') return;

        if (selectedTool == 'place') {
            levelBuilder.tileManager.setTile(position, { type: 'gravestone', variant: selectedGrave });
        }

        if (selectedTool == 'remove') {
            levelBuilder.tileManager.removeTile(position, { type: 'gravestone' });
        }
    };

    return (
        <>
            <div className="flex w-full h-full items-center justify-center">
                <Button variant="outline" onClick={() => setOpen(true)}>
                    Open Gravestone Editor
                </Button>
            </div>

            {open && <GravestoneEditorWindow onClose={() => setOpen(false)} onGridClick={onGridClick} />}
        </>
    );
}
