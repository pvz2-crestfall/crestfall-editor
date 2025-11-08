import { Card, CardContent } from '@/components/ui/card';
import { levelState } from './lib/state';
import { SidePanel } from './sidepanel/sidepanel';
import { LevelPreview } from './preview/preview';
import { Button } from './components/ui/button';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';
import { useState } from 'react';

// JSON preview component
function DataPreview() {
    const { levelBuilder, reloadComponents } = levelState();

    return (
        <Card className="w-full max-w-3xl h-full">
            <CardContent className="p-4 h-full overflow-auto">
                <div className="flex flex-row justify-between">
                    <h2 className="text-lg font-semibold mb-2">Level Data Preview</h2>
                    <Button size={'lg'} onClick={() => reloadComponents()}>
                        Build
                    </Button>
                </div>
                <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto h-full">
                    {JSON.stringify(levelBuilder.build(), null, 2)}
                </pre>
            </CardContent>
        </Card>
    );
}

import { useEffect } from 'react';

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

    return (
        <button onClick={() => setIsDark((prev) => !prev)} className="px-3 py-1 rounded-md border">
            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
    );
}

export default function App() {
    const [isDev, setIsDev] = useState(import.meta.env.PROD ? false : true);

    return (
        <div>
            <div className="flex h-screen p-4 gap-4">
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <LevelPreview />
                    <div className="flex-1 flex flex-row items-center justify-center gap-4">
                        <Label>Toggle Dev Mode</Label>
                        <Switch defaultChecked={isDev} onCheckedChange={setIsDev} />
                        <ThemeToggle />
                    </div>
                </div>

                <div className="w-lg">
                    <SidePanel />
                </div>
            </div>

            {isDev && (
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <DataPreview />
                </div>
            )}
        </div>
    );
}
