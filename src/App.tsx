import { Card, CardContent } from '@/components/ui/card';
import { levelState } from './lib/state';
import { SidePanel } from './sidepanel/sidepanel';
import { AspectRatio } from './components/ui/aspect-ratio';
import { StageModuleType } from './types/PVZTypes';

export function LevelGrid({
    startX = 25, // left margin (in %)
    startY = 26, // top margin (in %)
    endX = 96.3, // right edge (in %)
    endY = 89.5, // bottom edge (in %)
}: {
    startX?: number;
    startY?: number;
    endX?: number;
    endY?: number;
}) {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const rows = 5;
    const cols = 9;

    const handleClick = (r: number, c: number) => {
        console.log(`Clicked cell (${r}, ${c})`);
        // levelState.setState((s) => s.levelBuilder.setTile(r, c, ...))
    };

    const backgroundImages = {
        [StageModuleType.Tutorial]: '/assets/Frontlawn.png',
        [StageModuleType.FrontLawn]: '/assets/Frontlawn.png',
        [StageModuleType.Egypt]: '/assets/EgyptLawn.png',
        [StageModuleType.Pirate]: '/assets/PirateLawn.png',
        [StageModuleType.WildWest]: '/assets/WildWestLawn.png',
        [StageModuleType.Frostbite]: '/assets/FrostbiteCavesLawn.png',
        [StageModuleType.LostCity]: '/assets/LostCityLawn.png',
        [StageModuleType.Future]: '/assets/FarFutureLawn.png',
        [StageModuleType.DarkAges]: '/assets/DarkAgesLawn.png',
        [StageModuleType.NMT]: '/assets/NMTLawn.png',
        [StageModuleType.Jurassic]: '/assets/JurassicLawn.png',
        [StageModuleType.BWB]: '/assets/BeachLawn.png',
        [StageModuleType.Modern]: '/assets/Frontlawn.png',
        [StageModuleType.BattleZ]: '/assets/JoustLawn.png',
        [StageModuleType.Rift]: '/assets/RiftLawn.png',
    };

    return (
        <AspectRatio ratio={4 / 3}>
            <div className="relative w-full h-full rounded-md overflow-hidden select-none">
                {/* Background Image */}
                <img
                    src={backgroundImages[levelBuilder.stageType]}
                    alt="Level background"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Grid Overlay */}
                <div
                    className="absolute grid"
                    style={{
                        top: `${startY}%`,
                        left: `${startX}%`,
                        width: `${endX - startX}%`,
                        height: `${endY - startY}%`,
                        gridTemplateRows: `repeat(${rows}, 1fr)`,
                        gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    }}
                >
                    {Array.from({ length: rows * cols }).map((_, i) => {
                        const r = Math.floor(i / cols);
                        const c = i % cols;
                        return (
                            <div
                                key={`${r}-${c}`}
                                className="border border-black/20 hover:bg-black/10 transition-colors cursor-pointer"
                                onClick={() => handleClick(r, c)}
                            />
                        );
                    })}
                </div>
            </div>
        </AspectRatio>
    );
}

// JSON preview component
function DataPreview() {
    const levelBuilder = levelState((s) => s.levelBuilder);

    return (
        <Card className="w-full max-w-3xl h-full">
            <CardContent className="p-4 h-full overflow-auto">
                <h2 className="text-lg font-semibold mb-2">Level Data Preview</h2>
                <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto h-full">
                    {JSON.stringify(levelBuilder.build(), null, 2)}
                </pre>
            </CardContent>
        </Card>
    );
}

// 🏠 Main layout
export default function App() {
    return (
        <div>
            <div className="flex h-screen bg-neutral-100 p-4 gap-4">
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <LevelGrid />
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
