import { levelState } from '@/lib/state';
import { StageModuleType } from '@/types/PVZTypes';

const backgroundImages = {
    [StageModuleType.Tutorial]: '/public/assets/lawns/Frontlawn.png',
    [StageModuleType.FrontLawn]: '/public/assets/lawns/Frontlawn.png',
    [StageModuleType.Egypt]: '/public/assets/lawns/EgyptLawn.png',
    [StageModuleType.Pirate]: '/public/assets/lawns/PirateLawn.png',
    [StageModuleType.WildWest]: '/public/assets/lawns/WildWestLawn.png',
    [StageModuleType.Frostbite]: '/public/assets/lawns/FrostbiteCavesLawn.png',
    [StageModuleType.LostCity]: '/public/assets/lawns/LostCityLawn.png',
    [StageModuleType.Future]: '/public/assets/lawns/FarFutureLawn.png',
    [StageModuleType.DarkAges]: '/public/assets/lawns/DarkAgesLawn.png',
    [StageModuleType.NMT]: '/public/assets/lawns/NMTLawn.png',
    [StageModuleType.Jurassic]: '/public/assets/lawns/JurassicLawn.png',
    [StageModuleType.BWB]: '/public/assets/lawns/BeachLawn.png',
    [StageModuleType.Modern]: '/public/assets/lawns/Frontlawn.png',
    [StageModuleType.BattleZ]: '/public/assets/lawns/JoustLawn.png',
    [StageModuleType.Rift]: '/public/assets/lawns/RiftLawn.png',
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
