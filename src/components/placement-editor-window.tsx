import { levelState } from '@/lib/state';
import { useState, useEffect } from 'react';
import { FloatingWindow } from './ui/floating-window';
import { createPortal } from 'react-dom';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Label } from './ui/label';
import { PencilLine, Eraser } from 'lucide-react';

export function PlacementEditorWindow({
    onClose,
    onGridClick,
}: {
    onClose: () => void;
    onGridClick: (position: { row: number; col: number }, selectedTool: string) => void;
}) {
    const setGridListener = levelState((s) => s.setGridListener);
    const [selectedTool, setSelectedTool] = useState('none');

    useEffect(() => {
        setGridListener((row, col) => {
            onGridClick({ row, col }, selectedTool);
        });
        return () => {
            setGridListener(undefined);
        };
    }, [selectedTool]);

    return createPortal(
        <FloatingWindow
            title="Placement Editor"
            defaultPosition={{ x: 200, y: 200 }}
            size={{ width: 360, height: 150 }}
            onClose={onClose}
            id="gravestone-waveaction-placement-window"
        >
            <div className="w-full flex flex-col gap-2 justify-between items-center border rounded-md px-4 py-2">
                <ToolSelectionGroup defaultValue={selectedTool} onValueChange={setSelectedTool}></ToolSelectionGroup>
            </div>
        </FloatingWindow>,
        document.body,
    );
}

function ToolSelectionGroup({ ...props }: { defaultValue?: string; onValueChange?: (value: string) => void }) {
    return (
        <>
            <Label>Tool</Label>
            <ToggleGroup type="single" variant="outline" size="sm" {...props}>
                <ToggleGroupItem
                    value="place"
                    aria-label="Toggle place tool"
                    className="data-[state=on]:bg-muted-foreground/20"
                >
                    <PencilLine />
                    Mark
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="remove"
                    aria-label="Toggle remove tool"
                    className="data-[state=on]:bg-muted-foreground/20"
                >
                    <Eraser />
                    Erase
                </ToggleGroupItem>
            </ToggleGroup>
        </>
    );
}
