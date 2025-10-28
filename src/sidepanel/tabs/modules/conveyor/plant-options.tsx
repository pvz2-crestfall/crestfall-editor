import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { PlantDisplayNames } from '@/lib/plants';
import { cn } from '@/lib/utils';
import type { ConveyorSeedBankPlantObject } from '@/types/PVZTypes';
import { useState, useEffect } from 'react';

interface ConveyorPlantOptionsContentProps {
    plant: ConveyorSeedBankPlantObject;
    index: number;
    items: ConveyorSeedBankPlantObject[];
    setPlants: (plants: ConveyorSeedBankPlantObject[]) => void;
}

export function ConveyorPlantOptionsContent({ plant, index, items, setPlants }: ConveyorPlantOptionsContentProps) {
    const updatePlant = (field: keyof ConveyorSeedBankPlantObject, val?: number | boolean) => {
        const updated = [...items];
        updated[index] = { ...updated[index], [field]: val };
        setPlants(updated);
    };

    function EditableProperty({
        label,
        field,
        className,
    }: {
        label: string;
        className?: string;
        field: keyof ConveyorSeedBankPlantObject;
    }) {
        const value = plant[field] as number;
        console.log(label, field);
        console.log(value);
        return (
            <div className={cn('flex flex-row items-center space-x-2 justify-center', className)}>
                <Label className="w-[50%] text-nowrap">{label}</Label>
                <OptionalNumberInput className="w-[50%]" value={value} onChange={(val) => updatePlant(field, val)} />
            </div>
        );
    }

    return (
        <div className="w-full space-y-1">
            <h4 className="flex items-center justify-center font-semibold">{PlantDisplayNames[plant.PlantType]} Options</h4>
            <Separator className="my-4" />
            <div className="flex flex-row justify-between">
                <EditableProperty label="Weight:" field="Weight" className="w-[48%]" />
                <EditableProperty label="Level:" field="Level" className="w-[48%]" />
            </div>
            <div className="flex flex-row justify-between">
                <EditableProperty label="Max Count:" field="MaxCount" className="w-[48%]" />
                <EditableProperty label="Max Factor:" field="MaxWeightFactor" className="w-[48%]" />
            </div>
            <div className="flex flex-row justify-between">
                <EditableProperty label="Min Count:" field="MinCount" className="w-[48%]" />
                <EditableProperty label="Min Factor:" field="MinWeightFactor" className="w-[48%]" />
            </div>
            <div className="flex flex-row justify-between">
                <EditableProperty label="Max Delivered:" field="MaxDelivered" className="w-[48%]" />
                <div className="flex flex-row space-x-2 items-center justify-center w-[48%]">
                    <Label className="w-[50%] text-nowrap">Always Boosted:</Label>
                    <Switch
                        id="bonus-sun-toggle"
                        checked={!!plant.ForceBoosted}
                        onCheckedChange={(val) => updatePlant('ForceBoosted', val)}
                        className="data-[state=checked]:bg-blue-500"
                    />
                </div>
            </div>
        </div>
    );
}

function OptionalNumberInput({
    value,
    onChange,
    className,
}: {
    className?: string;
    value?: number;
    onChange: (val?: number) => void;
}) {
    const [localValue, setLocalValue] = useState(value ?? '');

    useEffect(() => {
        setLocalValue(value ?? '');
    }, [value]);

    return (
        <Input
            className={cn('w-20 text-center', className)}
            placeholder="Default"
            type="number"
            value={localValue}
            onChange={(e) => {
                const val = e.target.value;
                setLocalValue(val); // keep editing locally
            }}
            onBlur={(e) => {
                const val = e.target.value.trim();
                onChange(val === '' ? undefined : Number(val));
            }}
        />
    );
}
