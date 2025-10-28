import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { levelState } from '@/lib/state';
import { useState } from 'react';

export function ConveyorSettings() {
    const { levelBuilder } = levelState();
    const [enabled, _setEnabled] = useState(levelBuilder.conveyor.enabled);

    const setSpeed = (speed: number) => {
        levelBuilder.conveyor.speed = speed;
    };
    const setEnabled = (val: boolean) => {
        levelBuilder.conveyor.enabled = val;
        _setEnabled(val);
    };

    return (
        <div>
            <div className="flex items-center justify-center border rounded-md px-4 py-2">
                <Label className="px-4 py-1">Enable Conveyor Belt</Label>
                <Switch
                    defaultChecked={enabled}
                    onCheckedChange={setEnabled}
                    className="data-[state=checked]:bg-blue-500"
                ></Switch>
            </div>
            {levelBuilder.conveyor.enabled && (
                <div>
                    <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                        <Label className="px-4 py-1">Conveyor Belt Speed</Label>
                        <Input
                            type="number"
                            placeholder="0"
                            defaultValue={levelBuilder.conveyor.speed}
                            className="text-center w-auto font-mono align-left"
                            size={5}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                        />
                    </div>
                    <div className="flex flex-col  w-full items-center justify-between border rounded-md px-4 py-2">
                        <Label className="px-4 py-1">Drop Delay Conditions</Label>
                        {levelBuilder.conveyor.delayConditions.map((condition, index) => (
                            <div className="flex flex-row border rounded-md py-2 px-4 gap-2">
                                <div key={index} className="flex flex-row gap-2">
                                    <Label>Max Packets: </Label>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        defaultValue={condition.MaxPackets}
                                        className="text-center w-auto font-mono align-left"
                                        size={2}
                                        onChange={(e) =>
                                            (levelBuilder.conveyor.delayConditions[index].MaxPackets = Number(e.target.value))
                                        }
                                    />
                                    <Label>Delay: </Label>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        defaultValue={condition.Delay}
                                        className="text-center w-auto font-mono align-left"
                                        size={2}
                                        onChange={(e) =>
                                            (levelBuilder.conveyor.delayConditions[index].Delay = Number(e.target.value))
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
