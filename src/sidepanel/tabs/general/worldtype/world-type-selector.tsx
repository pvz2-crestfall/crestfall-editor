import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { levelState } from '@/lib/state';
import { StageModuleType } from '@/types/PVZTypes';

export function WorldTypeSelector() {
    const { levelBuilder, reloadComponents } = levelState();

    const setStage = (stage: StageModuleType) => {
        levelBuilder.stageType = stage;
        reloadComponents();
    };

    return (
        <div className="flex items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
            <Label>World Type</Label>
            <Select value={levelBuilder.stageType ?? undefined} onValueChange={setStage}>
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
    );
}
