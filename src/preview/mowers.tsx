import type { GridAlignment } from './grid';
import type { CSSProperties } from 'react';
import type { LawnMowerType } from '@/types/PVZTypes';

// Automatically import all .png files in this folder
export const mowerImages = import.meta.glob('/assets/mowers/*.png', {
    base: '/assets/mowers/',
    eager: true,
    import: 'default',
}) as Record<string, string>;

export function LawnMowersRender({ alignment, mowers }: { alignment: GridAlignment; mowers?: LawnMowerType }) {
    const cellTop = alignment.startY;
    const cellLeft = alignment.startX;
    const cellHeight = (alignment.endY - alignment.startY) / 5;
    // const cellWidth = (alignment.endX - alignment.startX) / 9;

    if (!mowers) {
        return null;
    }

    let mowerPath = `./${mowers}.png`;
    let src = mowerImages[mowerPath];

    return (
        <div className="flex flex-col">
            {Array.from({ length: 5 }).map((_, rowIndex) => {
                const imageStyle: CSSProperties = {
                    position: 'absolute',
                    top: cellTop + cellHeight * rowIndex + '%',
                    left: cellLeft + '%',
                    height: cellHeight + '%',
                    // width: cellWidth + '%',
                    transform: 'translate(-100%, 0%) scale(0.85)',
                };

                return <img key={`mower-${rowIndex}`} src={src} style={imageStyle} alt="mower" draggable={false} />;
            })}
        </div>
    );
}
