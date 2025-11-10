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

export interface WaveZombie {
    Type: string;
    Row?: number;
}
