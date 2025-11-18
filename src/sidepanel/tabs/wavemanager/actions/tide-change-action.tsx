import { Label } from '@/components/ui/label';
import { OptionalNumberInput } from '@/components/ui/optional-ninput';
import type { TidalChangeWaveActionProps, WaveAction } from '@/lib/levelModules/wavemanager/types';
import { useEffect, useState } from 'react';

export function TideChangeWaveAction({ waveaction }: { waveaction: WaveAction<TidalChangeWaveActionProps> }) {
    const [tideColumn, setTideColumn] = useState(waveaction.data.TidalChange.ChangeAmount);

    useEffect(() => {
        waveaction.data.TidalChange.ChangeAmount = tideColumn;
    }, [tideColumn]);

    return (
        <div className="flex flex-col w-full items-center justify-center gap-2">
            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                <Label>Tide Column</Label>
                <OptionalNumberInput
                    placeholder="1"
                    optional={false}
                    min={1}
                    max={9}
                    value={tideColumn}
                    onChange={(val) => setTideColumn(val ?? 1)}
                />
            </div>
        </div>
    );
}
