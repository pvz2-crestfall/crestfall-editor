import type { ChallengeManager } from '@/lib/levelModules/challenges/challengemanager';
import { type TileManager } from '@/lib/levelModules/tilemanager/tilemanager';
import { TileType, type TileObject } from '@/lib/levelModules/tilemanager/types';
import { StageModuleType } from '@/types/PVZTypes';
import { type CSSProperties } from 'react';
import { getGravestoneImage, getPlantImage, getPortalImage, TileImages } from '@/lib/assets';

interface RenderTileSpritesProps {
    col: number;
    row: number;
    width: number;
    height: number;
    stageType: StageModuleType;
    tileManager: TileManager;
    challengeManager: ChallengeManager;
}

export function RenderTileSprites({
    col,
    row,
    stageType,
    tileManager,
    challengeManager,
    width,
    height,
}: RenderTileSpritesProps) {
    const tileData = tileManager.getAllAt({ row, col }).slice();

    if (challengeManager.endangeredPlants.length > 0) {
        const [plant] = challengeManager.endangeredPlants.filter((plant) => plant.col == col && plant.row == row);
        if (plant) tileData.unshift({ type: TileType.Plant, param1: 'endangered_' + plant.name });
    }

    if (tileData.length == 0) return null;

    return (
        <>
            {tileData.map((tile, tileIndex) => {
                // get the cell center in percentage
                const top = ((row + 0.5) / 5) * 100;
                const left = ((col + 0.5) / 9) * 100;

                const imageProps = {
                    src: '',
                    alt: getAlt(tile),
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

                const imageResult = () => {
                    // clone the objects
                    const props = { ...imageProps };
                    const style = { ...imageStyle };
                    return <img key={`${row}-${col}-${tileIndex}`} {...props} style={style} />;
                };

                // Render different tile types accordingly
                if (tile.type == TileType.Plant) {
                    const cellWidthPct = 100 / 9;
                    const cellHeightPct = 100 / 5;
                    const images = [];

                    // render the endangered plant background
                    let plantName = tile.param1 ?? '';
                    if (tile.param1?.startsWith('endangered_')) {
                        plantName = tile.param1.split('_').at(1) ?? 'unknown';

                        imageProps.src = TileImages['./endangered.png'];
                        imageStyle.width = `${cellWidthPct * 0.95}%`;
                        imageStyle.height = `${cellHeightPct * 0.95}%`;
                        images.push(imageResult());
                    }

                    // render the actual plant
                    imageProps.src = getPlantImage(plantName);
                    imageStyle.maxWidth = `${cellWidthPct}%`;
                    imageStyle.maxHeight = `${cellHeightPct * 0.75}%`;
                    imageStyle.width = 'auto';
                    imageStyle.height = 'auto';
                    imageStyle.objectFit = 'contain';

                    // bottom align
                    imageStyle.top = `${((row + 0.85) / 5) * 100}%`;
                    imageStyle.left = `${((col + 0.5) / 9) * 100}%`;
                    imageStyle.transform = 'translate(-50%, -100%)';

                    images.push(imageResult());
                    return <>{images}</>;
                }

                if (tile.type == TileType.Grave) {
                    const scale = 1.6;
                    imageProps.src = getGravestoneImage(stageType, tile.param1);
                    imageStyle.transform = `translate(-50%, -65%) scale(${scale})`;
                }

                if (tile.type == TileType.Portal) {
                    const scale = 3;
                    imageProps.src = getPortalImage(tile.param1);
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

                return imageResult();
            })}
        </>
    );
}

const getAlt = (tile: TileObject) => {
    switch (tile.type) {
        case TileType.Plant:
            return `Plant ${tile.param1 ?? ''}`;
        case TileType.Grave:
            return 'Gravestone';
        case TileType.Portal:
            return 'Portal';
        case TileType.Mold:
            return 'Mold';
        case TileType.Flower:
            return 'Flower line';
        default:
            return 'TileEntity';
    }
};
