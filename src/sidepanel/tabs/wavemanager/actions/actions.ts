import type { WaveAction } from '@/lib/levelModules/wavemanager/wavetypes';
import { BasicZombieSpawner } from './basic-spawner';
import { SunDropperWaveAction } from './sun-dropper';
import { UnknownAction } from './unknown';
import { ZombieStormAction } from './zombie-storm';
import { SpawnZombiesFromGroundAction } from './from-ground-spawner';
import { ModifyConveyorAction } from './modify-conveyor';
import { SummonDinoAction } from './summon-dino';
import { SpawnGravestonesWaveAction } from './spawn-gravestones-action';

interface ActionInterface<T> {
    name: string;
    component: React.FC<{ waveaction: WaveAction<T> }>;
    defaultData?: T;
}

export const Actions: Record<string, ActionInterface<any>> = {
    SpawnZombiesJitteredWaveActionProps: {
        name: 'Basic Zombie Spawner',
        component: BasicZombieSpawner,
        defaultData: { Zombies: [] },
    },
    StormZombieSpawnerProps: {
        name: 'Storm Zombie Spawner',
        component: ZombieStormAction,
        defaultData: {
            ColumnStart: 7,
            ColumnEnd: 9,
            GroupSize: 2,
            TimeBetweenGroups: 2,
            Type: 'sandstorm',
            Zombies: [],
        },
    },
    SpawnZombiesFromGroundSpawnerProps: {
        name: 'Ground Zombie Spawner',
        component: SpawnZombiesFromGroundAction,
        defaultData: {
            ColumnStart: 7,
            ColumnEnd: 9,
            Zombies: [],
        },
    },
    ModifyConveyorWaveActionProps: {
        name: 'Modify Conveyor Belt',
        component: ModifyConveyorAction,
        defaultData: {
            Add: [],
            Remove: [],
        },
    },
    SunDropperWaveActionProps: {
        name: 'Drop Extra Sun',
        component: SunDropperWaveAction,
        defaultData: {
            SunAmountToDrop: 50,
        },
    },
    DinoWaveActionProps: {
        name: 'Summon Dinosaur',
        component: SummonDinoAction,
        defaultData: {
            DinoType: 'raptor',
            DinoRow: 0,
        },
    },
    SpawnGravestonesWaveActionProps: {
        name: 'Spawn Gravestones',
        component: SpawnGravestonesWaveAction,
        defaultData: {
            GravestonePool: [],
            SpawnPositionsPool: [],
            SpawnEffectAnimID: 'POPANIM_EFFECTS_TOMBSTONE_DARK_SPAWN_EFFECT',
            SpawnSoundID: 'Play_Zomb_Egypt_TombRaiser_Grave_Rise',
        },
    },
    UnknownAction: {
        name: 'Unknown Action',
        component: UnknownAction,
    },
};
