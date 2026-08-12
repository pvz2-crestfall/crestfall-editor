import { Card, CardContent } from '@/components/ui/card';
import { levelState } from './lib/state/levelstate';
import { SidePanel } from './sidepanel/sidepanel';
import { LevelPreview } from './preview/preview';
import { Button } from './components/ui/button';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';
import { useState, useEffect, useReducer } from 'react';
import { useOnPageLeave } from './lib/utils';
import { autosave } from './lib/fileManager';

// JSON preview component
function DataPreview() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    return (
        <Card className="w-full max-w-3xl">
            <CardContent className="p-3 sm:p-4 flex flex-col gap-3">
                <div className="flex flex-row items-center justify-between gap-2">
                    <h2 className="text-base sm:text-lg font-semibold">Level Data Preview</h2>
                    <Button size="sm" onClick={forceUpdate}>
                        Build
                    </Button>
                </div>
                <pre className="bg-muted p-3 sm:p-4 rounded-md text-xs sm:text-sm overflow-x-auto max-h-[300px] sm:max-h-[400px] font-mono whitespace-pre-wrap break-all">
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
    const [isDev, setIsDev] = useState(false);
    const levelBuilder = levelState((s) => s.levelBuilder);

    useOnPageLeave(() => autosave(levelBuilder));

    return (
        <div className="flex min-w-md">
            <div className="flex flex-col h-screen lg:flex-row gap-4 w-full">
                <div className="flex-1 flex flex-col items-center justify-center gap-4 w-full">
                    <div className="w-full flex justify-center ">
                        <LevelPreview />
                    </div>

                    <div className="flex-1 flex flex-row items-center justify-center gap-4">
                        <Label>Toggle Data Preview</Label>
                        <Switch defaultChecked={isDev} onCheckedChange={setIsDev} />
                        <ThemeToggle />
                    </div>
                </div>

                <div className="flex min-w-md">
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
