import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '../ui/select';
import { GravestoneIcon } from '../grave-editor-window';
import { gravestoneList } from '../grave-list';

export function AddGravestoneButton({ onValueChange }: { onValueChange: (val: string) => void }) {
    return (
        <Select value={''} onValueChange={onValueChange}>
            <SelectTrigger className="w-full flex justify-center items-center">
                <SelectValue placeholder="Add Gravestone" />
            </SelectTrigger>
            <SelectContent className="z-99999" position="popper">
                <SelectGroup>
                    <SelectLabel>Gravestone Select</SelectLabel>
                    {Object.entries(gravestoneList).map(([key, data]) => {
                        if (key == 'default') return;
                        return (
                            <SelectItem key={key} value={key}>
                                <div className="flex flex-row items-center gap-2">
                                    <GravestoneIcon type={key} size={5} />
                                    {data.label}
                                </div>
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
