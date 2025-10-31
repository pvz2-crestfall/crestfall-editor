import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { levelState } from '@/lib/state';
import { useState } from 'react';
import { PlantSearchCombobox } from '../../../../components/ui/plant-search';
import { Plants } from '@/lib/plants';
import { X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export function ExcludePlantList() {
    const { levelBuilder } = levelState();

    const [items, setItems] = useState(levelBuilder.seedBank.excludeList);
    const [newItem, setNewItem] = useState('');

    const setExcludeList = (plants: string[]) => {
        levelBuilder.seedBank.excludeList = plants;
        setItems(plants);
    };
    const addItem = () => {
        if (!newItem.trim()) return;
        setExcludeList([...levelBuilder.seedBank.excludeList, newItem]);
        setNewItem('');
    };
    const removeItem = (id: string) => {
        setExcludeList(levelBuilder.seedBank.excludeList.filter((item) => item !== id));
    };

    const toggleExcludeSunProducers = (toggle: boolean) => {
        levelBuilder.seedBank.excludeSunProducers = toggle;
    };

    return (
        <div className="py-1 px-2 space-y-2">
            <Label className="item-center justify-center">Banned Plants</Label>

            <div className=""></div>

            <div className="flex flex-row w-full items-center justify-center">
                <Label className="px-4 py-1">Exclude Sun Producers</Label>
                <Switch
                    defaultChecked={levelBuilder.seedBank.excludeSunProducers}
                    onCheckedChange={toggleExcludeSunProducers}
                    className="data-[state=checked]:bg-blue-500"
                />
            </div>

            <div className="flex gap-2 justify-centered">
                <PlantSearchCombobox onChange={(val) => setNewItem(val)} value={newItem ?? ''} />
                <Button onClick={addItem}>Add</Button>
            </div>

            <div className="flex border rounded-md p-1 flex-wrap gap-2">
                {items.length > 0 ? (
                    items.map((plant) => (
                        <div className="flex flex-col border bg-gray-200 rounded-sm px-1 py-1">
                            <div className="flex items-center gap-2">
                                <span>
                                    {Plants.find((x) => x.codename == plant)?.displayName ?? plant}
                                </span>
                                <Button variant="ghost" size="sm" onClick={() => removeItem(plant)}>
                                    <X className="h-2 w-2" />
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="flex flex-row w-full items-center justify-center text-gray-500">
                        No Plants Banned.
                    </h1>
                )}
            </div>
        </div>
    );
}
