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
import { SeedBankSelectionMethod } from '@/types/PVZTypes';
import { useEffect, useState } from 'react';

export function PlantSelectionMethod() {
    const levelBuilder = levelState((s) => s.levelBuilder);

    const [selectionMethod, setSelectionMethod] = useState(levelBuilder.seedBank.selectionMethod);

    useEffect(() => {
        levelBuilder.seedBank.selectionMethod = selectionMethod;
    }, [selectionMethod]);

    return (
        <div className="flex w-full items-center justify-between">
            <Label className="px-4 py-1">Selection Method</Label>

            <Select
                value={selectionMethod ?? ''}
                onValueChange={(val) =>
                    setSelectionMethod(val === 'disable' ? undefined : (val as SeedBankSelectionMethod))
                }
            >
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Disabled" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Sun Dropper</SelectLabel>
                        <SelectItem value={SeedBankSelectionMethod.Chooser}>Chooser</SelectItem>
                        <SelectItem value={SeedBankSelectionMethod.Preset}>Preset</SelectItem>
                        <SelectItem value={SeedBankSelectionMethod.Beghouled}>Beghouled</SelectItem>
                        <SelectItem value="disable">Disabled</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
