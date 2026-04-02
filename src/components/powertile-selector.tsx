import { PowerTileList } from '@/lib/plants';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { TileIcon } from './ui/asset-icons';

export function PowertileSelector({
    defaultValue,
    onValueChange,
}: {
    defaultValue: string;
    onValueChange: (val: string) => void;
}) {
    return (
        <Select value={defaultValue} onValueChange={onValueChange}>
            <SelectTrigger className="w-48">
                <SelectValue placeholder="Powertiles" />
            </SelectTrigger>
            <SelectContent className="z-9999" position="popper">
                <SelectGroup>
                    <SelectLabel>Powertile Select</SelectLabel>
                    {PowerTileList.map((tile) => {
                        return (
                            <SelectItem key={tile.codename} value={tile.codename}>
                                <div className="flex flex-row items-center gap-2">
                                    <TileIcon type={tile.codename} size={5} />
                                    {tile.displayName}
                                </div>
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
