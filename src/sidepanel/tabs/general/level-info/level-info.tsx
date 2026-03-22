import { Input } from '@/components/ui/input';
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
import { LevelUnlockSelector } from './level-reward';

export function LevelInfo() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const reloadBackground = gridState((s) => s.updateGrid);
    const [stageNumb, setStageNumb] = useState(levelBuilder.levelProperties.levelNumber);
    const [stageName, setStageName] = useState(levelBuilder.levelProperties.name);
    const [stageDesc, setStageDesc] = useState(levelBuilder.levelProperties.description);
    const [stageType, setStageType] = useState(levelBuilder.levelProperties.stageType);
    const [mowerType, setMowerType] = useState<string>(levelBuilder.levelProperties.lawnMower ?? 'disabled');
    const [musicType, setMusicType] = useState(levelBuilder.levelProperties.levelMusic);

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

    useEffect(() => {
        levelBuilder.levelProperties.levelNumber = stageNumb;
        levelBuilder.levelProperties.description = stageDesc;
        levelBuilder.levelProperties.name = stageName;
        levelBuilder.levelProperties.levelMusic = musicType;
    }, [stageNumb, stageName, stageDesc, musicType]);

    return (
        <div className="flex flex-col items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
            <div className="flex flex-row w-full items-center justify-between border rounded-md px-4 py-2 gap-2">
                <Label>Level Number</Label>
                <Input
                    type="number"
                    placeholder="50"
                    defaultValue={stageNumb}
                    className="text-center w-20 font-mono align-left"
                    size={5}
                    onChange={(e) => setStageNumb(Number(e.target.value))}
                />
            </div>
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
            <WorldOptions stageType={stageType} />
            <div className="flex items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
                <Label>Music Type</Label>
                <Select value={musicType ?? undefined} onValueChange={(val) => setMusicType(val)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Music Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Music Type</SelectLabel>
                            <SelectItem value={'default'}>Default</SelectItem>
                            <SelectItem value={'minigame1'}>Minigame A</SelectItem>
                            <SelectItem value={'minigame2'}>Minigame B</SelectItem>
                            <SelectItem value={'zomboss'}>Zomboss</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <LevelUnlockSelector />
            <div className="flex flex-col w-full items-center justify-between border rounded-md px-4 py-2 gap-2">
                <Label>Name</Label>
                <Input
                    className="text-center"
                    value={stageName}
                    placeholder=""
                    onChange={(e) => {
                        setStageName(e.target.value);
                    }}
                />
            </div>
            <div className="flex flex-col w-full items-center justify-between border rounded-md px-4 py-2 gap-2">
                <Label>Description</Label>
                <Input
                    className="text-center"
                    value={stageDesc}
                    placeholder=""
                    onChange={(e) => {
                        setStageDesc(e.target.value);
                    }}
                />
            </div>
        </div>
    );
}

function WorldOptions({ stageType }: { stageType: StageModuleType }) {
    let content = null;

    if (stageType == StageModuleType.Pirate) {
        content = <h1>Hlelo there</h1>;
    }

    if (content == null) return null;
    else
        return (
            <div className="flex flex-col w-full justify-center items-center mt-4">
                <Label className="mb-2">World Options</Label>
                <div className="flex items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
                    {content}
                </div>
            </div>
        );
}
