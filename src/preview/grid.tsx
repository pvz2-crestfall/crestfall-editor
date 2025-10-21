import { levelState } from '@/lib/state';
import { StageModuleType } from '@/types/PVZTypes';

interface GridAlignment {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

// all values are in percentage values
const defaultAlignment: GridAlignment = {
    startX: 25,
    startY: 26,
    endX: 96.3,
    endY: 89.5,
};
const altAlignment: GridAlignment = {
    startX: 25,
    startY: 26,
    endX: 97.2,
    endY: 89.5,
};

const Alignments = {
    [StageModuleType.Tutorial]: defaultAlignment,
    [StageModuleType.FrontLawn]: defaultAlignment,
    [StageModuleType.Egypt]: { ...defaultAlignment, endX: 96.9 },
    [StageModuleType.Pirate]: { ...defaultAlignment, startY: 26.5, endY: 90 },
    [StageModuleType.WildWest]: defaultAlignment,
    [StageModuleType.Frostbite]: defaultAlignment,
    [StageModuleType.LostCity]: altAlignment,
    [StageModuleType.Future]: defaultAlignment,
    [StageModuleType.DarkAges]: altAlignment,
    [StageModuleType.NMT]: altAlignment,
    [StageModuleType.Jurassic]: { ...altAlignment, startY: 26.5 },
    [StageModuleType.BWB]: altAlignment,
    [StageModuleType.Modern]: defaultAlignment,
    [StageModuleType.BattleZ]: defaultAlignment,
    [StageModuleType.Rift]: defaultAlignment,
};

export function LevelGrid() {
    const { levelBuilder } = levelState();

    const rows = 5;
    const cols = 9;

    const handleClick = (r: number, c: number) => {
        console.log(`Clicked cell (${r}, ${c})`);
        // levelState.setState((s) => s.levelBuilder.setTile(r, c, ...))
    };

    const { startX, startY, endX, endY } = Alignments[levelBuilder.stageType];

    return (
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
    );
}
