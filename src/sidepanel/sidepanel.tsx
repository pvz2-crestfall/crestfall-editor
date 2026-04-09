import { Card, CardContent } from '@/components/ui/card';
import { TabSwitch } from '@/components/ui/tabswitcher';
import { SidepanelGeneralTab } from './tabs/general';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidepanelModulesTab } from './tabs/modules';
import { WaveManagerTab } from './tabs/wavemanager';
import { exportAndImportTab } from './tabs/files/filemanager';

export function SidePanel() {
    return (
        <Card className="p-0 h-full">
            <ScrollArea className="h-full rounded-md border">
                <CardContent className="flex flex-col gap-3">
                    <TabSwitch
                        tabs={[
                            { label: 'General Properties', content: SidepanelGeneralTab() },
                            { label: 'Level Modules', content: SidepanelModulesTab() },
                            // { label: 'Tile Editor', content: SidepanelTileEditorTab() },
                            { label: 'Wave Manager', content: WaveManagerTab() },
                            { label: 'Save/Load', content: exportAndImportTab() },
                        ]}
                    />
                </CardContent>
            </ScrollArea>
        </Card>
    );
}
