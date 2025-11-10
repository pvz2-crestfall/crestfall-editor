import { GravestoneIcon } from '@/components/grave-editor-window';
import { gravestoneList } from '@/components/grave-list';
import { PlacementEditorWindow } from '@/components/placement-editor-window';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { OptionalNumberInput } from '@/components/ui/optional-ninput';
import { SwitchWithLabel } from '@/components/ui/switch-with-label';
import { AddGravestoneButton } from '@/components/wave-editor/add-grave-button';
import { TileManager } from '@/lib/levelModules/tilemanager/tilemanager';
import type {
    GravestonePool,
    SpawnGravestonesWaveActionProps,
    WaveAction,
} from '@/lib/levelModules/wavemanager/wavetypes';
import { levelState } from '@/lib/state';
import { cn, fromRTID, RTIDTypes, toRTID } from '@/lib/utils';
import { ChevronRight, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState, type ReactNode } from 'react';

export function SpawnGravestonesWaveAction({
    waveaction,
}: {
    waveaction: WaveAction<SpawnGravestonesWaveActionProps>;
}) {
    const setGridData = levelState((s) => s.setGridData);
    const [GravestonePool, setGravestonePool] = useState(waveaction.data.GravestonePool);
    const [SpawnPositionsPool, setSpawnPositionsPool] = useState(waveaction.data.SpawnPositionsPool);

    useEffect(() => {
        waveaction.data.GravestonePool = GravestonePool;
    }, [GravestonePool]);
    useEffect(() => {
        waveaction.data.SpawnPositionsPool = SpawnPositionsPool;
    }, [SpawnPositionsPool]);
    const [placementWindowOpen, setPlacementWindowOpen] = useState(false);

    const addNewGravestone = (gravestone: string) => {
        const rtidValue = toRTID(gravestone, RTIDTypes.gridItem);
        if (GravestonePool.map((x) => x.Type).includes(rtidValue)) return;

        setGravestonePool((prev) => [...prev, { Count: 0, Type: rtidValue }]);
    };
    const removeGravestone = (index: number) => {
        setGravestonePool((prev) => prev.filter((_, i) => index != i));
    };

    const addNewPosition = ({ col, row }: { col: number; row: number }) => {
        setSpawnPositionsPool((prev) => [...prev, { mX: col, mY: row }]);
    };
    const removePosition = ({ col, row }: { col: number; row: number }) => {
        setSpawnPositionsPool((prev) => prev.filter((tile) => tile.mX != col || tile.mY != row));
    };

    // preview
    useEffect(() => {
        if (placementWindowOpen) {
            const gridPreview = new TileManager([]);
            SpawnPositionsPool.forEach((tile) => {
                gridPreview.setTile({ row: tile.mY, col: tile.mX }, { type: 'gravestone', variant: 'unknown' });
            });
            setGridData(gridPreview);
        }

        return () => {
            setGridData(undefined);
        };
    }, [placementWindowOpen, SpawnPositionsPool]);

    const onGridClick = useCallback(
        ({ row, col }: { row: number; col: number }, selectedTool: string) => {
            //  SpawnPositionsPool: { mX: number; mY: number }[];
            const tileIndex = SpawnPositionsPool.findIndex((tile) => tile.mX == col && tile.mY == row);

            // only add it to the list if no object with same coords exists
            if (selectedTool == 'place' && tileIndex == -1) {
                addNewPosition({ row, col });
            }

            // only attempt removal if the tile actually exists
            if (selectedTool == 'remove' && tileIndex != -1) {
                removePosition({ row, col });
            }
        },
        [SpawnPositionsPool],
    );

    return (
        <div className="flex flex-col w-full items-center justify-center">
            <WaveToggleables waveaction={waveaction} />

            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                <Label>Possible Spawns</Label>
                <Button variant="outline" onClick={() => setPlacementWindowOpen(true)}>
                    Open Editor
                </Button>

                {placementWindowOpen && (
                    <PlacementEditorWindow
                        onClose={() => setPlacementWindowOpen(false)}
                        onGridClick={onGridClick}
                    ></PlacementEditorWindow>
                )}
            </div>

            <div className="flex w-full items-center justify-center rounded-md px-4 py-2">
                <GravestonePoolList list={GravestonePool} onRemove={removeGravestone}>
                    <AddGravestoneButton onValueChange={addNewGravestone} />
                </GravestonePoolList>
            </div>
        </div>
    );
}

function WaveToggleables({ waveaction }: { waveaction: WaveAction<SpawnGravestonesWaveActionProps> }) {
    const [ShakeScreen, _setShakeScreen] = useState(waveaction.data.ShakeScreen ?? false);
    const [DisplacePlants, _setDisplacePlants] = useState(waveaction.data.DisplacePlants ?? false);
    const [RandomPlacement, _setRandomPlacement] = useState(waveaction.data.RandomPlacement ?? false);

    const setShakeScreen = (val: boolean) => {
        waveaction.data.ShakeScreen = val || undefined;
        _setShakeScreen(val);
    };
    const setDisplacePlants = (val: boolean) => {
        waveaction.data.DisplacePlants = val || undefined;
        _setShakeScreen(val);
    };
    const setRandomPlacement = (val: boolean) => {
        waveaction.data.RandomPlacement = val || undefined;
        _setShakeScreen(val);
    };

    return (
        <>
            <SwitchWithLabel label="Screen Shake" default={ShakeScreen} onChange={setShakeScreen} />
            <SwitchWithLabel label="Displace Plants" default={DisplacePlants} onChange={setDisplacePlants} />
            <SwitchWithLabel label="Random Placement" default={RandomPlacement} onChange={setRandomPlacement} />
        </>
    );
}

function GravestonePoolList({
    list,
    disableRow,
    onRemove,
    children,
}: {
    list: GravestonePool[];
    disableRow?: boolean;
    onRemove: (index: number) => void;
    children?: ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full w-max-128">
            <div className="w-full flex flex-row items-center justify-center">
                <CollapsibleTrigger asChild className="flex flex-row">
                    <div>
                        <Label className="text-sm">Grave Counts</Label>
                        <Button variant="ghost" size="icon">
                            <ChevronRight
                                className={cn(
                                    'transition-transform duration-200 ease-in-out',
                                    isOpen ? 'rotate-90' : '',
                                )}
                            />
                        </Button>
                    </div>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="flex flex-col">
                <ul className="w-full">
                    {list.map((grave, index) => {
                        const graveType = fromRTID(grave.Type).name;

                        return (
                            <li
                                key={index}
                                className="flex items-center justify-between rounded-md border p-2 bg-primary-foreground shadow-sm"
                            >
                                <OptionalNumberInput
                                    disabled={disableRow}
                                    className={cn('w-12', disableRow && 'opacity-50 cursor-not-allowed')}
                                    value={grave.Count}
                                    min={0}
                                    max={99}
                                    placeholder="0"
                                    onChange={(val) => (grave.Count = val ?? 0)}
                                />

                                <div className="flex flex-row items-center justify-between gap-2">
                                    <span className="break-all">{gravestoneList[graveType].label}</span>
                                    <GravestoneIcon type={graveType} size={5} />
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onRemove(index)}
                                    className="text-muted-foreground hover:text-destructive hover:bg-destructive"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </li>
                        );
                    })}
                    {children}
                </ul>
            </CollapsibleContent>
        </Collapsible>
    );
}
