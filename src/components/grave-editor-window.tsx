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
import { gravestoneList } from './grave-list';

const gravestonePaths = import.meta.glob('/assets/gravestones/*.png', {
    base: '/assets/gravestones/',
    eager: true,
    import: 'default',
}) as Record<string, string>;

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
                <GravestoneSelector defaultValue={selectedGrave} onValueChange={setSelectedGrave} />
            </div>
            <div className="w-full flex flex-col gap-2 justify-between items-center border rounded-md px-4 py-2">
                <ToolSelectionGroup defaultValue={selectedTool} onValueChange={setSelectedTool}></ToolSelectionGroup>
            </div>
        </FloatingWindow>
    );
}

export function GravestoneSelector({
    defaultValue,
    onValueChange,
    excludeDefault,
}: {
    excludeDefault?: boolean;
    defaultValue: string;
    onValueChange: (val: string) => void;
}) {
    return (
        <Select value={defaultValue} onValueChange={onValueChange}>
            <SelectTrigger className="w-48">
                <SelectValue placeholder="Gravestones" />
            </SelectTrigger>
            <SelectContent className="z-99999" position="popper">
                <SelectGroup>
                    <SelectLabel>Gravestone Select</SelectLabel>
                    {Object.entries(gravestoneList).map(([key, data]) => {
                        if (key == 'default' && excludeDefault == true) return;

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

function ToolSelectionGroup({ ...props }: { defaultValue?: string; onValueChange?: (value: string) => void }) {
    return (
        <>
            <Label>Tool</Label>
            <ToggleGroup type="single" variant="outline" size="sm" {...props}>
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
        </>
    );
}

interface GravestoneIconProps {
    size?: number;
    type: string;
}

export function GravestoneIcon({ size = 5, type }: GravestoneIconProps) {
    const iconKey = gravestoneList[type]?.icon ?? type;
    const src = gravestonePaths[`./${iconKey}.png`];

    // fallback to a default gravestone if missing or invalid
    const fallbackSrc = gravestonePaths['./gravestone_unknown.png'];
    const imageSrc = src || fallbackSrc;

    return (
        <div style={{ width: `calc(var(--spacing) * ${size})` }}>
            <img
                src={imageSrc}
                alt={gravestoneList[type]?.label ?? type}
                className="h-full w-full object-contain"
                onError={(e) => {
                    // make sure broken paths revert automatically
                    (e.currentTarget as HTMLImageElement).src = fallbackSrc;
                }}
            />
        </div>
    );
}
