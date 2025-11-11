import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TabSwitch } from '@/components/ui/tabswitcher';
import { saveLevel, loadLevelFile } from '@/lib/fileManager';
import { SidepanelGeneralTab } from './tabs/general';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidepanelModulesTab } from './tabs/modules';
import { WaveManagerTab } from './tabs/wavemanager';

export function SidePanel() {
    const exportAndImportTab = (
        <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold mb-2">File</h2>
            <Button onClick={() => saveLevel()}>💾 Save Level</Button>
            <label className="cursor-pointer">
                <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) loadLevelFile(file);
                    }}
                />

                <div className="flex items-center justify-center p-2 border rounded-md hover:bg-primary/10 transition">
                    📂 Load Level
                </div>
            </label>
        </div>
    );

    return (
        <Card className="p-0 h-full">
            <ScrollArea className="h-full rounded-md border">
                <CardContent className="flex flex-col gap-3">
                    <TabSwitch
                        tabs={[
                            { label: 'General Properties', content: SidepanelGeneralTab() },
                            { label: 'Level Modules', content: SidepanelModulesTab() },
                            { label: 'Wave Manager', content: WaveManagerTab() },
                            { label: 'Save/Load', content: exportAndImportTab },
                        ]}
                    />
                </CardContent>
            </ScrollArea>
        </Card>
    );
}
