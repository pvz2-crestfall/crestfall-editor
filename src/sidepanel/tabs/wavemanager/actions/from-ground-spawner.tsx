import { AddZombieButton } from '@/components/ui/wave-editor/add-zombie-button';
import { WaveEditorZombieList } from '@/components/ui/wave-editor/zombie-list';
import { type SpawnZombiesFromGroundSpawnerProps, type WaveAction } from '@/lib/levelModules/wavemanager/wavetypes';
import { RTIDTypes, toRTID } from '@/lib/utils';
import { useState } from 'react';
import { SliderWithInputs } from '@/components/ui/slider-with-inputs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function SpawnZombiesFromGroundAction({
    waveaction,
}: {
    waveaction: WaveAction<SpawnZombiesFromGroundSpawnerProps>;
}) {
    const [zombies, _setZombies] = useState(waveaction.data.Zombies);
    const [waveStartMessage, _setWaveStartMessage] = useState(waveaction.data.WaveStartMessage);

    const setZombies = (val: { Type: string; row?: number }[]) => {
        waveaction.data.Zombies = val;
        _setZombies(val);
    };
    const addNewZombie = (zombie: string) => {
        setZombies([...zombies, { Type: toRTID(zombie, RTIDTypes.zombie) }]);
    };
    const removeZombie = (index: number) => {
        const newZombies = [...zombies];
        newZombies.splice(index, 1);
        setZombies(newZombies);
    };

    const setWaveStartMessage = (val: string | undefined) => {
        waveaction.data.WaveStartMessage = val;
        _setWaveStartMessage(val);
    };

    return (
        <div className="flex flex-col w-full items-center justify-center">
            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2 gap-4">
                <Label>Columns</Label>
                <SliderWithInputs
                    value={[waveaction.data.ColumnStart, waveaction.data.ColumnEnd]}
                    min={1}
                    max={9}
                    onValueChange={([min, max]) => {
                        waveaction.data.ColumnStart = min;
                        waveaction.data.ColumnEnd = max;
                    }}
                />
            </div>
            <div className="flex flex-col w-full items-center justify-between border rounded-md px-4 py-2 gap-4">
                <Label>Wave Starting Message</Label>
                <Input
                    value={waveStartMessage}
                    placeholder="Leave empty for no message."
                    onChange={(e) => {
                        setWaveStartMessage(e.target.value == '' ? undefined : e.target.value);
                    }}
                />
            </div>
            <div className="mt-2"></div>
            <WaveEditorZombieList list={waveaction.data.Zombies} enableRow onRemove={removeZombie}>
                <AddZombieButton onSelect={addNewZombie} />
            </WaveEditorZombieList>
        </div>
    );
}
