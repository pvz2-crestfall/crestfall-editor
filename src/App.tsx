import { Card, CardContent } from '@/components/ui/card';
import { levelState } from './lib/state';
import { SidePanel } from './sidepanel/sidepanel';
import { LevelPreview } from './preview/preview';
import { Button } from './components/ui/button';

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

export default function App() {
    return (
        <div>
            <div className="flex h-screen bg-neutral-100 p-4 gap-4">
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <LevelPreview />
                </div>

                <div className="w-128">
                    <SidePanel />
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-neutral-100">
                <DataPreview />
            </div>
        </div>
    );
}
