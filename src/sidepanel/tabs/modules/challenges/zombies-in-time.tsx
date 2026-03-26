import { Label } from '@/components/ui/label';
import { OptionalNumberInput } from '@/components/ui/optional-ninput';
import { levelState } from '@/lib/state/levelstate';
import { useEffect, useState } from 'react';

export function BeatZombiesInTimeChallenge() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const [zombies, setZombies] = useState(levelBuilder.challengeManager.beatZombiesInTime?.zombies);
    const [time, setTime] = useState(levelBuilder.challengeManager.beatZombiesInTime?.time);

    useEffect(() => {
        if (zombies == undefined && time == undefined) {
            levelBuilder.challengeManager.beatZombiesInTime = undefined;
            return;
        }

        levelBuilder.challengeManager.beatZombiesInTime = {
            zombies: zombies ?? 0,
            time: time ?? 0,
        };
    }, [zombies, time]);

    return (
        <div className="w-full py-2 items-center justify-between flex flex-col">
            <div className="flex flex-row w-full items-center justify-between border rounded-md px-4 py-2 gap-2">
                <Label>
                    Beat
                    <OptionalNumberInput className="w-12" placeholder="" value={zombies} onChange={setZombies} />
                    Zombies
                </Label>
                <Label>
                    in
                    <OptionalNumberInput className="w-12" placeholder="" value={time} onChange={setTime} />
                    Seconds
                </Label>
            </div>
        </div>
    );
}
