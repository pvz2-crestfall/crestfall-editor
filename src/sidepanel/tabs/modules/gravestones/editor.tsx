import { Button } from '@/components/ui/button';
import { FloatingWindow } from '@/components/ui/floating-window';
import { useState } from 'react';

export function GravestoneEditor() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex w-full h-full items-center justify-center">
                <Button variant="outline" onClick={() => setOpen(true)}>
                    Open Gravestone Editor
                </Button>
            </div>

            {open && (
                <FloatingWindow
                    title="Gravestone Editor"
                    defaultPosition={{ x: 150, y: 150 }}
                    size={{ width: 360, height: 260 }}
                    onClose={() => setOpen(false)}
                    id="gravestone-editor-window"
                >
                    <GravestoneEditorWindowContent />
                </FloatingWindow>
            )}
        </>
    );
}

function GravestoneEditorWindowContent() {
    return (
        <div className="flex flex-col items-center justify-center">
            <p className="mb-4">Gravestone editor stuff</p>
        </div>
    );
}
