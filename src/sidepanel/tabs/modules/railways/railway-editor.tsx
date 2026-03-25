import { ModuleTemplate } from '../template';
import { Button } from '@/components/ui/button';
import { levelState } from '@/lib/state/levelstate';
import { useEffect, useState } from 'react';
import { RailcartsEditorWindow } from './railway-placement-window';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { gridState } from '@/lib/state/gridstate';

export function RailcartsModule() {
    const reloadBackground = gridState((s) => s.updateGrid);
    const levelBuilder = levelState((s) => s.levelBuilder);

    const [isWindowOpen, setWindowOpen] = useState(false);
    const [railType, setRailType] = useState(levelBuilder.railcarts.railType);

    useEffect(() => {
        reloadBackground();
        levelBuilder.railcarts.railType = railType;
    }, [railType]);

    const onGridClick = ({ col, row }: { row: number; col: number }, selectedTool: string) => {
        let selectedRailcartTile = levelBuilder.railcarts.railGrid[col][row];

        if (selectedTool == 'rail') {
            selectedRailcartTile.rail = true;
        }
        if (selectedTool == 'cart') {
            selectedRailcartTile.cart = true;
        }
        if (selectedTool == 'remove') {
            if (selectedRailcartTile.cart) {
                selectedRailcartTile.cart = false;
            } else {
                selectedRailcartTile.rail = false;
            }
        }
    };

    return (
        <ModuleTemplate title="Railcarts Module">
            <div className="flex flex-row w-full items-center justify-between border rounded-md px-4 py-2 gap-2">
                <Label>Railcart Type</Label>
                <Select value={railType} onValueChange={setRailType}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Railcarts" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectGroup>
                            <SelectLabel>Railway Theme</SelectLabel>
                            <SelectItem value="railcart_cowboy">Wild West Railcarts</SelectItem>
                            <SelectItem value="railcart_tutorial">Modern Railcarts</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-row w-full items-center justify-between border rounded-md px-4 py-2 gap-2">
                <Label>Placement Editor</Label>

                <Button variant="outline" onClick={() => setWindowOpen(true)}>
                    Open Editor
                </Button>

                {isWindowOpen && (
                    <RailcartsEditorWindow onClose={() => setWindowOpen(false)} onGridClick={onGridClick} />
                )}
            </div>
        </ModuleTemplate>
    );
}
