import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { PiratePlankRows } from '@/lib/levelModules/pirateplanks';
import { gridState } from '@/lib/state/gridstate';
import { levelState } from '@/lib/state/levelstate';
import { StageModuleType } from '@/types/PVZTypes';
import { useEffect, useState } from 'react';

export function WorldOptions({ stageType }: { stageType: StageModuleType }) {
    let content = null;

    if (stageType == StageModuleType.Pirate) {
        content = PirateSeaOptions();
    }

    if (content == null) return null;

    return (
        <div className="flex flex-col w-full justify-center items-center mt-4">
            <Label className="mb-2">World Options</Label>
            <div className="flex items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
                {content}
            </div>
        </div>
    );
}

function PirateSeaOptions() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const reloadBackground = gridState((s) => s.updateGrid);

    const [plankRows, setPlankRows] = useState(levelBuilder.piratePlanks.rows);

    useEffect(() => {
        levelBuilder.piratePlanks.rows = plankRows;

        // check if all the pirate rows are turned off, and if so then disable it
        if (plankRows.filter((x) => x).length == 0) {
            levelBuilder.piratePlanks.enabled = false;
        } else {
            levelBuilder.piratePlanks.enabled = true;
        }

        reloadBackground();
    }, [plankRows]);

    const setRow = (index: number, value: boolean) => {
        setPlankRows((prev) => {
            const updated = [...prev] as PiratePlankRows;
            updated[index] = value;
            return updated;
        });
    };

    return (
        <div className="flex flex-col w-full items-center justify-between">
            <Label className="pb-2">Pirate Blanks</Label>

            {plankRows.map((row, index) => {
                return (
                    <div
                        key={'pirate-plant-toggle-' + index.toString()}
                        className="flex items-center w-full justify-between border rounded-md px-4 py-2"
                    >
                        <Label className="py-1">Plank Row {index + 1}</Label>
                        <Switch defaultChecked={row} onCheckedChange={(val) => setRow(index, val)} />
                    </div>
                );
            })}
        </div>
    );
}
