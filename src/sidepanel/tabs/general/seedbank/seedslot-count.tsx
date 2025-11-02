import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { levelState } from '@/lib/state';
import { useState } from 'react';

export function OverrideSeedSlots() {
    const { levelBuilder } = levelState();

    const startingState = levelBuilder.seedBank.objdata.OverrideSeedSlotsCount != undefined;
    const [enabled, _setEnabled] = useState(startingState);

    const setEnabled = (isEnabled: boolean) => {
        if (!isEnabled) {
            levelBuilder.seedBank.objdata.OverrideSeedSlotsCount = undefined;
        }
        _setEnabled(isEnabled);
    };

    const overrideSeedSlots = (count: number) => {
        levelBuilder.seedBank.objdata.OverrideSeedSlotsCount = count;
    };

    return (
        <div className="flex flex-col w-full items-center px-4 py-2 gap-2">
            <div className="flex flex-row">
                <Label className="px-4 py-1">Override Seed Slot Count</Label>
                <Switch
                    defaultChecked={enabled}
                    onCheckedChange={setEnabled}
                    className="data-[state=checked]:bg-blue-500"
                />
            </div>
            {enabled && (
                <div className="flex w-full flex-row justify-between border rounded-md px-2 py-2">
                    <Label className="px-4 py-1">Slot Count</Label>
                    <Input
                        type="number"
                        placeholder="0"
                        defaultValue={levelBuilder.seedBank.objdata.OverrideSeedSlotsCount}
                        className="text-center w-20 font-mono align-left"
                        size={5}
                        onChange={(e) => overrideSeedSlots(Number(e.target.value))}
                    />
                </div>
            )}
        </div>
    );
}
