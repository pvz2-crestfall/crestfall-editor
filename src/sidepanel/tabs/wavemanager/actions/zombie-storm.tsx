import { AddZombieButton } from '@/components/ui/wave-editor/add-zombie-button';
import { Label } from '@/components/ui/label';
import { OptionalNumberInput } from '@/components/ui/optional-ninput';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { WaveEditorZombieList } from '@/components/ui/wave-editor/zombie-list';
import { StormType, type StormZombieSpawnerProps, type WaveAction } from '@/lib/levelModules/wavemanager/wavetypes';
import { RTIDTypes, toRTID } from '@/lib/utils';
import { useState } from 'react';
import { SliderWithInputs } from '@/components/ui/slider-with-inputs';

export function ZombieStormAction({ waveaction }: { waveaction: WaveAction<StormZombieSpawnerProps> }) {
    const [groupSize, _setGroupSize] = useState(waveaction.data.GroupSize);
    const [timeBetweenGroups, _setTimeBetweenGroups] = useState(waveaction.data.TimeBetweenGroups);
    const [stormType, _setStormType] = useState(waveaction.data.Type);
    const [zombies, _setZombies] = useState(waveaction.data.Zombies);

    const setGroupSize = (value: number | undefined) => {
        const val = Number(value);
        waveaction.data.GroupSize = val;
        _setGroupSize(val);
    };

    const setTimeBetweenGroups = (value: number | undefined) => {
        const val = Number(value);
        waveaction.data.TimeBetweenGroups = val;
        _setTimeBetweenGroups(val);
    };

    const setStormType = (value: StormType) => {
        waveaction.data.Type = value;
        _setStormType(value);
    };

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
            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                <div className="flex flex-row w-[48%] justify-between">
                    <Label className="w-80%">Group Size</Label>
                    <OptionalNumberInput
                        optional={false}
                        min={1}
                        value={groupSize}
                        onChange={setGroupSize}
                        className="w-10"
                    />
                </div>
                <div className="flex flex-row w-[48%] justify-between">
                    <Label className="w-80%">Time Between Groups</Label>
                    <OptionalNumberInput
                        optional={false}
                        min={0.1}
                        value={timeBetweenGroups}
                        onChange={setTimeBetweenGroups}
                        className="w-10"
                    />
                </div>
            </div>
            <div className="flex w-full flex-col items-center justify-between border rounded-md px-4 py-2">
                <RadioGroup
                    defaultValue={stormType}
                    className="flex flex-row gap-8 h-8 justify-center items-center"
                    onValueChange={setStormType}
                >
                    <div className="flex flex-row gap-2 items-center">
                        <RadioGroupItem value={StormType.SANDSTORM} id="r1" />
                        <Label htmlFor="r1">Sandstorm</Label>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <RadioGroupItem value={StormType.SNOWSTORM} id="r2" />
                        <Label htmlFor="r2">Snowstorm</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="mt-2"></div>
            <WaveEditorZombieList list={waveaction.data.Zombies} enableRow onRemove={removeZombie}>
                <AddZombieButton onSelect={addNewZombie} />
            </WaveEditorZombieList>
        </div>
    );
}
