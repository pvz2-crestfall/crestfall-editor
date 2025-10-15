import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TabSwitch } from '@/components/ui/tabswitcher';
import { saveLevel, loadLevelFile } from '@/lib/fileManager';
import { levelState } from '@/lib/state';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { SidepanelGeneralTab } from './tabs/general';

export function SidePanel() {
    const state = levelState();

    const waveManagerTab = (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">Make changes to your account here.</TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
    );

    const exportAndImportTab = (
        <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold mb-2">File</h2>
            <Button onClick={() => saveLevel(state)}>💾 Save Level</Button>
            <label className="cursor-pointer">
                <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) loadLevelFile(file, state);
                    }}
                />

                <div className="flex items-center justify-center p-2 border rounded-md hover:bg-gray-100 transition">
                    📂 Load Level
                </div>
            </label>
        </div>
    );

    return (
        <Card className="p-4 h-full">
            <CardContent className="flex flex-col gap-3">
                <TabSwitch
                    tabs={[
                        { label: 'General Properties', content: SidepanelGeneralTab() },
                        { label: 'Settings', content: <p>Here are your settings.</p> },
                        { label: 'Wave Manager', content: waveManagerTab },
                        { label: 'Save/Load', content: exportAndImportTab },
                    ]}
                />
            </CardContent>
        </Card>
    );
}
