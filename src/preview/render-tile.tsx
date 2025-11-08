import type { TileManager } from '@/lib/levelModules/tilemanager/tilemanager';
import { defaultGrave } from '@/lib/levelModules/tilemanager/types';
import { StageModuleType } from '@/types/PVZTypes';
import type { CSSProperties } from 'react';

const gravestonePaths = import.meta.glob('/assets/gravestones/*.png', {
    base: '/assets/gravestones/',
    eager: true,
    import: 'default',
}) as Record<string, string>;

function getGravestoneImage(stageType: StageModuleType, variant: string | undefined) {
    if (variant == 'default' || variant == undefined) {
        variant = defaultGrave[stageType];
    }

    return gravestonePaths[`./${variant}.png`] ?? gravestonePaths[`./gravestone_unknown.png`];
}

interface RenderTileSpritesProps {
    column: number;
    row: number;
    width: number;
    height: number;
    stageType: StageModuleType;
    tileManager: TileManager;
}

export function RenderTileSprites({ column, row, stageType, tileManager, width, height }: RenderTileSpritesProps) {
    const tileData = tileManager.getAllAt(row, column);

    if (tileData.length == 0) return null;

    return (
        <>
            {tileData.map((tile) => {
                // get the cell center in percentage
                const top = ((row + 0.5) / 5) * 100;
                const left = ((column + 0.5) / 9) * 100;

                const imageProps = {
                    key: `${row}-${column}-${tile.type}`,
                    src: '',
                    alt: tile.type,
                    className: 'absolute transition-transform',
                };
                const imageStyle: CSSProperties = {
                    top: `${top}%`,
                    left: `${left}%`,
                    width: `${width}%`,
                    height: `${height}%`,
                    objectFit: 'contain',
                    transform: 'translate(-50%, -50%)',
                };

                // Render different tile types accordingly
                if (tile.type == 'gravestone') {
                    const scale = 1.6;
                    imageProps.src = getGravestoneImage(stageType, tile.variant);
                    imageStyle.transform = `translate(-50%, -65%) scale(${scale})`;
                }

                return <img {...imageProps} style={imageStyle} />;
            })}
        </>
    );
}
