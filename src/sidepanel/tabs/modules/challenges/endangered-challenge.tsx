import { PlacementEditorWindow } from '@/components/placement-editor-window';
import { PlantSelector } from '@/components/plant-selector';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { gridState } from '@/lib/state/gridstate';
import { levelState } from '@/lib/state/levelstate';
import { useState } from 'react';

export function EndangeredChallenge() {
    return (
        <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
            <Label>Endangered Plants</Label>
            <EndangeredPlantsEditor />
        </div>
    );
}

function EndangeredPlantsEditor() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const updateGrid = gridState((s) => s.updateGrid);

    const [editorWindowOpen, setEditorWindowOpen] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState('peashooter');

    const setPlants = (arr: { row: number; col: number; name: string }[]) => {
        levelBuilder.challengeManager.endangeredPlants = arr;
    };

    const addNewPosition = (position: { col: number; row: number }, plant: string) => {
        setPlants([...levelBuilder.challengeManager.endangeredPlants, { ...position, name: plant }]);
    };

    const removePosition = ({ col, row }: { col: number; row: number }) => {
        setPlants(levelBuilder.challengeManager.endangeredPlants.filter((tile) => tile.col != col || tile.row != row));
        updateGrid();
    };

    const onGridClick = (position: { row: number; col: number }, selectedTool: string) => {
        console.log(position, selectedTool, selectedPlant);
        if (selectedTool == 'none') return;

        if (selectedTool == 'place') {
            addNewPosition(position, selectedPlant);
        }

        if (selectedTool == 'remove') {
            removePosition(position);
            // updateGrid();
        }
    };

    return (
        <>
            <Button variant="outline" onClick={() => setEditorWindowOpen(true)}>
                Open Editor
            </Button>

            {editorWindowOpen && (
                <PlacementEditorWindow
                    title="Endangered Plants Editor"
                    id="endangered-editor-window"
                    size={{ width: 350, height: 250 }}
                    onClose={() => setEditorWindowOpen(false)}
                    onGridClick={onGridClick}
                    // onFocus={updateGrid}
                >
                    <div className="flex w-full items-center justify-between border rounded-md px-4 py-2 mb-10">
                        <Label>Selected Plant</Label>
                        <PlantSelector className="z-9999" plantType={selectedPlant} onSelect={setSelectedPlant} />
                    </div>
                </PlacementEditorWindow>
            )}
        </>
    );
}
