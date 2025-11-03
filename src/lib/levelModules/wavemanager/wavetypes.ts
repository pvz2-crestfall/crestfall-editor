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

export interface WaveZombie {
    Type: string;
    Row?: number;
}
