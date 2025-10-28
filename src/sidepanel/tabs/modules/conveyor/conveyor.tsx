import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { TabSwitch } from '@/components/ui/tabswitcher';
import { ConveyorPlants } from './plants';
import { ConveyorSettings } from './settings';
import { ConveyorPowerTiles } from './powertiles';

export function ConveyorLevelModule() {
    return (
        <Card className="py-4 h-full">
            <CardTitle className="flex items-center justify-center">Conveyor Module</CardTitle>
            <CardContent className="flex flex-col">
                <TabSwitch
                    tabs={[
                        { label: 'Settings', content: ConveyorSettings() },
                        { label: 'Plants', content: ConveyorPlants() },
                        { label: 'Power Tiles', content: ConveyorPowerTiles() },
                    ]}
                />
            </CardContent>
        </Card>
    );
}
