import type { Railcarts } from '@/lib/levelModules/railcarts';
import type { GridAlignment } from './grid';
import type { CSSProperties } from 'react';

// Automatically import all .png files in this folder
export const railwayImages = import.meta.glob('/assets/railcarts/*/*.png', {
    base: '/assets/railcarts/',
    eager: true,
    import: 'default',
}) as Record<string, string>;

export function RailwayRender({ alignment, railcarts }: { alignment: GridAlignment; railcarts: Railcarts }) {
    const cellTop = alignment.startY;
    const cellLeft = alignment.startX;
    const cellHeight = (alignment.endY - alignment.startY) / 5;
    const cellWidth = (alignment.endX - alignment.startX) / 9;

    // determine which railcart sprite to use
    const railcartType = railcarts.objdata.RailcartType;
    let railpath = railcartType == 'railcart_cowboy' ? 'cowboy' : 'modern';
    railpath = `./${railpath}/`;

    return (
        <div className="flex flex-col">
            {railcarts.railGrid.map((row, columnIndex) => {
                return row.map((rail, rowIndex) => {
                    if (!rail) return null;

                    let src = railwayImages[railpath + 'mid.png'];

                    if (!row[rowIndex - 1]) {
                        src = railwayImages[railpath + 'top.png'];
                    }
                    if (!row[rowIndex + 1]) {
                        src = railwayImages[railpath + 'bottom.png'];
                    }

                    const imageStyle: CSSProperties = {
                        position: 'absolute',
                        top: cellTop + cellHeight * rowIndex + '%',
                        left: cellLeft + cellWidth * columnIndex + '%',
                        height: cellHeight + '%',
                        width: cellWidth + '%',
                        // transform: 'translate(-50%, 0%)',
                    };

                    return (
                        <img key={`rail-${rowIndex}-${columnIndex}`} src={src} style={imageStyle} draggable={false} />
                    );
                });
            })}
        </div>
    );
}
