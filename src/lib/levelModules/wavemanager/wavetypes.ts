import type { ConveyorSeedBankPlantObject } from '@/types/PVZTypes';

export interface WaveAction<T = unknown> {
    type: string;
    name: string;
    data: T;
}

export interface StormZombieSpawnerProps {
    ColumnEnd: number;
    ColumnStart: number;
    GroupSize: number;
    TimeBetweenGroups: number;
    Type: StormType;
    Zombies: WaveZombie[];
    Waves?: string;
    ForcedCondition?: { Condition: string };
}

export enum StormType {
    SANDSTORM = 'sandstorm',
    SNOWSTORM = 'snowstorm',
}

export interface SpawnZombiesJitteredWaveActionProps {
    AdditionalPlantfood?: number;
    DynamicPlantfood?: boolean[];
    Zombies: WaveZombie[];
}

export interface SunDropperWaveActionProps {
    SunAmountToDrop: number;
}

export interface SpawnZombiesFromGroundSpawnerProps {
    ColumnEnd: number;
    ColumnStart: number;
    WaveStartMessage?: string;
    Zombies: WaveZombie[];
}

export interface ModifyConveyorWaveActionProps {
    Add: ConveyorSeedBankPlantObject[];
    Remove: ConveyorSeedBankPlantObject[];
}

export interface DinoWaveActionProps {
    DinoType: DinoType;
    DinoRow: number;
    DinoWaveDuration?: number;
}

export enum DinoType {
    RAPTOR = 'raptor',
    STEGOSAURUS = 'stego',
    PTEROSAUR = 'ptero',
    TYRANNOSAURUS = 'tyranno',
    ANKLYOSAURUS = 'anklyo',
}

export interface SpawnGravestonesWaveActionProps {
    GravestonePool: GravestonePool[];
    SpawnPositionsPool: { mX: number; mY: number }[];
    SpawnEffectAnimID: string;
    SpawnSoundID: string;

    DisplacePlants?: boolean;
    RandomPlacement?: boolean;
    GridClassesToDestroy?: string[];
    maxX?: number;
    minX?: number;
    SpawnPositionsRect?: { mX: number; mY: number; mWidth: number; mHeight: number };
    ShakeScreen?: boolean;
    SpawnEffectAnimPlay?: string;
}

export interface GravestonePool {
    Count: number;
    Type: string;
}

export interface SpawnModernPortalsWaveActionProps {
    PortalColumn: number;
    PortalRow: number;
    PortalType: ModernPortalType;
    SpawnEffectAnimID: string;
    SpawnSoundID: string;
}

export enum ModernPortalType {
    // misc portals
    Circus = 'circus1',
    Rome = 'rome',
    Chicken = 'chicken',

    // world portals
    Egypt = 'egypt',
    EgyptAlt = 'egypt_2',
    Pirate = 'pirate',
    WildWest = 'west',
    FarFuture = 'future',
    FarFutureAlt = 'future_2',
    DarkAges = 'dark',
    BigWaveBeach = 'beach',
    FrostbiteCaves = 'iceage',
    LostCity = 'lostcity',
    NeonMixtapeTour = 'eighties',
    JurassicMarsh = 'dino',
    ModernDay = 'modern',

    // danger rooms
    dangerroom_egypt = 'dangerroom_egypt',
    dangerroom_pirate = 'dangerroom_pirate',
    dangerroom_west = 'dangerroom_west',
    dangerroom_future = 'dangerroom_future',
    dangerroom_dark = 'dangerroom_dark',
    dangerroom_beach = 'dangerroom_beach',
    dangerroom_iceage = 'dangerroom_iceage',
    dangerroom_lostcity = 'dangerroom_lostcity',
    dangerroom_eighties = 'dangerroom_eighties',
    dangerroom_dino = 'dangerroom_dino',
}

export const PortalTypes = {
    [ModernPortalType.Circus]: 'modern',
    [ModernPortalType.Rome]: 'rift1a',
    [ModernPortalType.Chicken]: 'west',

    [ModernPortalType.Egypt]: 'egypt',
    [ModernPortalType.EgyptAlt]: 'egypt',
    [ModernPortalType.Pirate]: 'pirate',
    [ModernPortalType.WildWest]: 'west',
    [ModernPortalType.FarFuture]: 'future',
    [ModernPortalType.FarFutureAlt]: 'future',
    [ModernPortalType.DarkAges]: 'dark',
    [ModernPortalType.BigWaveBeach]: 'beach',
    [ModernPortalType.FrostbiteCaves]: 'iceage',
    [ModernPortalType.LostCity]: 'lostcity',
    [ModernPortalType.NeonMixtapeTour]: 'eighties',
    [ModernPortalType.JurassicMarsh]: 'dino',
    [ModernPortalType.ModernDay]: 'modern',

    [ModernPortalType.dangerroom_egypt]: 'egypt',
    [ModernPortalType.dangerroom_pirate]: 'pirate',
    [ModernPortalType.dangerroom_west]: 'west',
    [ModernPortalType.dangerroom_future]: 'future',
    [ModernPortalType.dangerroom_dark]: 'dark',
    [ModernPortalType.dangerroom_beach]: 'beach',
    [ModernPortalType.dangerroom_iceage]: 'iceage',
    [ModernPortalType.dangerroom_lostcity]: 'lostcity',
    [ModernPortalType.dangerroom_eighties]: 'eighties',
    [ModernPortalType.dangerroom_dino]: 'dino',
};

export interface SpawnZombiesFromGridItemSpawnerProps {
    AdditionalPlantfood: number;
    GridTypes: string[];
    Zombies: WaveZombie[];

    WaveStartMessage?: string;
    ZombieSpawnWaitTime?: number;
    SuppressActionIfNoGridItemsFound?: boolean;
}

export interface RaidingPartyZombieSpawnerProps {
    GroupSize: number;
    SwashbucklerCount: number;
    TimeBetweenGroups: number;
}

export interface TidalChangeWaveActionProps {
    TidalChange: { ChangeAmount: number; ChangeType: 'absolute' };
}

export interface ParachuteRainZombieSpawnerProps {
    ColumnEnd: number;
    ColumnStart: number;
    GroupSize: number;
    SpiderCount: number;
    SpiderZombieName: string;
    TimeBeforeFullSpawn: number;
    TimeBetweenGroups: number;
    WaveStartMessage: string;
    ZombieFallTime: number;
}

export interface SpiderRainZombieSpawnerProps {
    ColumnEnd: number;
    ColumnStart: number;
    GroupSize: number;
    SpiderCount: number;
    SpiderZombieName: string;
    TimeBeforeFullSpawn: number;
    TimeBetweenGroups: number;
    WaveStartMessage: string;
    ZombieFallTime: number;
}

export interface WaveZombie {
    Type: string;
    Row?: number;
}
