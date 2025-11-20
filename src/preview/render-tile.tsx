import type { ChallengeManager } from '@/lib/levelModules/challenges/challengemanager';
import type { TileManager } from '@/lib/levelModules/tilemanager/tilemanager';
import { StageModuleType } from '@/types/PVZTypes';
import { type CSSProperties } from 'react';
import { getGravestoneImage, getPortalImage, TileImages } from '@/lib/assets';

interface RenderTileSpritesProps {
    column: number;
    row: number;
    width: number;
    height: number;
    stageType: StageModuleType;
    tileManager: TileManager;
    challengeManager?: ChallengeManager;
}

export function RenderTileSprites({
    column,
    row,
    stageType,
    tileManager,
    challengeManager,
    width,
    height,
}: RenderTileSpritesProps) {
    const tileData = tileManager.getAllAt(row, column);

    if (challengeManager && challengeManager.moldLocations.length > 0) {
        const [mold] = challengeManager.moldLocations.filter((mold) => mold.col == column && mold.row == row);
        if (mold) tileData.unshift({ ...mold, type: 'mold' });
    }

    if (tileData.length == 0) return null;

    return (
        <>
            {tileData.map((tile, tileIndex) => {
                // get the cell center in percentage
                const top = ((row + 0.5) / 5) * 100;
                const left = ((column + 0.5) / 9) * 100;

                const imageProps = {
                    src: '',
                    alt: tile.type,
                    className: 'absolute transition-transform pointer-events-none',
                    draggable: false,
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
                if (tile.type == 'plant') {
                }

                if (tile.type == 'gravestone') {
                    const scale = 1.6;
                    imageProps.src = getGravestoneImage(stageType, tile.variant);
                    imageStyle.transform = `translate(-50%, -65%) scale(${scale})`;
                }

                if (tile.type == 'portal') {
                    const scale = 3;
                    imageProps.src = getPortalImage(tile.variant);
                    imageStyle.transform = `translate(-20%, -60%) scale(${scale})`;

                    // add glow effect and outline
                    imageStyle.filter = `
                        drop-shadow(0 0 1px rgba(100, 255, 255, 1))
                        drop-shadow(0 0 2px rgba(100, 255, 255, 1))
                        drop-shadow(0 0 3px rgba(150, 255, 255, 0.5))
                        
                        drop-shadow(0 0 8px rgba(100, 255, 255, 0.1))
                        drop-shadow(0 0 10px rgba(100, 255, 255, 0.8))
                        drop-shadow(0 0 12px rgba(150, 255, 255, 0.8))
                    `;
                }

                if (tile.type == 'mold') {
                    const scale = 1.25;
                    imageProps.src = TileImages['./mold.png'];
                    imageStyle.transform = `translate(-50%, -50%) scale(${scale})`;
                }

                return <img key={`${row}-${column}-${tile.type + tileIndex}`} {...imageProps} style={imageStyle} />;
            })}
        </>
    );
}
