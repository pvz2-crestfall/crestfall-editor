import { levelState } from '@/lib/state';
import { StageModuleType } from '@/types/PVZTypes';

const backgroundImages = {
    [StageModuleType.Tutorial]: '/assets/lawns/Frontlawn.png',
    [StageModuleType.FrontLawn]: '/assets/lawns/Frontlawn.png',
    [StageModuleType.Egypt]: '/assets/lawns/EgyptLawn.png',
    [StageModuleType.Pirate]: '/assets/lawns/PirateLawn.png',
    [StageModuleType.WildWest]: '/assets/lawns/WildWestLawn.png',
    [StageModuleType.Frostbite]: '/assets/lawns/FrostbiteCavesLawn.png',
    [StageModuleType.LostCity]: '/assets/lawns/LostCityLawn.png',
    [StageModuleType.Future]: '/assets/lawns/FarFutureLawn.png',
    [StageModuleType.DarkAges]: '/assets/lawns/DarkAgesLawn.png',
    [StageModuleType.NMT]: '/assets/lawns/NMTLawn.png',
    [StageModuleType.Jurassic]: '/assets/lawns/JurassicLawn.png',
    [StageModuleType.BWB]: '/assets/lawns/BeachLawn.png',
    [StageModuleType.Modern]: '/assets/lawns/Frontlawn.png',
    [StageModuleType.BattleZ]: '/assets/lawns/JoustLawn.png',
    [StageModuleType.Rift]: '/assets/lawns/RiftLawn.png',
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
