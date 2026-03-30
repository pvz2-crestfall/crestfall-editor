import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { levelState } from '@/lib/state/levelstate';
import { useEffect, useState } from 'react';

export function CowboyMinigame() {
    const levelBuilder = levelState((s) => s.levelBuilder);

    const [enabled, setEnabled] = useState(levelBuilder.minigameManager.cowboy.enabled);
    const [isTutorial, setTutorial] = useState(levelBuilder.minigameManager.cowboy.isTutorial);
    const [startingText, setStartingText] = useState(levelBuilder.minigameManager.cowboy.startString);

    useEffect(() => {
        levelBuilder.minigameManager.cowboy.enabled = enabled;
        levelBuilder.minigameManager.cowboy.isTutorial = isTutorial;
        levelBuilder.minigameManager.cowboy.startString = startingText;
        levelBuilder.conveyor.objdata.ManualPacketSpawning = enabled || undefined;
    }, [enabled, isTutorial, startingText]);

    return (
        <>
            <div className="flex items-center justify-center border rounded-md px-4 py-2">
                <Label className="px-4 py-1">Enable Cowboy Minigame</Label>
                <Switch defaultChecked={enabled} onCheckedChange={setEnabled}></Switch>
            </div>
            {enabled && (
                <>
                    <div className="flex items-center justify-center border rounded-md px-4 py-2">
                        <Label className="px-4 py-1">Enable Tutorial</Label>
                        <Switch defaultChecked={isTutorial} onCheckedChange={setTutorial}></Switch>
                    </div>
                    <div className="flex flex-col w-full items-center justify-between border rounded-md px-4 py-2 gap-2">
                        <Label>Stage start text</Label>
                        <Input
                            className="text-center"
                            value={startingText}
                            placeholder="Text"
                            onChange={(e) => {
                                setStartingText(e.target.value);
                            }}
                        />
                    </div>
                </>
            )}
        </>
    );
}
