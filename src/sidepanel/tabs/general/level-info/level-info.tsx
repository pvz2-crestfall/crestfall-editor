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
import { levelState } from '@/lib/state/levelstate';
import { useEffect, useState } from 'react';
import { LevelUnlockSelector } from './level-reward';
import { Separator } from '@/components/ui/separator';

export function LevelInfo() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const [stageNumb, setStageNumb] = useState(levelBuilder.levelProperties.levelNumber);
    const [stageName, setStageName] = useState(levelBuilder.levelProperties.name);
    const [stageDesc, setStageDesc] = useState(levelBuilder.levelProperties.description);
    const [musicType, setMusicType] = useState(levelBuilder.levelProperties.levelMusic);

    useEffect(() => {
        levelBuilder.levelProperties.levelNumber = stageNumb;
        levelBuilder.levelProperties.description = stageDesc;
        levelBuilder.levelProperties.name = stageName;
        levelBuilder.levelProperties.levelMusic = musicType;
    }, [stageNumb, stageName, stageDesc, musicType]);

    return (
        <div className="flex flex-col items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
            <Label className="pb-2">Level Properties</Label>

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

            <Separator className="m-2"></Separator>

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
