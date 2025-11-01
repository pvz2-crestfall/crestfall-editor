import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { WaveList } from './wave-list';
import { WaveActionList } from './wave-actions';

export const animationDuration = 700;

export function WaveManagerWaves() {
    const [selectedWave, setSelectedWave] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-2 items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full overflow-hidden relative">
            <Label className="text-md mb-2">Waves</Label>

            {/* Animation container */}
            <div className="relative w-full overflow-hidden h-auto">
                <div
                    className={`flex transition-all duration-${animationDuration} ease-in-out`}
                    style={{
                        transform: selectedWave === null ? 'translateX(0%)' : 'translateX(-100%)',
                    }}
                >
                    <WaveList waveIndex={selectedWave} setIndex={(index) => setSelectedWave(index)} />
                    <WaveActionList waveIndex={selectedWave} setIndex={setSelectedWave} />
                </div>
            </div>
        </div>
    );
}
