import { PlacementEditorWindow } from '@/components/placement-editor-window';
import { Button } from '@/components/ui/button';
import { gridState } from '@/lib/state/gridstate';
import { levelState } from '@/lib/state/levelstate';
import { useState } from 'react';

export function MoldEditor() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const updateGrid = gridState((s) => s.updateGrid);

    const [editorWindowOpen, setEditorWindowOpen] = useState(false);

    const setMoldLocations = (arr: any[]) => {
        levelBuilder.challengeManager.moldLocations = arr;
    };

    const addNewPosition = (position: { col: number; row: number }) => {
        setMoldLocations([...levelBuilder.challengeManager.moldLocations, position]);
    };
    const removePosition = ({ col, row }: { col: number; row: number }) => {
        setMoldLocations(
            levelBuilder.challengeManager.moldLocations.filter((tile) => tile.col != col || tile.row != row),
        );
        updateGrid();
    };

    const onGridClick = (position: { row: number; col: number }, selectedTool: string) => {
        console.log(position, selectedTool);
        if (selectedTool == 'none') return;

        if (selectedTool == 'place') {
            addNewPosition(position);
        }

        if (selectedTool == 'remove') {
            removePosition(position);
            // updateGrid();
        }
    };

    return (
        <>
            <div className="flex w-full h-full items-center justify-center">
                <Button variant="outline" onClick={() => setEditorWindowOpen(true)}>
                    Open Mold Editor
                </Button>
            </div>

            {editorWindowOpen && (
                <PlacementEditorWindow
                    title="Mold Location Editor"
                    id="mold-editor-window"
                    onClose={() => setEditorWindowOpen(false)}
                    onGridClick={onGridClick}
                    // onFocus={updateGrid}
                ></PlacementEditorWindow>
            )}
        </>
    );
}
