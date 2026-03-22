import { PlantSelector } from '@/components/plant-selector';
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

export function LevelUnlockSelector() {
    const levelBuilder = levelState((s) => s.levelBuilder);

    const [rewardType, setRewardType] = useState(levelBuilder.levelProperties.objdata.FirstRewardType);
    const [rewardParam, setRewardParam] = useState(levelBuilder.levelProperties.objdata.FirstRewardParam);

    useEffect(() => {
        let type;
        let param;

        if (rewardType == 'default') {
            type = undefined;
            param = undefined;
        } else if (rewardType == 'moneybag') {
            type = undefined;
            param = 'big_moneybag';
        } else if (rewardType == 'giftbox') {
            type = 'giftbox';
            param = undefined;
        } else if (rewardType == 'none') {
            type = 'none';
            param = 'none';
        } else {
            if (rewardType == 'unlock_plant' && rewardParam == undefined) {
                setRewardParam('peashooter');
            }

            type = rewardType;
            param = rewardParam;
        }

        levelBuilder.levelProperties.objdata.FirstRewardType = type;
        levelBuilder.levelProperties.objdata.FirstRewardParam = param;
    }, [rewardType, rewardParam]);

    return (
        <>
            <div className="flex items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
                <Label>Level Reward</Label>
                <Select value={rewardType ?? 'default'} onValueChange={(val) => setRewardType(val)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Unlock Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Unlock</SelectLabel>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="moneybag">Big Money Bag</SelectItem>
                            <SelectItem value="giftbox">Mystery Box</SelectItem>
                            <SelectItem value="unlock_plant">Plant Unlock</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {rewardType == 'unlock_plant' && (
                <div className="flex items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
                    <Label>Plant Unlock</Label>
                    <PlantSelector
                        buttonClassName="w-[180px]"
                        plantType={rewardParam ?? ''}
                        onSelect={setRewardParam}
                    />
                </div>
            )}
        </>
    );
}
