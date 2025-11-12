import { PlacementEditorWindow } from '@/components/placement-editor-window';
import { Button } from '@/components/ui/button';
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
import {
    ModernPortalType,
    PortalTypes,
    type SpawnModernPortalsWaveActionProps,
    type WaveAction,
} from '@/lib/levelModules/wavemanager/wavetypes';
import { gridState } from '@/lib/state';
import { getPortalImage } from '@/preview/render-tile';
import { useEffect, useMemo, useState } from 'react';
import { getActionId } from './actions';

const PortalSelectorGroups = [
    {
        name: 'Main World Portals',
        items: [
            { value: ModernPortalType.Egypt, label: 'Egypt' },
            { value: ModernPortalType.EgyptAlt, label: 'Egypt Alt' },
            { value: ModernPortalType.Pirate, label: 'Pirate Seas' },
            { value: ModernPortalType.WildWest, label: 'Wild West' },
            { value: ModernPortalType.FarFuture, label: 'Far Future' },
            { value: ModernPortalType.FarFutureAlt, label: 'Far Future Alt' },
            { value: ModernPortalType.DarkAges, label: 'Dark Ages' },
            { value: ModernPortalType.BigWaveBeach, label: 'Big Wave Beach' },
            { value: ModernPortalType.FrostbiteCaves, label: 'Ice Age' },
            { value: ModernPortalType.LostCity, label: 'Lost City' },
            { value: ModernPortalType.NeonMixtapeTour, label: 'Neon Mixtape Tour' },
            { value: ModernPortalType.JurassicMarsh, label: 'Jurassic Marsh' },
            { value: ModernPortalType.ModernDay, label: 'Modern Day' },
        ],
    },
    {
        name: 'Endless-Zone Portals',
        items: [
            { value: ModernPortalType.dangerroom_egypt, label: 'Endless-Zone Egypt' },
            { value: ModernPortalType.dangerroom_pirate, label: 'Endless-Zone Pirate' },
            { value: ModernPortalType.dangerroom_west, label: 'Endless-Zone Wild West' },
            { value: ModernPortalType.dangerroom_future, label: 'Endless-Zone Far Future' },
            { value: ModernPortalType.dangerroom_dark, label: 'Endless-Zone Dark Ages' },
            { value: ModernPortalType.dangerroom_beach, label: 'Endless-Zone BWB' },
            { value: ModernPortalType.dangerroom_iceage, label: 'Endless-Zone Ice Age' },
            { value: ModernPortalType.dangerroom_lostcity, label: 'Endless-Zone Lost City' },
            { value: ModernPortalType.dangerroom_eighties, label: 'Endless-Zone NMT' },
            { value: ModernPortalType.dangerroom_dino, label: 'Endless-Zone Jurassic' },
        ],
    },
    {
        name: 'Misc Portals',
        items: [
            { value: ModernPortalType.Circus, label: 'Circus' },
            { value: ModernPortalType.Rome, label: 'Rome' },
            { value: ModernPortalType.Chicken, label: 'Chicken' },
        ],
    },
];

export function SpawnModernPortalAction({ waveaction }: { waveaction: WaveAction<SpawnModernPortalsWaveActionProps> }) {
    const id = getActionId(waveaction);
    const updateGrid = gridState((s) => s.updateGrid);

    const [placementWindowOpen, setPlacementWindowOpen] = useState(false);
    const [PortalColumn, setPortalColumn] = useState(waveaction.data.PortalColumn);
    const [PortalRow, setPortalRow] = useState(waveaction.data.PortalRow);
    const [PortalType, setPortalType] = useState(waveaction.data.PortalType);

    useEffect(() => {
        waveaction.data.PortalColumn = PortalColumn;
        waveaction.data.PortalRow = PortalRow;
    }, [PortalColumn, PortalRow]);

    useEffect(() => {
        waveaction.data.PortalType = PortalType;
    }, [PortalType]);

    const onGridClick = ({ row, col }: { row: number; col: number }, _selectedTool: string) => {
        setPortalRow(row);
        setPortalColumn(col);
        updateGrid();
    };

    const memoizedPortalSelector = useMemo(() => PortalSelector({ PortalType, setPortalType }), [PortalType]);

    return (
        <div className="flex flex-col w-full items-center justify-center gap-2">
            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                <Label>Portal Type</Label>
                {memoizedPortalSelector}
            </div>
            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                <Label>Portal Location</Label>
                <Button variant="outline" onClick={() => setPlacementWindowOpen(true)}>
                    Open Editor
                </Button>

                {placementWindowOpen && (
                    <PlacementEditorWindow
                        title="Portal Location Editor"
                        id={id}
                        onClose={() => setPlacementWindowOpen(false)}
                        onGridClick={onGridClick}
                        onFocus={updateGrid}
                    ></PlacementEditorWindow>
                )}
            </div>
        </div>
    );
}

function PortalSelector({ PortalType, setPortalType }: { PortalType: ModernPortalType; setPortalType: any }) {
    return (
        <Select value={PortalType ?? undefined} onValueChange={(val) => setPortalType(val as ModernPortalType)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Portal Type" />
            </SelectTrigger>
            <SelectContent>
                {PortalSelectorGroups.map((group) => (
                    <SelectGroup>
                        <SelectLabel>{group.name}</SelectLabel>
                        {group.items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                <div className="flex flex-row items-center gap-2">
                                    <PortalIcon type={PortalTypes[item.value]} size={5} />
                                    {item.label}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                ))}
            </SelectContent>
        </Select>
    );
}

interface PortalIconProps {
    size?: number;
    type: string;
}

export function PortalIcon({ size = 5, type }: PortalIconProps) {
    const imageSrc = getPortalImage(type);

    return (
        <div style={{ width: `calc(var(--spacing) * ${size})` }}>
            <img src={imageSrc} alt={type} className="h-full w-full object-contain" />
        </div>
    );
}
