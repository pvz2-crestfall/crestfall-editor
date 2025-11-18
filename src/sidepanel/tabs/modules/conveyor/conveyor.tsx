import { TabSwitch } from '@/components/ui/tabswitcher';
import { ConveyorPlants } from './plants';
import { ConveyorPowerTiles } from './powertiles';
import { ConveyorSettings } from './settings';
import { ModuleTemplate } from '../template';

export function ConveyorLevelModule() {
    return (
        <ModuleTemplate title="Conveyor Module">
            <TabSwitch
                tabs={[
                    { label: 'Settings', content: ConveyorSettings() },
                    { label: 'Plants', content: ConveyorPlants() },
                    { label: 'Power Tiles', content: ConveyorPowerTiles() },
                ]}
            />
        </ModuleTemplate>
    );
}
