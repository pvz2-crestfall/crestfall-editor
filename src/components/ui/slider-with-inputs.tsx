import { Slider } from './slider';
import { OptionalNumberInput } from './optional-ninput';
import { cn } from '@/lib/utils';
import React from 'react';

export function SliderWithInputs({
    className,
    value,
    onValueChange,
    min,
    max,
}: {
    min?: number;
    max?: number;
    className?: string;
    value: [number, number];
    onValueChange: (value: [number, number]) => void;
}) {
    const [localValue, setLocalValue] = React.useState(value);

    React.useEffect(() => {
        setLocalValue(value);
    }, [value[0], value[1], value]);

    return (
        <div className={cn('flex w-full gap-1 h-8', className)}>
            <OptionalNumberInput
                optional={false}
                value={localValue[0]}
                onChange={(number) => {
                    setLocalValue([Number(number), localValue[1]]);
                    onValueChange([Number(number), localValue[1]]);
                }}
                className="w-10"
                min={min}
                max={max}
            />
            <Slider
                value={localValue}
                onValueChange={([newMin, newMax]) => {
                    setLocalValue([newMin, newMax]);
                    onValueChange([newMin, newMax]);
                }}
                min={min}
                max={max}
            />
            <OptionalNumberInput
                optional={false}
                value={localValue[1]}
                onChange={(number) => {
                    setLocalValue([localValue[0], Number(number)]);
                    onValueChange([localValue[0], Number(number)]);
                }}
                className="w-10"
                min={min}
                max={max}
            />
        </div>
    );
}
