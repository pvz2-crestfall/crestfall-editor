import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { levelState } from '@/lib/state';

export function WaveManagerWaves() {
    const { levelBuilder } = levelState();

    const waves = levelBuilder.waveManager.waves;
    return (
        <div className="flex flex-col gap-2 items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
            <Label>Waves</Label>
            {waves.map((wave, index) => (
                <div key={index} className="flex items-center justify-between">
                    <Popover>
                        <PopoverTrigger>
                            <span className="font-bold">{wave.join(' | ')}</span>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px]">
                            <div className="flex flex-col gap-2">
                                {levelBuilder.waveManager
                                    .getWaveData(wave)
                                    .map((enemy, enemyIndex) => (
                                        <div
                                            key={enemyIndex}
                                            className="flex items-center justify-between"
                                        >
                                            <span className="font-bold">{enemy.name}</span>
                                            <span className="font-bold">{enemy.health}</span>
                                        </div>
                                    ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            ))}
        </div>
    );
}
