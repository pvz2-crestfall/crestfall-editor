import { ModuleTemplate } from '../template';
import { Button } from '@/components/ui/button';
import { levelState } from '@/lib/state/levelstate';
import { useEffect, useState } from 'react';
import { PowertileEditorWindow } from './powertile-placement-window';
import { Label } from '@/components/ui/label';
import { TileType } from '@/lib/levelModules/tilemanager/types';
import { Input } from '@/components/ui/input';

export function PowertilesModule() {
    const levelBuilder = levelState((s) => s.levelBuilder);

    const [isWindowOpen, setWindowOpen] = useState(false);
    const [propDelay, setPropDelay] = useState(levelBuilder.tileManager.powertilePropagationDelay);

    const onGridClick = (position: { row: number; col: number }, selectedTool: string, selectedTile: string) => {
        if (selectedTool == 'place') {
            console.log(selectedTile);
            levelBuilder.tileManager.setTile(position, { type: TileType.FloorTile, param1: selectedTile });
        }

        if (selectedTool == 'remove') {
            levelBuilder.tileManager.removeTile(position, { type: TileType.FloorTile });
        }
    };

    useEffect(() => {
        levelBuilder.tileManager.powertilePropagationDelay = propDelay;
    }, [propDelay]);

    return (
        <ModuleTemplate title="Powertiles Module">
            <div className="flex flex-row w-full items-center justify-between border rounded-md px-4 py-2 gap-2">
                <Label>Propagation Delay</Label>
                <Input
                    type="number"
                    defaultValue={propDelay}
                    className="text-center w-20 font-mono align-left"
                    size={5}
                    step={0.1}
                    onChange={(e) => setPropDelay(Number(e.target.value))}
                />
            </div>
            <div className="flex flex-row w-full items-center justify-between border rounded-md px-4 py-2 gap-2">
                <Label>Placement Editor</Label>

                <Button variant="outline" onClick={() => setWindowOpen(true)}>
                    Open Editor
                </Button>

                {isWindowOpen && (
                    <PowertileEditorWindow onClose={() => setWindowOpen(false)} onGridClick={onGridClick} />
                )}
            </div>
        </ModuleTemplate>
    );
}
