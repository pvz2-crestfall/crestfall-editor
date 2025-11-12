import { Label } from '@/components/ui/label';
import { OptionalNumberInput } from '@/components/ui/optional-ninput';
import { useEffect, useState } from 'react';
import type { RaidingPartyZombieSpawnerProps, WaveAction } from '@/lib/levelModules/wavemanager/wavetypes';

export function PirateRaidWaveAction({ waveaction }: { waveaction: WaveAction<RaidingPartyZombieSpawnerProps> }) {
    const [zombieCount, setZombieCount] = useState(waveaction.data.SwashbucklerCount);
    const [groupSize, setGroupSize] = useState(waveaction.data.GroupSize);
    const [timeBetweenGroups, setTimeBetweenGroups] = useState(waveaction.data.TimeBetweenGroups);

    useEffect(() => {
        waveaction.data.SwashbucklerCount = zombieCount;

        if (zombieCount < groupSize) {
            setGroupSize(zombieCount);
        }
    }, [zombieCount]);

    useEffect(() => {
        waveaction.data.GroupSize = groupSize;
        waveaction.data.TimeBetweenGroups = timeBetweenGroups;
    }, [groupSize, timeBetweenGroups]);

    return (
        <div className="flex flex-col w-full items-center justify-center">
            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                <Label>Swash Bucklers Count</Label>
                <OptionalNumberInput
                    placeholder="0"
                    optional={false}
                    min={0}
                    value={zombieCount}
                    onChange={(num) => setZombieCount(Number(num))}
                />
            </div>
            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                <Label>Group Size</Label>
                <OptionalNumberInput
                    placeholder="0"
                    optional={false}
                    min={1}
                    max={zombieCount}
                    value={groupSize}
                    onChange={(num) => setGroupSize(Number(num))}
                />
            </div>
            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                <Label>Time Between Groups</Label>
                <OptionalNumberInput
                    placeholder="0"
                    optional={false}
                    value={timeBetweenGroups}
                    onChange={(num) => setTimeBetweenGroups(Number(num))}
                />
            </div>
        </div>
    );
}
