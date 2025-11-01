export interface WaveAction<T = unknown> {
    type: string;
    name: string;
    data: T;
}

export interface SpawnZombiesJitteredWaveActionPropsObject {
    AdditionalPlantfood?: number;
    DynamicPlantfood?: boolean[];
    Zombies: Zombie[];
}

interface Zombie {
    Type: string;
    Row?: number;
}
