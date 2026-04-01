import type { GridAlignment } from './grid';
import type { CSSProperties } from 'react';
import { TileImages } from '@/lib/assets';

export function MoldRender({
    alignment,
    mold,
}: {
    alignment: GridAlignment;
    mold: {
        row: number;
        col: number;
    }[];
}) {
    const cellTop = alignment.startY;
    const cellLeft = alignment.startX;
    const cellHeight = (alignment.endY - alignment.startY) / 5;
    const cellWidth = (alignment.endX - alignment.startX) / 9;

    let src = TileImages['./mold.png'];

    return (
        <div className="flex flex-col">
            {mold.map(({ col, row }) => {
                const imageStyle: CSSProperties = {
                    position: 'absolute',
                    top: cellTop + cellHeight * row + '%',
                    left: cellLeft + cellWidth * col + '%',
                    height: cellHeight + '%',
                    width: cellWidth + '%',
                    objectFit: 'contain',
                };

                return (
                    <img
                        className="transition-transform"
                        key={`mold-${row}-${col}`}
                        src={src}
                        style={imageStyle}
                        alt="mold"
                        draggable={false}
                    />
                );
            })}
        </div>
    );
}
