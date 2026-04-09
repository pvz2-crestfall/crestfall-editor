import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { levelState } from '@/lib/state/levelstate';
import { useEffect, useState } from 'react';

export function CustomSunDropperOptions() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const [sunDelay, setSunDelay] = useState(levelBuilder.levelProperties.customSunDropper.sunDelay);
    const [base, setBase] = useState(levelBuilder.levelProperties.customSunDropper.countdownBase);
    const [max, setMax] = useState(levelBuilder.levelProperties.customSunDropper.countdownMax);
    const [range, setRange] = useState(levelBuilder.levelProperties.customSunDropper.countdownRange);
    const [increment, setIncrement] = useState(levelBuilder.levelProperties.customSunDropper.countdownIncrement);

    useEffect(() => {
        levelBuilder.levelProperties.customSunDropper.sunDelay = sunDelay;
        levelBuilder.levelProperties.customSunDropper.countdownBase = base;
        levelBuilder.levelProperties.customSunDropper.countdownMax = max;
        levelBuilder.levelProperties.customSunDropper.countdownRange = range;
        levelBuilder.levelProperties.customSunDropper.countdownIncrement = increment;
    }, [sunDelay, base, max, range, increment]);

    return (
        <div className="flex flex-col gap-2 items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
            <Label>Sun Dropper Options</Label>
            <div className="gap-1 w-[320px]">
                <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                    <Label>Initial Sun Delay</Label>
                    <Input
                        type="number"
                        defaultValue={sunDelay}
                        className="text-center w-20 font-mono align-left"
                        size={5}
                        onChange={(e) => setSunDelay(Number(e.target.value))}
                    />
                </div>

                <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                    <Label>Countdown Base</Label>
                    <Input
                        type="number"
                        defaultValue={base}
                        className="text-center w-20 font-mono align-left"
                        size={5}
                        onChange={(e) => setBase(Number(e.target.value))}
                    />
                </div>

                <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                    <Label>Countdown Max</Label>
                    <Input
                        type="number"
                        defaultValue={max}
                        className="text-center w-20 font-mono align-left"
                        size={5}
                        onChange={(e) => setMax(Number(e.target.value))}
                    />
                </div>

                <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                    <Label>Countdown Range</Label>
                    <Input
                        type="number"
                        defaultValue={range}
                        className="text-center w-20 font-mono align-left"
                        size={5}
                        onChange={(e) => setRange(Number(e.target.value))}
                    />
                </div>

                <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                    <Label>Countdown Increment</Label>
                    <Input
                        type="number"
                        defaultValue={increment}
                        className="text-center w-20 font-mono align-left"
                        size={5}
                        onChange={(e) => setIncrement(Number(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
}
