import React from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';

export function OptionalNumberInput({
    value,
    onChange,
    className,
    placeholder = 'Default',
    min,
    max,
    optional = true,
    ...attributes
}: {
    disabled?: boolean;
    className?: string;
    value?: number;
    min?: number;
    max?: number;
    optional?: boolean;
    placeholder?: string;
    onChange: (val?: number) => void;
}) {
    const [localValue, setLocalValue] = React.useState(value ?? '');

    React.useEffect(() => {
        setLocalValue(value ?? '');
    }, [value]);

    return (
        <Input
            className={cn('w-20 text-center', className)}
            placeholder={placeholder}
            type="number"
            value={localValue}
            onChange={(e) => {
                let val = e.target.value;

                if (max && max < Number(val)) val = max.toString();

                setLocalValue(val);
                onChange(val === '' ? undefined : Number(val));
            }}
            onBlur={(e) => {
                let val = e.target.value;
                if (val != '' || !optional) {
                    if (min && min > Number(val)) val = min.toString();
                    if (max && max < Number(val)) val = max.toString();
                }

                onChange(val === '' ? undefined : Number(val));
            }}
            {...attributes}
        />
    );
}
