import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OptionalNumberInput } from '@/components/ui/optional-ninput';
import { SliderWithInputs } from '@/components/ui/slider-with-inputs';
import { WaveEditorZombieSelector } from '@/components/wave-editor/zombie-selector';
import type {
    ParachuteRainZombieSpawnerProps,
    SpiderRainZombieSpawnerProps,
    WaveAction,
} from '@/lib/levelModules/wavemanager/wavetypes';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ZombieRainWaveAction({
    waveaction,
}: {
    waveaction: WaveAction<ParachuteRainZombieSpawnerProps | SpiderRainZombieSpawnerProps>;
}) {
    const [columnRange, setColumnRange] = useState<[number, number]>([
        waveaction.data.ColumnStart,
        waveaction.data.ColumnEnd,
    ]);
    const [startMessage, setStartMessage] = useState(waveaction.data.WaveStartMessage);

    useEffect(() => {
        const [start, end] = columnRange;
        waveaction.data.ColumnStart = start;
        waveaction.data.ColumnEnd = end;
    }, [columnRange]);

    useEffect(() => {
        waveaction.data.WaveStartMessage = startMessage;
    }, [startMessage]);

    return (
        <div className="flex flex-col w-full items-center justify-center">
            <div className="flex flex-col w-full items-center justify-between border rounded-md px-4 py-2 gap-4">
                <Label>Wave Start Message</Label>
                <Input
                    className="text-center"
                    value={startMessage}
                    placeholder="Empty."
                    onChange={(e) => setStartMessage(e.target.value)}
                />
            </div>
            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2 gap-4">
                <Label>Columns</Label>
                <SliderWithInputs value={columnRange} min={1} max={9} onValueChange={setColumnRange} />
            </div>

            <ZombieOptionsCollapsible waveaction={waveaction} />
            <SpawnTimingsCollapsible waveaction={waveaction} />
        </div>
    );
}

function ZombieOptionsCollapsible({
    waveaction,
}: {
    waveaction: WaveAction<ParachuteRainZombieSpawnerProps | SpiderRainZombieSpawnerProps>;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [zombieCount, setZombieCount] = useState(waveaction.data.SpiderCount);
    const [groupSize, setGroupSize] = useState(waveaction.data.GroupSize);
    const [zombieType, setZombieType] = useState(waveaction.data.SpiderZombieName);

    useEffect(() => {
        waveaction.data.SpiderCount = zombieCount;

        if (zombieCount < groupSize) {
            setGroupSize(zombieCount);
        }
    }, [zombieCount]);

    useEffect(() => {
        waveaction.data.GroupSize = groupSize;
    }, [groupSize]);

    useEffect(() => {
        waveaction.data.SpiderZombieName = zombieType;
    }, [zombieType]);

    function ZombieOptionsCollapsibleContent() {
        return (
            <>
                <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                    <Label>Zombie Count</Label>
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
                    <Label>Zombie Type</Label>
                    <WaveEditorZombieSelector zombieType={zombieType} onSelect={setZombieType} />
                </div>
            </>
        );
    }

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full w-max-128 mt-2">
            <div className="w-full flex flex-row items-center justify-center">
                <CollapsibleTrigger asChild className="flex flex-row">
                    <div>
                        <Label className="text-sm">Zombie Options</Label>
                        <Button variant="ghost" size="icon">
                            <ChevronRight
                                className={cn(
                                    'transition-transform duration-200 ease-in-out',
                                    isOpen ? 'rotate-90' : '',
                                )}
                            />
                        </Button>
                    </div>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="flex flex-col">{ZombieOptionsCollapsibleContent()}</CollapsibleContent>
        </Collapsible>
    );
}

function SpawnTimingsCollapsible({
    waveaction,
}: {
    waveaction: WaveAction<ParachuteRainZombieSpawnerProps | SpiderRainZombieSpawnerProps>;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [timeBetweenGroups, setTimeBetweenGroups] = useState(waveaction.data.TimeBetweenGroups);
    const [timeBeforeFullSpawn, setTimeBeforeFullSpawn] = useState(waveaction.data.TimeBeforeFullSpawn);
    const [fallTime, setFallTime] = useState(waveaction.data.ZombieFallTime);

    useEffect(() => {
        waveaction.data.TimeBetweenGroups = timeBetweenGroups;
    }, [timeBetweenGroups]);
    useEffect(() => {
        waveaction.data.TimeBeforeFullSpawn = timeBeforeFullSpawn;
    }, [timeBeforeFullSpawn]);
    useEffect(() => {
        waveaction.data.ZombieFallTime = fallTime;
    }, [fallTime]);

    function SpawnTimingsCollapsibleContent() {
        return (
            <>
                <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                    <Label>Time Between Groups</Label>
                    <OptionalNumberInput
                        placeholder="0"
                        optional={false}
                        value={timeBetweenGroups}
                        onChange={(num) => setTimeBetweenGroups(Number(num))}
                    />
                </div>
                <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                    <Label>Time Before Spawn</Label>
                    <OptionalNumberInput
                        placeholder="0"
                        optional={false}
                        value={timeBeforeFullSpawn}
                        onChange={(num) => setTimeBeforeFullSpawn(Number(num))}
                    />
                </div>
                <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                    <Label>Fall Time</Label>
                    <OptionalNumberInput
                        placeholder="0"
                        optional={false}
                        value={fallTime}
                        onChange={(num) => setFallTime(Number(num))}
                    />
                </div>
            </>
        );
    }

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full w-max-128 mt-2">
            <div className="w-full flex flex-row items-center justify-center">
                <CollapsibleTrigger asChild className="flex flex-row">
                    <div>
                        <Label className="text-sm">Spawn Timings</Label>
                        <Button variant="ghost" size="icon">
                            <ChevronRight
                                className={cn(
                                    'transition-transform duration-200 ease-in-out',
                                    isOpen ? 'rotate-90' : '',
                                )}
                            />
                        </Button>
                    </div>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="flex flex-col">{SpawnTimingsCollapsibleContent()}</CollapsibleContent>
        </Collapsible>
    );
}
