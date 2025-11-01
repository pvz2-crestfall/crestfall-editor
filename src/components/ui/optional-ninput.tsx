import React from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';

export function OptionalNumberInput({
    value,
    onChange,
    className,
    placeholder = 'Default',
    ...attributes
}: {
    className?: string;
    value?: number;
    min?: number;
    max?: number;
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
                const val = e.target.value;
                setLocalValue(val);
                onChange(val === '' ? undefined : Number(val));
            }}
            onBlur={(e) => {
                const val = e.target.value.trim();
                onChange(val === '' ? undefined : Number(val));
            }}
            {...attributes}
        />
    );
}
