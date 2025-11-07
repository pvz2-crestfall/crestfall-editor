import { levelState } from '@/lib/state';
import { StageModuleType } from '@/types/PVZTypes';

// Automatically import all .png files in this folder
const lawnImages = import.meta.glob('/assets/lawns/*.png', {
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
    const { levelBuilder } = levelState();

    return (
        <img
            src={backgroundImages[levelBuilder.stageType]}
            alt="Level background"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
        />
    );
}
