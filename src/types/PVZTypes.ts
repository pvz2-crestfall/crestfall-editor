export interface LevelDefinitionObject {
    Name: string;
    Description: string;
    LevelNumber: number;
    Loot: 'RTID(DefaultLoot@LevelModules)';
    Modules: string[];
    StageModule: string;
    NormalPresentTable: 'egypt_normal_01';
    ShinyPresentTable: 'egypt_shiny_01';
    StartingSun?: number;
    AddBonusStartingSun?: boolean;
    ForceToWorldMap?: boolean;
}

export interface SeedBankObject {
    SelectionMethod: SeedBankSelectionMethod;
    PresetPlantList?: SeedBankPlantObject[];
    PlantExcludeList?: string[];
    ExcludeListSunProducers?: boolean;
    OverrideSeedSlotsCount?: number;
}

export interface SeedBankPlantObject {
    PlantType: string;
    Level: number;
}

export interface ConveyorSeedBankPropertiesObject {
    DropDelayConditions: { MaxPackets: number; Delay: number }[];
    SpeedConditions: { MaxPackets: number; Speed: number }[];
    InitialPlantList: ConveyorSeedBankPlantObject[];

    ManualPacketSpawning?: boolean;
    ResourceGroupNames?: string[];
}

export interface ConveyorSeedBankPlantObject {
    PlantType: string;

    Weight?: number;
    Level?: number;
    MaxDelivered?: number;
    MaxCount?: number;
    MaxWeightFactor?: number;
    MinCount?: number;
    MinWeightFactor?: number;
    MaxCountCooldownSeconds?: number;
    ForceBoosted?: boolean;
}

export interface WaveManagerPropertiesObject {
    FlagWaveInterval: number;
    WaveCount: number;
    Waves: string[][];
    SuppressFlagZombie?: boolean;
    IgnoreFlagCarriers?: boolean;
    ZombieCountdownFirstWaveSecs?: number;
    MinNextWaveHealthPercentage?: number;
    MaxNextWaveHealthPercentage?: number;
    WaveSpendingPoints?: number;
    WaveSpendingPointIncrement?: number;
    WavesAlwaysRandomized?: boolean;
    SuppressedDynamicZombieWaves?: number[];
    FlagWaveVeteranOverrideTypes?: number[];
    SpawnColEnd?: number;
    SpawnColStart?: number;
    LevelJam?: string;
    ManualStartup?: boolean;
}

export interface WaveManagerModulePropertiesObject {
    DynamicZombies?: DynamicZombieWave[];
    WaveManagerProps: string; // 'RTID(WaveManagerProps@CurrentLevel)'
    ManualStartup?: boolean;
}

export interface DynamicZombieWave {
    MaxPoints?: number;
    PointIncrementPerWave: number;
    StartingPoints: number;
    StartingWave: number;
    ZombiePool: string[];
}

export interface GravestonePropertiesObject {
    ForceSpawnData: {
        GridX: number;
        GridY: number;
        TypeName?: string;
    }[];
    GravestoneCount?: number;
    SpawnColumnEnd?: number;
    SpawnColumnStart?: number;
}

export interface StarChallengeModulePropertiesObj {
    Challenges: string[][];
    ChallengesAlwaysAvailable: boolean;

    Difficulties?: number[];
}

export interface BoardGridMapProps {
    Values: number[][];
}

export enum SeedBankSelectionMethod {
    Chooser = 'chooser',
    Beghouled = 'beghouled',
    Preset = 'preset',
}

export enum SunDropperType {
    Slowest = 'VerySlowSunDropper',
    Slow = 'SlowSunDropper',
    Default = 'DefaultSunDropper',
    Fast = 'FastSunDropper',
    Fastest = 'VeryFastSunDropper',
}

export enum LawnMowerType {
    Tutorial = 'TutorialMowers',
    Egypt = 'EgyptMowers',
    Pirate = 'PirateMowers',
    WildWest = 'WestMowers',
    Frostbite = 'IceageMowers',
    LostCity = 'LostCityMowers',
    Future = 'FutureMowers',
    DarkAges = 'DarkMowers',
    NMT = 'EightiesMowers',
    Jurassic = 'DinoMowers',
    BWB = 'BeachMowers',
    Modern = 'ModernMowers',
    BattleZ = 'JoustMowers',
}

export enum StageModuleType {
    Tutorial = 'TutorialStage',
    FrontLawn = 'FrontLawnStage',
    Egypt = 'EgyptStage',
    Pirate = 'PirateStage',
    WildWest = 'WestStage',
    Frostbite = 'IceageStage',
    LostCity = 'LostCityStage',
    Future = 'FutureStage',
    DarkAges = 'DarkStage',
    NMT = 'EightiesStage',
    Jurassic = 'DinoStage',
    BWB = 'BeachStage',
    Modern = 'ModernStage',
    BattleZ = 'JoustStage',
    Rift = 'RiftStage',
}

export interface Tile {
    id: string;
    type: string | null; // e.g. 'plant', 'zombie', 'obstacle'
}

export interface PVZObject<T = unknown> {
    aliases?: string[];
    objclass: string;
    objdata: T;
}
