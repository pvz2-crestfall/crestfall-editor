import React from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';

export function OptionalNumberInput({
    value,
    onChange,
    className,
}: {
    className?: string;
    value?: number;
    onChange: (val?: number) => void;
}) {
    const [localValue, setLocalValue] = React.useState(value ?? '');

    React.useEffect(() => {
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
