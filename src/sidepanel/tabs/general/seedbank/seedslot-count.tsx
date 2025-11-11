import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { levelState } from '@/lib/state';
import { useEffect, useState } from 'react';

export function OverrideSeedSlots() {
    const levelBuilder = levelState((s) => s.levelBuilder);

    const [enabled, setEnabled] = useState(levelBuilder.seedBank.objdata.OverrideSeedSlotsCount != undefined);
    const [slotCount, setSlotCount] = useState(levelBuilder.seedBank.objdata.OverrideSeedSlotsCount ?? 0);

    useEffect(() => {
        levelBuilder.seedBank.objdata.OverrideSeedSlotsCount = enabled ? slotCount : undefined;
    }, [enabled, slotCount]);

    return (
        <div className="flex flex-col w-full items-center px-4 py-2 gap-2">
            <div className="flex flex-row">
                <Label className="px-4 py-1">Override Seed Slot Count</Label>
                <Switch defaultChecked={enabled} onCheckedChange={setEnabled} />
            </div>
            {enabled && (
                <div className="flex w-full flex-row justify-between border rounded-md px-2 py-2">
                    <Label className="px-4 py-1">Slot Count</Label>
                    <Input
                        type="number"
                        placeholder="0"
                        defaultValue={slotCount}
                        className="text-center w-20 font-mono align-left"
                        size={5}
                        onChange={(e) => setSlotCount(Number(e.target.value))}
                    />
                </div>
            )}
        </div>
    );
}
