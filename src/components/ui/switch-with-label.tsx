import { Label } from './label';
import { Switch } from './switch';

export function SwitchWithLabel({
    default: defaultChecked,
    onChange: onCheckedChange,
    label,
}: {
    default: boolean;
    onChange: (val: boolean) => void;
    label: string;
}) {
    return (
        <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
            <Label>{label}</Label>
            <Switch defaultChecked={defaultChecked} onCheckedChange={onCheckedChange}></Switch>
        </div>
    );
}
