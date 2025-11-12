import { Card, CardContent } from '@/components/ui/card';
import { levelState } from './lib/state';
import { SidePanel } from './sidepanel/sidepanel';
import { LevelPreview } from './preview/preview';
import { Button } from './components/ui/button';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';
import { useState, useEffect } from 'react';

// JSON preview component
function DataPreview() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const reloadLevelBuilder = levelState((s) => s.reloadLevelBuilder);

    return (
        <Card className="w-full max-w-3xl h-full">
            <CardContent className="p-4 h-full overflow-auto">
                <div className="flex flex-row justify-between">
                    <h2 className="text-lg font-semibold mb-2">Level Data Preview</h2>
                    <Button size={'lg'} onClick={() => reloadLevelBuilder()}>
                        Build
                    </Button>
                </div>
                <pre className="bg-background p-4 rounded-md text-sm overflow-auto h-full">
                    {JSON.stringify(levelBuilder.build(), null, 2)}
                </pre>
            </CardContent>
        </Card>
    );
}

function ThemeToggle() {
    const storedTheme = localStorage.getItem('darkTheme');
    const theme = storedTheme ?? window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [isDark, setIsDark] = useState(JSON.parse(theme.toString()));

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('darkTheme', JSON.stringify(isDark));
    }, [isDark]);

    return (
        <button onClick={() => setIsDark((prev: any) => !prev)} className="px-3 py-1 rounded-md border">
            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
    );
}

export default function App() {
    const [isDev, setIsDev] = useState(import.meta.env.PROD ? false : true);

    useEffect(() => {
        sessionStorage.clear();
        console.log('sessionStorage cleared on page reload.');
    }, []);

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
