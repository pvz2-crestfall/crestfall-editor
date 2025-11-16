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
import { levelState } from '@/lib/state/levelstate';
import { LawnMowerType } from '@/types/PVZTypes';
import { useEffect, useState } from 'react';

export function MowerTypeSelector() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const [mowerType, setMowerType] = useState<string>(levelBuilder.levelProperties.lawnMower ?? 'disabled');

    useEffect(() => {
        if (mowerType == 'disabled') {
            levelBuilder.levelProperties.lawnMower = undefined;
        } else {
            levelBuilder.levelProperties.lawnMower = mowerType as LawnMowerType;
        }
    }, [mowerType]);

    return (
        <div className="flex items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
            <Label>Lawn Mowers</Label>
            <Select value={mowerType ?? undefined} onValueChange={(val) => setMowerType(val)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Mower Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Lawn Mowers</SelectLabel>
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                        <SelectLabel>World Mowers</SelectLabel>
                        <SelectItem value={LawnMowerType.Tutorial}>Tutorial Mowers</SelectItem>
                        <SelectItem value={LawnMowerType.Egypt}>Ancient Egypt</SelectItem>
                        <SelectItem value={LawnMowerType.Pirate}>Pirate Seas</SelectItem>
                        <SelectItem value={LawnMowerType.WildWest}>Wild West</SelectItem>
                        <SelectItem value={LawnMowerType.Frostbite}>Frostbite Caves</SelectItem>
                        <SelectItem value={LawnMowerType.LostCity}>Lost City</SelectItem>
                        <SelectItem value={LawnMowerType.Future}>Far Future</SelectItem>
                        <SelectItem value={LawnMowerType.DarkAges}>Dark Ages</SelectItem>
                        <SelectItem value={LawnMowerType.NMT}>Neon Mixtape</SelectItem>
                        <SelectItem value={LawnMowerType.Jurassic}>Jurassic Marsh</SelectItem>
                        <SelectItem value={LawnMowerType.BWB}>Big Wave Beach</SelectItem>
                        <SelectItem value={LawnMowerType.Modern}>Modern Day</SelectItem>
                        <SelectItem value={LawnMowerType.BattleZ}>BattleZ/Joust</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
