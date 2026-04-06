import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PowerupSet } from '@/lib/levelModules/leveldefinition';
import { levelState } from '@/lib/state/levelstate';
import { useEffect, useState } from 'react';

export function PowerupSelector() {
    const levelBuilder = levelState((s) => s.levelBuilder);

    const [powerupType, setPowerupType] = useState(levelBuilder.levelProperties.powerupType);

    useEffect(() => {
        levelBuilder.levelProperties.powerupType = powerupType;
    }, [powerupType]);

    return (
        <>
            <div className="flex items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
                <Label>Powerup Set</Label>
                <Select value={powerupType} onValueChange={(val) => setPowerupType(val as PowerupSet)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Powerup Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Powerup Set</SelectLabel>
                            <SelectItem value={PowerupSet.Default}>Default</SelectItem>
                            <SelectItem value={PowerupSet.Unlimited}>Unlimited</SelectItem>
                            <SelectItem value={PowerupSet.Flamethrower}>Flamethrower</SelectItem>
                            <SelectItem value={PowerupSet.Vasebreaker}>Vase Breaker</SelectItem>
                            <SelectItem value={PowerupSet.Beghouled}>Beghouled</SelectItem>
                            <SelectItem value={PowerupSet.Disabled}>Disabled</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
}
