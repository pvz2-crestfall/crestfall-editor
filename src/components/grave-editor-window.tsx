import { FloatingWindow } from '@/components/ui/floating-window';
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { levelState } from '@/lib/state';
import { PencilLine, PencilOff, Eraser } from 'lucide-react';
import { useEffect, useState } from 'react';

const gravestonePaths = import.meta.glob('/assets/gravestones/*.png', {
    base: '/assets/gravestones/',
    eager: true,
    import: 'default',
}) as Record<string, string>;

const gravestoneList: Record<string, { label: string; icon?: string }> = {
    default: { label: 'Default Tombstone', icon: 'gravestone_unknown' },
    gravestone_tutorial: { label: 'Basic Tombstone' },
    gravestone_egypt: { label: 'Egypt Tombstone' },
    gravestone_dark: { label: 'Dark Ages Tombstone' },
    gravestonePlantfoodOnDestruction: { label: 'Plant Food Tombstone' },
    gravestoneSunOnDestruction: { label: 'Sun Tombstone' },
};

export function GravestoneEditorWindow({
    onClose,
    onGridClick,
}: {
    onClose: () => void;
    onGridClick: (position: { row: number; col: number }, selectedTool: string, selectedVariant: string) => void;
}) {
    const setGridListener = levelState((s) => s.setGridListener);
    const [selectedGrave, setSelectedGrave] = useState('default');
    const [selectedTool, setSelectedTool] = useState('none');

    useEffect(() => {
        setGridListener((row, col) => {
            onGridClick({ row, col }, selectedTool, selectedGrave);
        });
        return () => {
            setGridListener(undefined);
        };
    }, [selectedGrave, selectedTool]);

    return (
        <FloatingWindow
            title="Gravestone Editor"
            defaultPosition={{ x: 150, y: 150 }}
            size={{ width: 360, height: 260 }}
            onClose={onClose}
            id="gravestone-editor-window"
        >
            <div className="w-full flex flex-row justify-between items-center border rounded-md px-4 py-2">
                <Label>Gravestone</Label>
                <Select value={selectedGrave} onValueChange={setSelectedGrave}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Gravestones" />
                    </SelectTrigger>
                    <SelectContent className="z-99999" position="popper">
                        <SelectGroup>
                            <SelectLabel>Gravestone Select</SelectLabel>
                            {Object.entries(gravestoneList).map(([key, data]) => (
                                <SelectItem key={key} value={key}>
                                    <div className="flex flex-row items-center gap-2">
                                        <div className="w-5">
                                            <img
                                                key={key}
                                                src={gravestonePaths[`./${data.icon ?? key}.png`]}
                                                className="h-full"
                                            />
                                        </div>
                                        {data.label}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="w-full flex flex-col gap-2 justify-between items-center border rounded-md px-4 py-2">
                <Label>Tool</Label>
                <ToggleGroup
                    type="single"
                    variant="outline"
                    size="sm"
                    onValueChange={setSelectedTool}
                    defaultValue={selectedTool}
                >
                    <ToggleGroupItem
                        value="none"
                        aria-label="Toggle none tool"
                        className="data-[state=on]:bg-muted-foreground/20"
                    >
                        <PencilOff />
                        None
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="place"
                        aria-label="Toggle place tool"
                        className="data-[state=on]:bg-muted-foreground/20"
                    >
                        <PencilLine />
                        Place
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="remove"
                        aria-label="Toggle remove tool"
                        className="data-[state=on]:bg-muted-foreground/20"
                    >
                        <Eraser />
                        Remove
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
        </FloatingWindow>
    );
}
