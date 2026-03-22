import { gridState } from '@/lib/state/gridstate';
import { levelState } from '@/lib/state/levelstate';
import { LawnMowerType } from '@/types/PVZTypes';
import { useEffect, useState } from 'react';
import { LawnMowersSelector } from './lawn-mowers-selector';
import { WorldOptions } from './world-options';
import { WorldTypeSelector } from './world-selector';
import { Label } from '@/components/ui/label';

export function WorldInfo() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const reloadBackground = gridState((s) => s.updateGrid);
    const [stageType, setStageType] = useState(levelBuilder.levelProperties.stageType);
    const [mowerType, setMowerType] = useState<string>(levelBuilder.levelProperties.lawnMower ?? 'disabled');

    useEffect(() => {
        levelBuilder.levelProperties.stageType = stageType;
        reloadBackground();
    }, [stageType]);

    useEffect(() => {
        if (mowerType == 'disabled') {
            levelBuilder.levelProperties.lawnMower = undefined;
        } else {
            levelBuilder.levelProperties.lawnMower = mowerType as LawnMowerType;
        }
    }, [mowerType, stageType]);

    return (
        <div className="flex flex-col items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
            <Label className="pb-2">World Properties</Label>

            <WorldTypeSelector value={stageType} onValueChange={setStageType} />
            <LawnMowersSelector value={mowerType} onValueChange={setMowerType} />
            <WorldOptions stageType={stageType} />
        </div>
    );
}
