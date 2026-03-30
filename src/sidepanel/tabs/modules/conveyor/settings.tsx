import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { levelState } from '@/lib/state/levelstate';
import { useEffect, useState } from 'react';

export function ConveyorSettings() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const [enabled, setEnabled] = useState(levelBuilder.conveyor.enabled);
    const [speed, setSpeed] = useState(levelBuilder.conveyor.speed);
    const [delayConditions, setDelayConditions] = useState(levelBuilder.conveyor.delayConditions);

    useEffect(() => {
        levelBuilder.conveyor.speed = speed;
        levelBuilder.conveyor.enabled = enabled;
        levelBuilder.conveyor.delayConditions = delayConditions;
    }, [speed, enabled, delayConditions]);

    const setDelayCondition = (index: number, condition: { Delay: number; MaxPackets: number }) => {
        const copy = [...delayConditions];
        copy[index] = condition;
        setDelayConditions(copy);
    };

    return (
        <div>
            <div className="flex items-center justify-center border rounded-md px-4 py-2">
                <Label className="px-4 py-1">Enable Conveyor Belt</Label>
                <Switch defaultChecked={enabled} onCheckedChange={setEnabled}></Switch>
            </div>
            {enabled && (
                <div>
                    <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                        <Label className="px-4 py-1">Conveyor Belt Speed</Label>
                        <Input
                            type="number"
                            placeholder="0"
                            defaultValue={levelBuilder.conveyor.speed}
                            className="text-center w-20 font-mono align-left"
                            size={5}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                        />
                    </div>
                    <div className="flex flex-col  w-full items-center justify-between border rounded-md px-4 py-2">
                        <Label className="px-4 py-1">Drop Delay Conditions</Label>
                        {delayConditions.map((condition, index) => (
                            <div className="flex flex-row border rounded-md py-2 px-4 gap-2">
                                <div key={index} className="flex flex-row gap-2">
                                    <Label>Max Packets: </Label>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        defaultValue={condition.MaxPackets}
                                        value={condition.MaxPackets}
                                        className="text-center w-20 font-mono align-left"
                                        size={2}
                                        onChange={(e) =>
                                            setDelayCondition(index, {
                                                Delay: condition.Delay,
                                                MaxPackets: Number(e.target.value),
                                            })
                                        }
                                    />
                                    <Label>Delay: </Label>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        defaultValue={condition.Delay}
                                        value={condition.Delay}
                                        className="text-center w-20 font-mono align-left"
                                        size={2}
                                        onChange={(e) =>
                                            setDelayCondition(index, {
                                                Delay: Number(e.target.value),
                                                MaxPackets: condition.MaxPackets,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
