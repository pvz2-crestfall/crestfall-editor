import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OptionalNumberInput } from '@/components/ui/optional-ninput';
import { Switch } from '@/components/ui/switch';
import { AddGravestoneButton } from '@/components/wave-editor/add-grave-button';
import { AddZombieButton } from '@/components/wave-editor/add-zombie-button';
import { WaveEditorGravestoneList } from '@/components/wave-editor/grave-list';
import { WaveEditorZombieList } from '@/components/wave-editor/zombie-list';
import type { SpawnZombiesFromGridItemSpawnerProps, WaveAction } from '@/lib/levelModules/wavemanager/types';
import { toRTID, RTIDTypes } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function SpawnZombiesFromGriditemsAction({
    waveaction,
}: {
    waveaction: WaveAction<SpawnZombiesFromGridItemSpawnerProps>;
}) {
    const [plantFoodCount, setPFCount] = useState(waveaction.data.AdditionalPlantfood);
    const [waveDelay, setWaveDelay] = useState(waveaction.data.ZombieSpawnWaitTime);
    const [startMessage, setStartMessage] = useState(waveaction.data.WaveStartMessage);
    const [supressIfNoItems, setSupress] = useState(waveaction.data.SuppressActionIfNoGridItemsFound);
    const [gridItems, setGridItems] = useState(waveaction.data.GridTypes);
    const [zombies, setZombies] = useState(waveaction.data.Zombies);

    useEffect(() => {
        waveaction.data.AdditionalPlantfood = plantFoodCount;
    }, [plantFoodCount]);

    useEffect(() => {
        waveaction.data.ZombieSpawnWaitTime = waveDelay;
    }, [waveDelay]);

    useEffect(() => {
        waveaction.data.WaveStartMessage = startMessage;
    }, [startMessage]);

    useEffect(() => {
        waveaction.data.SuppressActionIfNoGridItemsFound = supressIfNoItems;
    }, [supressIfNoItems]);

    useEffect(() => {
        waveaction.data.GridTypes = gridItems;
    }, [gridItems]);

    useEffect(() => {
        waveaction.data.Zombies = zombies;
    }, [zombies]);

    const addGridItem = (item: string) => {
        const rtidValue = toRTID(item, RTIDTypes.gridItem);
        if (gridItems.includes(rtidValue)) return;

        setGridItems((prev) => [...prev, rtidValue]);
    };
    const removeGridItem = (index: number) => {
        setGridItems((prev) => prev.filter((_, i) => index != i));
    };

    const addNewZombie = (zombie: string) => {
        setZombies([...zombies, { Type: toRTID(zombie, RTIDTypes.zombie) }]);
    };
    const removeZombie = (index: number) => {
        setZombies((prev) => prev.filter((_, i) => index != i));
    };

    return (
        <div className="flex flex-col w-full items-center justify-center">
            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                <Label>Additional Plant Food</Label>
                <OptionalNumberInput placeholder="0" value={plantFoodCount} onChange={(val) => setPFCount(val ?? 0)} />
            </div>
            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                <Label>Spawn Delay</Label>
                <OptionalNumberInput placeholder="Default" value={waveDelay} onChange={setWaveDelay} />
            </div>
            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2 h-12">
                <Label>Supress If No Grid Items</Label>
                <Switch defaultChecked={supressIfNoItems} onCheckedChange={setSupress}></Switch>
            </div>
            <div className="flex flex-col w-full items-center justify-between border rounded-md px-4 py-2 gap-4">
                <Label>Wave Start Message</Label>
                <Input
                    className="text-center"
                    value={startMessage}
                    placeholder="Default"
                    onChange={(e: any) => {
                        setStartMessage(e.target.value == '' ? undefined : e.target.value);
                    }}
                />
            </div>
            <div className="flex w-full items-center justify-between px-4 py-2">
                <WaveEditorGravestoneList
                    header="Grid Item Types"
                    list={gridItems.map((x) => {
                        return { Type: x, Count: 0 };
                    })}
                    onRemove={removeGridItem}
                    removeRow
                >
                    <AddGravestoneButton onSelect={addGridItem}></AddGravestoneButton>
                </WaveEditorGravestoneList>
            </div>
            <div className="flex w-full items-center justify-between px-4 py-2">
                <WaveEditorZombieList list={zombies} onRemove={removeZombie} disableRow>
                    <AddZombieButton onSelect={addNewZombie}></AddZombieButton>
                </WaveEditorZombieList>
            </div>
        </div>
    );
}
