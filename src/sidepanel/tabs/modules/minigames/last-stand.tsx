import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { levelState } from '@/lib/state/levelstate';
import { useEffect, useState } from 'react';

export function LastStandMinigame() {
    const levelBuilder = levelState((s) => s.levelBuilder);

    const [enabled, setEnabled] = useState(levelBuilder.minigameManager.lastStandEnabled);
    const [startingSun, setSun] = useState(levelBuilder.minigameManager.lastStand.StartingSun);
    const [startingPf, setPf] = useState(levelBuilder.minigameManager.lastStand.StartingPlantfood);
    // const [rift, setRift] = useState(levelBuilder.minigameManager.lastStand.PreSeedchooserFlow);

    useEffect(() => {
        levelBuilder.minigameManager.lastStand = {
            StartingSun: startingSun,
            StartingPlantfood: startingPf,
            // PreSeedchooserFlow: rift,
        };
        levelBuilder.minigameManager.lastStandEnabled = enabled;
    }, [enabled, startingSun, startingPf]);

    return (
        <>
            <div className="flex items-center justify-center border rounded-md px-4 py-2">
                <Label className="px-4 py-1">Enable Last Stand</Label>
                <Switch defaultChecked={enabled} onCheckedChange={setEnabled}></Switch>
            </div>
            {enabled && (
                <>
                    <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                        <Label>Starting Sun</Label>
                        <Input
                            type="number"
                            placeholder="1000"
                            defaultValue={startingSun}
                            className="text-center w-20 font-mono align-left"
                            size={5}
                            onChange={(e) => setSun(Number(e.target.value))}
                        />
                    </div>
                    <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                        <Label>Starting Plant food</Label>
                        <Input
                            type="number"
                            placeholder="0"
                            defaultValue={startingPf}
                            className="text-center w-20 font-mono align-left"
                            size={5}
                            onChange={(e) => setPf(Number(e.target.value))}
                        />
                    </div>
                </>
            )}
        </>
    );
}
