import type { GridAlignment } from './grid';
import type { CSSProperties } from 'react';
import { TileImages } from '@/lib/assets';
import { TileType, type TileGrid } from '@/lib/levelModules/tilemanager/types';

export function FloorTileRender({ alignment, grid }: { alignment: GridAlignment; grid: TileGrid }) {
    const cellTop = alignment.startY;
    const cellLeft = alignment.startX;
    const cellHeight = (alignment.endY - alignment.startY) / 5;
    const cellWidth = (alignment.endX - alignment.startX) / 9;

    return (
        <div className="relative w-full h-full">
            {grid.map((col, rowIndex) =>
                col.map((tile, colIndex) =>
                    tile.objects.map((object, objIndex) => {
                        if (object.type != TileType.FloorTile) return null;

                        const imageStyle: CSSProperties = {
                            position: 'absolute',
                            top: `${cellTop + cellHeight * colIndex}%`,
                            left: `${cellLeft + cellWidth * rowIndex}%`,
                            height: `${cellHeight}%`,
                            width: `${cellWidth}%`,
                        };

                        let tileName = object.param1;
                        let src = TileImages[`./${tileName}.png`];

                        return (
                            <img
                                key={`tile-${rowIndex}-${colIndex}-${objIndex}`}
                                className="transition-transform"
                                src={src}
                                style={imageStyle}
                                alt="Floor Tile"
                                draggable={false}
                            />
                        );
                    }),
                ),
            )}
        </div>
    );
}
