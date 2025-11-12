import { gridState, levelState } from '@/lib/state';
import { StageModuleType } from '@/types/PVZTypes';
import { RenderTileSprites } from './render-tile';
import { useState } from 'react';

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
    const [refreshCount, setRefreshCount] = useState(0);
    const levelBuilder = levelState((s) => s.levelBuilder);

    const gridData = gridState((s) => s.gridData);
    const defaultGrid = gridState((s) => s.defaultGrid);
    const _triggerGridClick = gridState((s) => s.triggerGridClick);

    const rows = 5;
    const cols = 9;

    const alignment = Alignments[levelBuilder.stageType];

    const widthPct = alignment.endX - alignment.startX;
    const heightPct = alignment.endY - alignment.startY;
    const cellWidth = widthPct / cols;
    const cellHeight = heightPct / rows;

    const triggerGridClick = (r: number, c: number) => {
        _triggerGridClick(r, c);
        setRefreshCount(refreshCount + 1);
    };

    const tileManager = gridData ?? defaultGrid ?? levelBuilder.tileManager;

    return (
        <div className="absolute inset-0">
            <div
                className="absolute grid"
                style={{
                    top: `${alignment.startY}%`,
                    left: `${alignment.startX}%`,
                    width: `${alignment.endX - alignment.startX}%`,
                    height: `${alignment.endY - alignment.startY}%`,
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
                            onClick={() => triggerGridClick(r, c)}
                        >
                            <RenderTileSprites
                                width={cellWidth}
                                height={cellHeight}
                                row={r}
                                column={c}
                                stageType={levelBuilder.stageType}
                                tileManager={tileManager}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
