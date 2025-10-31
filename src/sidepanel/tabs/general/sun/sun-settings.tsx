import { Input } from '@/components/ui/input';
import { levelState } from '@/lib/state';
import { SunDropperType } from '@/types/PVZTypes';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function SunSettingsComponent() {
    const { levelBuilder, reloadComponents } = levelState();

    const setStartingSun = (sun: number) => {
        levelBuilder.startingSun = sun;
        reloadComponents();
    };

    const allowBonusSun = (toggle: boolean) => {
        levelBuilder.allowBonusSun = toggle;
        reloadComponents();
    };

    const setDropperType = (type?: SunDropperType) => {
        levelBuilder.sunDropper = type;
        reloadComponents();
    };

    return (
        <div className="flex flex-col gap-2 items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
            <Label>Sun Options</Label>
            <div className="gap-1 w-[320px]">
                <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                    <Label className="px-4 py-1">Starting Sun</Label>
                    <Input
                        type="number"
                        placeholder="0"
                        defaultValue={levelBuilder.startingSun}
                        className="text-center w-auto font-mono align-left"
                        size={5}
                        onChange={(e) => setStartingSun(Number(e.target.value))}
                    />
                </div>

                <div className="flex flex-col border rounded-md px-4 py-2">
                    <div className="flex w-full items-center justify-between">
                        <Label className="px-4 py-1">Sun Dropper</Label>

                        <Select
                            value={levelBuilder.sunDropper ?? ''}
                            onValueChange={(val) =>
                                setDropperType(
                                    val === 'disable' ? undefined : (val as SunDropperType),
                                )
                            }
                        >
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Disabled" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Sun Dropper</SelectLabel>
                                    <SelectItem value={SunDropperType.Fastest}>Fastest</SelectItem>
                                    <SelectItem value={SunDropperType.Fast}>Fast</SelectItem>
                                    <SelectItem value={SunDropperType.Default}>Default</SelectItem>
                                    <SelectItem value={SunDropperType.Slow}>Slow</SelectItem>
                                    <SelectItem value={SunDropperType.Slowest}>Slowest</SelectItem>
                                    <SelectItem value="disable">Disabled</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex items-center justify-between border rounded-md px-4 py-2">
                    <Label className="px-4 py-1">Allow Bonus Sun</Label>
                    <Switch
                        id="bonus-sun-toggle"
                        defaultChecked={levelBuilder.allowBonusSun}
                        onCheckedChange={allowBonusSun}
                        className="data-[state=checked]:bg-blue-500"
                    />
                </div>
            </div>
        </div>
    );
}
