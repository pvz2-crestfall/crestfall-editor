import { cn } from '@/lib/utils';
import { Label } from './label';
import { Switch } from './switch';

export function SwitchWithLabel({
    default: defaultChecked,
    onChange: onCheckedChange,
    label,
    className,
}: {
    className?: string;
    default: boolean | undefined;
    onChange: (val: boolean) => void;
    label: string;
}) {
    return (
        <div className={cn('flex w-full items-center justify-between border rounded-md px-4 py-2', className)}>
            <Label>{label}</Label>
            <Switch defaultChecked={defaultChecked} onCheckedChange={onCheckedChange}></Switch>
        </div>
    );
}
