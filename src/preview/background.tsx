import { levelState } from '@/lib/state';
import { StageModuleType } from '@/types/PVZTypes';

// Automatically import all .png files in this folder
const lawnImages = import.meta.glob('/assets/lawns/*.png', {
    eager: true,
    import: 'default',
}) as Record<string, string>;

console.log(lawnImages);

// Map StageModuleType -> bundled URLs
const backgroundImages = {
    [StageModuleType.Tutorial]: lawnImages['/assets/lawns/Frontlawn.png'],
    [StageModuleType.FrontLawn]: lawnImages['/assets/lawns/Frontlawn.png'],
    [StageModuleType.Egypt]: lawnImages['/assets/lawns/EgyptLawn.png'],
    [StageModuleType.Pirate]: lawnImages['/assets/lawns/PirateLawn.png'],
    [StageModuleType.WildWest]: lawnImages['/assets/lawns/WildWestLawn.png'],
    [StageModuleType.Frostbite]: lawnImages['/assets/lawns/FrostbiteCavesLawn.png'],
    [StageModuleType.LostCity]: lawnImages['/assets/lawns/LostCityLawn.png'],
    [StageModuleType.Future]: lawnImages['/assets/lawns/FarFutureLawn.png'],
    [StageModuleType.DarkAges]: lawnImages['/assets/lawns/DarkAgesLawn.png'],
    [StageModuleType.NMT]: lawnImages['/assets/lawns/NMTLawn.png'],
    [StageModuleType.Jurassic]: lawnImages['/assets/lawns/JurassicLawn.png'],
    [StageModuleType.BWB]: lawnImages['/assets/lawns/BeachLawn.png'],
    [StageModuleType.Modern]: lawnImages['/assets/lawns/Frontlawn.png'],
    [StageModuleType.BattleZ]: lawnImages['/assets/lawns/JoustLawn.png'],
    [StageModuleType.Rift]: lawnImages['/assets/lawns/RiftLawn.png'],
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
