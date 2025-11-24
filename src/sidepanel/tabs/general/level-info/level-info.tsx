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
import { gridState } from '@/lib/state/gridstate';
import { levelState } from '@/lib/state/levelstate';
import { LawnMowerType, StageModuleType } from '@/types/PVZTypes';
import { useEffect, useState } from 'react';

export function LevelInfo() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const reloadBackground = gridState((s) => s.updateGrid);
    const [stageType, setStageType] = useState(levelBuilder.levelProperties.stageType);
    const [mowerType, setMowerType] = useState<string>(levelBuilder.levelProperties.lawnMower ?? 'disabled');

    useEffect(() => {
        levelBuilder.levelProperties.stageType = stageType;
        reloadBackground();
    }, [stageType]);

    useEffect(() => {
        if (mowerType == 'disabled') {
            levelBuilder.levelProperties.lawnMower = undefined;
        } else {
            levelBuilder.levelProperties.lawnMower = mowerType as LawnMowerType;
        }
    }, [mowerType, stageType]);

    return (
        <div className="flex flex-col items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
            <div className="flex items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
                <Label>World Type</Label>
                <Select value={stageType ?? undefined} onValueChange={(val) => setStageType(val as StageModuleType)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Stage Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>World Select</SelectLabel>
                            <SelectItem value={StageModuleType.Tutorial}>Tutorial Stage</SelectItem>
                            <SelectItem value={StageModuleType.FrontLawn}>Front Lawn</SelectItem>
                            <SelectItem value={StageModuleType.Egypt}>Ancient Egypt</SelectItem>
                            <SelectItem value={StageModuleType.Pirate}>Pirate Seas</SelectItem>
                            <SelectItem value={StageModuleType.WildWest}>Wild West</SelectItem>
                            <SelectItem value={StageModuleType.Frostbite}>Frostbite Caves</SelectItem>
                            <SelectItem value={StageModuleType.LostCity}>Lost City</SelectItem>
                            <SelectItem value={StageModuleType.Future}>Far Future</SelectItem>
                            <SelectItem value={StageModuleType.DarkAges}>Dark Ages</SelectItem>
                            <SelectItem value={StageModuleType.NMT}>Neon Mixtape</SelectItem>
                            <SelectItem value={StageModuleType.Jurassic}>Jurassic Marsh</SelectItem>
                            <SelectItem value={StageModuleType.BWB}>Big Wave Beach</SelectItem>
                            <SelectItem value={StageModuleType.Modern}>Modern Day</SelectItem>
                            <SelectItem value={StageModuleType.BattleZ}>BattleZ/Joust</SelectItem>
                            <SelectItem value={StageModuleType.Rift}>Rift Stage</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

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
        </div>
    );
}
