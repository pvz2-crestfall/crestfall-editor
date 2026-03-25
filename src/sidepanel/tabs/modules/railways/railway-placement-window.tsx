import { FloatingWindow } from '@/components/ui/floating-window';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { gridState } from '@/lib/state/gridstate';
import { Eraser, TrainTrack, Cuboid } from 'lucide-react';
import { useEffect, useState } from 'react';

export function RailcartsEditorWindow({
    onClose,
    onGridClick,
}: {
    onClose: () => void;
    onGridClick: (position: { row: number; col: number }, selectedTool: string) => void;
}) {
    const id = 'railcarts-editor-window';
    const addGridListener = gridState((s) => s.addGridListener);
    const removeGridListener = gridState((s) => s.removeGridListener);

    const [selectedTool, setSelectedTool] = useState('rail');

    useEffect(() => {
        addGridListener({
            id,
            onClick: (row, col) => {
                onGridClick({ row, col }, selectedTool);
            },
        });
        return () => {
            removeGridListener(id);
        };
    }, [selectedTool]);

    return (
        <FloatingWindow
            title="Railcarts Editor"
            defaultPosition={{ x: 150, y: 150 }}
            size={{ width: 360, height: 260 }}
            onClose={onClose}
            id={id}
        >
            <div className="h-[90%] grid place-items-center">
                <div className="w-full max-w-xs flex flex-col gap-2 justify-between items-center border rounded-md px-4 py-2">
                    <Label>Selected Tool</Label>
                    <ToggleGroup
                        type="single"
                        variant="outline"
                        size="lg"
                        defaultValue={selectedTool}
                        onValueChange={setSelectedTool}
                    >
                        <ToggleGroupItem
                            value="rail"
                            aria-label="Place rail tool"
                            className="data-[state=on]:bg-muted-foreground/20"
                        >
                            <TrainTrack />
                            Rail
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="cart"
                            aria-label="Place cart tool"
                            className="data-[state=on]:bg-muted-foreground/20"
                        >
                            <Cuboid />
                            Cart
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
                </div>
            </div>
        </FloatingWindow>
    );
}
