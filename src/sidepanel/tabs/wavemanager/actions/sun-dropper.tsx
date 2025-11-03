import { Label } from '@/components/ui/label';
import { OptionalNumberInput } from '@/components/ui/optional-ninput';
import type { SunDropperWaveActionProps, WaveAction } from '@/lib/levelModules/wavemanager/wavetypes';
import { useState } from 'react';

export function SunDropperWaveAction({ waveaction }: { waveaction: WaveAction<SunDropperWaveActionProps> }) {
    const [sunAmount, _setPFCount] = useState(waveaction.data.SunAmountToDrop);

    const setPlantFoodCount = (val: number) => {
        waveaction.data.SunAmountToDrop = val;
        _setPFCount(val);
    };

    return (
        <div className="flex flex-col w-full items-center justify-center gap-2">
            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                <Label>Sun Amount To Drop</Label>
                <OptionalNumberInput
                    placeholder="0"
                    optional={false}
                    min={0}
                    value={sunAmount}
                    onChange={(val) => setPlantFoodCount(val ?? 0)}
                />
            </div>
        </div>
    );
}
