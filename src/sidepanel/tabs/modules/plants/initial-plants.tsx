import { PlacementEditorWindow } from '@/components/placement-editor-window';
import { PlantSelector } from '@/components/plant-selector';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { TileType } from '@/lib/levelModules/tilemanager/types';
import { gridState } from '@/lib/state/gridstate';
import { levelState } from '@/lib/state/levelstate';
import { TriangleAlert, Snowflake } from 'lucide-react';
import { useState } from 'react';

export function InitialPlantPlacements() {
    return (
        <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
            <Label>Initial Plants</Label>
            <InitialPlantsEditor />
        </div>
    );
}

function InitialPlantsEditor() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const updateGrid = gridState((s) => s.updateGrid);

    const [editorWindowOpen, setEditorWindowOpen] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState('peashooter');
    const [plantCondition, setPlantCondition] = useState<string | undefined>();

    const onGridClick = (position: { row: number; col: number }, selectedTool: string) => {
        if (selectedTool == 'place') {
            levelBuilder.tileManager.setTile(position, {
                type: TileType.Plant,
                param1: selectedPlant,
                param2: plantCondition ? plantCondition : undefined,
            });
            updateGrid();
        }

        if (selectedTool == 'remove') {
            levelBuilder.tileManager.removeTile(position, { type: TileType.Plant });
            updateGrid();
        }
    };

    return (
        <>
            <Button variant="outline" onClick={() => setEditorWindowOpen(true)}>
                Open Editor
            </Button>

            {editorWindowOpen && (
                <PlacementEditorWindow
                    title="Plant Placement Editor"
                    id="plants-editor-window"
                    size={{ width: 350, height: 275 }}
                    onClose={() => setEditorWindowOpen(false)}
                    onGridClick={onGridClick}
                >
                    <div className="flex flex-col items-center justify-center ">
                        <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                            <Label>Selected Plant</Label>
                            <PlantSelector className="z-9999" plantType={selectedPlant} onSelect={setSelectedPlant} />
                        </div>
                        <div className="w-full flex flex-col gap-2 justify-between items-center border rounded-md px-4 py-2">
                            <PlantPropertiesGroup defaultValue={plantCondition} onValueChange={setPlantCondition} />
                        </div>
                    </div>
                </PlacementEditorWindow>
            )}
        </>
    );
}

function PlantPropertiesGroup({
    ...props
}: {
    defaultValue?: string;
    onValueChange?: (value: string | undefined) => void;
}) {
    return (
        <>
            <Label>Condition</Label>
            <ToggleGroup type="single" variant="outline" size="sm" {...props}>
                <ToggleGroupItem
                    value="endangered"
                    aria-label="Toggle icecubed condition"
                    className="data-[state=on]:bg-muted-foreground/20"
                >
                    <TriangleAlert />
                    Endangered
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="icecubed"
                    aria-label="Toggle endangered condition"
                    className="data-[state=on]:bg-muted-foreground/20"
                >
                    <Snowflake />
                    Frozen
                </ToggleGroupItem>
            </ToggleGroup>
        </>
    );
}
