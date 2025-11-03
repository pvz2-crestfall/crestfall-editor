import { Label } from '@/components/ui/label';
import { OptionalNumberInput } from '@/components/ui/optional-ninput';
import type { SpawnZombiesJitteredWaveActionProps, WaveAction } from '@/lib/levelModules/wavemanager/wavetypes';
import { RTIDTypes, toRTID } from '@/lib/utils';
import { useState } from 'react';
import { AddZombieButton } from '@/components/ui/wave-editor/add-zombie-button';
import { WaveEditorZombieList } from '@/components/ui/wave-editor/zombie-list';

export function BasicZombieSpawner({ waveaction }: { waveaction: WaveAction<SpawnZombiesJitteredWaveActionProps> }) {
    const [plantFoodCount, _setPFCount] = useState(waveaction.data.AdditionalPlantfood);
    const [zombies, _setZombies] = useState(waveaction.data.Zombies);

    const setZombies = (val: { Type: string; row?: number }[]) => {
        waveaction.data.Zombies = val;
        _setZombies(val);
    };

    const setPlantFoodCount = (val: number | undefined) => {
        waveaction.data.AdditionalPlantfood = val;
        _setPFCount(val);
    };

    const addNewZombie = (zombie: string) => {
        setZombies([...zombies, { Type: toRTID(zombie, RTIDTypes.zombie) }]);
    };

    const removeZombie = (index: number) => {
        const newZombies = [...zombies];
        newZombies.splice(index, 1);
        setZombies(newZombies);
    };

    return (
        <div className="flex flex-col w-full items-center justify-center gap-2">
            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                <Label>Additional Plant Food</Label>
                <OptionalNumberInput value={plantFoodCount} onChange={setPlantFoodCount} />
            </div>

            <WaveEditorZombieList list={waveaction.data.Zombies} enableRow onRemove={removeZombie}>
                <AddZombieButton onSelect={addNewZombie} />
            </WaveEditorZombieList>
        </div>
    );
}
