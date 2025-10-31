import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OptionalNumberInput } from '@/components/ui/optional-ninput';
import { levelState } from '@/lib/state';

export function WaveManagerSettings() {
    const { levelBuilder } = levelState();

    return (
        <div className="flex flex-col gap-2 items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
            <Label>Settings</Label>
            <div className="gap-1 w-[320px]">
                <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                    <Label>Wave Count</Label>
                    <Input
                        type="number"
                        placeholder="Default"
                        defaultValue={levelBuilder.waveManager.flagInterval || ''}
                        className="text-center w-auto font-mono align-left"
                        size={5}
                        onChange={(e) => (levelBuilder.waveManager.waveCount = Number(e.target.value))}
                    />
                </div>
                <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                    <Label>Flag Interval</Label>
                    <Input
                        type="number"
                        placeholder="Default"
                        defaultValue={levelBuilder.waveManager.flagInterval || ''}
                        className="text-center w-auto font-mono align-left"
                        size={5}
                        onChange={(e) => (levelBuilder.waveManager.flagInterval = Number(e.target.value))}
                    />
                </div>
                <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                    <Label>First Wave Countdown</Label>
                    <OptionalNumberInput
                        value={levelBuilder.waveManager.firstWaveTime}
                        onChange={(val) => (levelBuilder.waveManager.firstWaveTime = val)}
                    />
                </div>
                <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                    <Label>Min Next Wave Health</Label>
                    <OptionalNumberInput
                        value={levelBuilder.waveManager.minWaveHealth}
                        onChange={(val) => (levelBuilder.waveManager.minWaveHealth = val)}
                    />
                </div>
                <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                    <Label>Max Next Wave Health</Label>
                    <OptionalNumberInput
                        value={levelBuilder.waveManager.maxWaveHealth}
                        onChange={(val) => (levelBuilder.waveManager.maxWaveHealth = val)}
                    />
                </div>
            </div>
        </div>
    );
}

// export interface WaveManagerPropertiesObject {
//     SuppressFlagZombie?: boolean;
//     IgnoreFlagCarriers?: boolean;
//     ZombieCountdownFirstWaveSecs?: number;
//     WaveSpendingPoints?: number;
//     WaveSpendingPointIncrement?: number;
//     WavesAlwaysRandomized?: boolean;
//     SuppressedDynamicZombieWaves?: number[];
//     FlagWaveVeteranOverrideTypes?: number[];
//     SpawnColEnd?: number;
//     SpawnColStart?: number;
//     LevelJam?: string;
//     ManualStartup?: boolean;
// }

// export interface WaveManagerModulePropertiesObject {
//     DynamicZombies?: DynamicZombieWave[];
//     WaveManagerProps: string; // 'RTID(WaveManagerProps@CurrentLevel)'
//     ManualStartup?: boolean;
// }
