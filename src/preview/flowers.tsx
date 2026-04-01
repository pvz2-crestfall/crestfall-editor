import type { GridAlignment } from './grid';
import type { CSSProperties } from 'react';
import { TileImages } from '@/lib/assets';

export function FlowerLineRender({ alignment, flowerColumn }: { alignment: GridAlignment; flowerColumn?: number }) {
    const cellTop = alignment.startY;
    const cellLeft = alignment.startX;
    const cellHeight = (alignment.endY - alignment.startY) / 5;
    const cellWidth = (alignment.endX - alignment.startX) / 9;

    let src = TileImages['./flower_line.png'];

    if (flowerColumn == undefined) return null;
    return (
        <div className="flex flex-col">
            {[0, 0, 0, 0, 0].map((_, rowIndex) => {
                const imageStyle: CSSProperties = {
                    position: 'absolute',
                    top: cellTop + cellHeight * rowIndex + '%',
                    left: cellLeft + cellWidth * flowerColumn + '%',
                    height: cellHeight + '%',
                    // width: cellWidth + '%',
                    transform: 'translate(-50%, 0%)',
                };

                return (
                    <img
                        className="transition-transform"
                        key={`flower-${rowIndex}`}
                        src={src}
                        style={imageStyle}
                        alt="flowers"
                        draggable={false}
                    />
                );
            })}
        </div>
    );
}
