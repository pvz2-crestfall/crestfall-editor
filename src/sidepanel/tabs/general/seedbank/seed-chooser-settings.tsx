import { Label } from '@/components/ui/label';
import { PlantSelectionMethod } from './selection-method';
import { PresetPlantList } from './preset-list';
import { OverrideSeedSlots } from './seedslot-count';
import { ExcludePlantList } from './plant-ban';

export function SeedChooserSettingsComponent() {
    return (
        <div className="flex flex-col gap-2 items-center justify-between rounded-md border px-4 py-2 font-mono text-sm w-full">
            <Label>Seed Chooser</Label>
            <div className="gap-1 w-[360px]">
                <div className="flex border rounded-md px-4 py-2">
                    <PlantSelectionMethod />
                </div>
                <div className="flex border rounded-md px-4 py-2">
                    <OverrideSeedSlots />
                </div>
                <div className="flex border rounded-md py-2">
                    <PresetPlantList />
                </div>
                <div className="flex border rounded-md py-2">
                    <ExcludePlantList />
                </div>
            </div>
        </div>
    );
}
