import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible';
import { StageModuleType } from '@/types/PVZTypes';
import { ChevronUp } from 'lucide-react';
import React from 'react';
import { levelState } from '@/lib/state';
import { Label } from '@/components/ui/label';

export function SidepanelGeneralTab() {
    return (
        <div className="flex flex-col gap-1">
            <WorldTypeSelector />
            <SunSettingsDecider />
        </div>
    );
}

function WorldTypeSelector() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const setStage = levelState((s) => s.setStage);

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

function SunSettingsDecider() {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <div id="worldoptions" className="flex items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
            <Label>Sun Options</Label>
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex w-full flex-col gap-2">
                <div className="flex border px-4 py-1 items-center justify-between gap-4">
                    <h4 className="text-sm font-semibold">General Properties</h4>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                            <ChevronUp
                                className={'size-10' + `transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            />
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                </div>

                <CollapsibleContent
                    className={`
            w-full
            overflow-hidden
            transition-[max-height,opacity]
            duration-300
            ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
                >
                    <div className="flex flex-col gap-2 w-full">
                        <div className="rounded-md border px-4 py-2 font-mono text-sm w-full">@radix-ui/colors</div>
                        <div className="rounded-md border px-4 py-2 font-mono text-sm w-full">@stitches/react</div>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}
