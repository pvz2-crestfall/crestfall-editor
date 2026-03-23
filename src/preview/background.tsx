import type { PiratePlankRows } from '@/lib/levelModules/pirateplanks';
import { gridState } from '@/lib/state/gridstate';
import { levelState } from '@/lib/state/levelstate';
import { StageModuleType } from '@/types/PVZTypes';
import type { CSSProperties } from 'react';

// Automatically import all .png files in this folder
export const lawnImages = import.meta.glob('/assets/lawns/*.png', {
    base: '/assets/lawns/',
    eager: true,
    import: 'default',
}) as Record<string, string>;

console.log(lawnImages);

// Map StageModuleType -> bundled URLs
const backgroundImages = {
    [StageModuleType.Tutorial]: lawnImages['./Frontlawn.png'],
    [StageModuleType.FrontLawn]: lawnImages['./Frontlawn.png'],
    [StageModuleType.Egypt]: lawnImages['./EgyptLawn.png'],
    [StageModuleType.Pirate]: lawnImages['./PirateLawn.png'],
    [StageModuleType.WildWest]: lawnImages['./WildWestLawn.png'],
    [StageModuleType.Frostbite]: lawnImages['./FrostbiteCavesLawn.png'],
    [StageModuleType.LostCity]: lawnImages['./LostCityLawn.png'],
    [StageModuleType.Future]: lawnImages['./FarFutureLawn.png'],
    [StageModuleType.DarkAges]: lawnImages['./DarkAgesLawn.png'],
    [StageModuleType.NMT]: lawnImages['./NMTLawn.png'],
    [StageModuleType.Jurassic]: lawnImages['./JurassicLawn.png'],
    [StageModuleType.BWB]: lawnImages['./BeachLawn.png'],
    [StageModuleType.Modern]: lawnImages['./Frontlawn.png'],
    [StageModuleType.BattleZ]: lawnImages['./JoustLawn.png'],
    [StageModuleType.Rift]: lawnImages['./RiftLawn.png'],
};

export function LevelBackground() {
    gridState((s) => s.shouldUpdate);
    const levelBuilder = levelState((s) => s.levelBuilder);

    return (
        <div className="absolute inset-0">
            <img
                src={backgroundImages[levelBuilder.levelProperties.stageType]}
                className="w-full h-full object-cover"
                draggable={false}
            />
            <PiratePlanksRender plankRows={levelBuilder.piratePlanks.rows} />
        </div>
    );
}

function PiratePlanksRender({ plankRows }: { plankRows: PiratePlankRows }) {
    // all values are in percentages
    const startingHeight = 25.7;
    const plankSpacing = 12.7;

    return (
        <div className="absolute inset-0">
            {plankRows.map((row, index) => {
                if (row) {
                    let src = lawnImages[(index + 1) % 2 == 0 ? './plank1.png' : './plank2.png'];

                    const imageStyle: CSSProperties = {
                        position: 'absolute',
                        top: `${startingHeight + plankSpacing * index}%`,
                        left: `80.5%`,
                        width: `36.1%`,
                        transform: 'translate(-50%, 0%)',
                    };

                    return <img src={src} style={imageStyle} draggable={false} />;
                }
            })}
        </div>
    );
}
