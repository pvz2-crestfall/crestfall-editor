import { PowertileSelector } from '@/components/powertile-selector';
import { FloatingWindow } from '@/components/ui/floating-window';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { gridState } from '@/lib/state/gridstate';
import { Eraser, PencilOff, PencilLine } from 'lucide-react';
import { useEffect, useState } from 'react';

export function PowertileEditorWindow({
    onClose,
    onGridClick,
}: {
    onClose: () => void;
    onGridClick: (position: { row: number; col: number }, selectedTool: string, selectedTile: string) => void;
}) {
    const id = 'powertile-editor-window';
    const addGridListener = gridState((s) => s.addGridListener);
    const removeGridListener = gridState((s) => s.removeGridListener);

    const [selectedTool, setSelectedTool] = useState('none');
    const [selectedTile, setSelectedTile] = useState('powertile_alpha');

    useEffect(() => {
        addGridListener({
            id,
            onClick: (row, col) => {
                onGridClick({ row, col }, selectedTool, selectedTile);
            },
        });
        return () => {
            removeGridListener(id);
        };
    }, [selectedTool, selectedTile]);

    return (
        <FloatingWindow
            title="Powertile Editor"
            defaultPosition={{ x: 150, y: 150 }}
            size={{ width: 360, height: 260 }}
            onClose={onClose}
            id={id}
        >
            <div className="h-[90%] grid place-items-center">
                <div className="w-full flex flex-row justify-between items-center border rounded-md px-4 py-2">
                    <Label>Powertile</Label>
                    <PowertileSelector defaultValue={selectedTile} onValueChange={setSelectedTile} />
                </div>
                <div className="w-full flex flex-col gap-2 justify-between items-center border rounded-md px-4 py-2">
                    <ToolSelectionGroup
                        defaultValue={selectedTool}
                        onValueChange={setSelectedTool}
                    ></ToolSelectionGroup>
                </div>
            </div>
        </FloatingWindow>
    );
}

function ToolSelectionGroup({ ...props }: { defaultValue?: string; onValueChange?: (value: string) => void }) {
    return (
        <>
            <Label>Tool</Label>
            <ToggleGroup type="single" variant="outline" size="sm" {...props}>
                <ToggleGroupItem
                    value="none"
                    aria-label="Toggle none tool"
                    className="data-[state=on]:bg-muted-foreground/20"
                >
                    <PencilOff />
                    None
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="place"
                    aria-label="Toggle place tool"
                    className="data-[state=on]:bg-muted-foreground/20"
                >
                    <PencilLine />
                    Place
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="remove"
                    aria-label="Toggle remove tool"
                    className="data-[state=on]:bg-muted-foreground/20"
                >
                    <Eraser />
                    Remove
                </ToggleGroupItem>
            </ToggleGroup>
        </>
    );
}
