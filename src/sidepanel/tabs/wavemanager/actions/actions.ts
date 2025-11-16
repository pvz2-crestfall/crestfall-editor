import * as WaveTypes from '@/lib/levelModules/wavemanager/wavetypes';
import type { WaveAction } from '@/lib/levelModules/wavemanager/wavetypes';
import { BasicZombieSpawner } from './basic-spawner';
import { SunDropperWaveAction } from './sun-dropper';
import { UnknownAction } from './unknown';
import { ZombieStormAction } from './zombie-storm';
import { SpawnZombiesFromGroundAction } from './from-ground-spawner';
import { ModifyConveyorAction } from './modify-conveyor';
import { SummonDinoAction } from './summon-dino';
import { SpawnGravestonesWaveAction } from './spawn-gravestones-action';
import { SpawnModernPortalAction } from './spawn-modern-portal';
import { SpawnZombiesFromGriditemsAction } from './from-griditems-spawner';
import { TileManager } from '@/lib/levelModules/tilemanager/tilemanager';
import { PirateRaidWaveAction } from './pirate-raid-action';
import { TideChangeWaveAction } from './tide-change-action';
import { ZombieRainWaveAction } from './zombie-rain-action';
import { LowTideEventWaveAction } from './low-tide-event';
import { FrostwindWaveAction } from './frostwind-action';

let currentId = 1;
const actionIdMap = new WeakMap();
export const getActionId = (action: WaveAction) => {
    if (actionIdMap.has(action)) {
        return actionIdMap.get(action);
    } else {
        const newId = `action${currentId++}`;
        actionIdMap.set(action, newId);
        return newId;
    }
};

export const getActionPreview = (waveAction: WaveAction) => {
    const action = Actions[waveAction.type];
    const preview = action.getPreviewData?.(waveAction);
    return preview;
};

interface ActionInterface<T> {
    name: string;
    component: React.FC<{ waveaction: WaveAction<T> }>;
    defaultData?: T;
    getPreviewData?: (action: WaveAction<T>) => TileManager;
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
        defaultData: { ColumnStart: 7, ColumnEnd: 9, Zombies: [] },
    },
    ModifyConveyorWaveActionProps: {
        name: 'Modify Conveyor Belt',
        component: ModifyConveyorAction,
        defaultData: { Add: [], Remove: [] },
    },
    SunDropperWaveActionProps: {
        name: 'Drop Extra Sun',
        component: SunDropperWaveAction,
        defaultData: { SunAmountToDrop: 50 },
    },
    DinoWaveActionProps: {
        name: 'Summon Dinosaur',
        component: SummonDinoAction,
        defaultData: { DinoType: 'raptor', DinoRow: 0 },
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
        getPreviewData(action: WaveAction<WaveTypes.SpawnGravestonesWaveActionProps>) {
            const { SpawnPositionsPool } = action.data;
            const gridPreview = new TileManager([]);
            SpawnPositionsPool.forEach((tile) => {
                gridPreview.setTile({ row: tile.mY, col: tile.mX }, { type: 'gravestone', variant: 'unknown' });
            });
            return gridPreview;
        },
    },
    SpawnModernPortalsWaveActionProps: {
        name: 'Spawn Modern Day Portal',
        component: SpawnModernPortalAction,
        defaultData: {
            PortalColumn: 7,
            PortalRow: 2,
            PortalType: 'egypt',
            SpawnEffectAnimID: '',
            SpawnSoundID: '',
        },
        getPreviewData(action: WaveAction<WaveTypes.SpawnModernPortalsWaveActionProps>) {
            const { PortalRow, PortalColumn, PortalType } = action.data;
            const gridPreview = new TileManager([]);
            gridPreview.setTile({ row: PortalRow, col: PortalColumn }, { type: 'portal', variant: PortalType });
            return gridPreview;
        },
    },
    SpawnZombiesFromGridItemSpawnerProps: {
        name: 'Spawn from Grid Items',
        component: SpawnZombiesFromGriditemsAction,
        defaultData: { AdditionalPlantfood: 0, GridTypes: [], Zombies: [] },
    },
    RaidingPartyZombieSpawnerProps: {
        name: 'Pirate Seas Pirate Raid',
        component: PirateRaidWaveAction,
        defaultData: { GroupSize: 5, SwashbucklerCount: 5, TimeBetweenGroups: 1 },
    },
    TidalChangeWaveActionProps: {
        name: 'Tide Change',
        component: TideChangeWaveAction,
        defaultData: { TidalChange: { ChangeAmount: 5, ChangeType: 'absolute' } },
    },
    ParachuteRainZombieSpawnerProps: {
        name: 'Parachute Rain Event',
        component: ZombieRainWaveAction,
        defaultData: {
            ColumnEnd: 6,
            ColumnStart: 4,
            GroupSize: 2,
            SpiderCount: 4,
            SpiderZombieName: 'lostcity_lostpilot',
            TimeBeforeFullSpawn: 1,
            TimeBetweenGroups: 0.5,
            WaveStartMessage: '[WARNING_PARACHUTERAIN]',
            ZombieFallTime: 1.5,
        },
    },
    SpiderRainZombieSpawnerProps: {
        name: 'Spider Rain Event',
        component: ZombieRainWaveAction,
        defaultData: {
            ColumnEnd: 6,
            ColumnStart: 4,
            GroupSize: 2,
            SpiderCount: 4,
            SpiderZombieName: 'future_imp',
            TimeBeforeFullSpawn: 1,
            TimeBetweenGroups: 0.5,
            WaveStartMessage: '[WARNING_SPIDERRAIN]',
            ZombieFallTime: 1.5,
        },
    },
    BeachStageEventZombieSpawnerProps: {
        name: 'Low Tide Event',
        component: LowTideEventWaveAction,
        defaultData: {
            ColumnEnd: 5,
            ColumnStart: 4,
            GroupSize: 5,
            ZombieCount: 5,
            ZombieName: 'beach',
            TimeBeforeFullSpawn: 0.5,
            TimeBetweenGroups: 0.25,
            WaveStartMessage: '[WARNING_LOW_TIDE]',
            WaveLocation: 3,
        },
    },
    FrostWindWaveActionProps: {
        name: 'Frost Winds',
        component: FrostwindWaveAction,
        defaultData: {
            Winds: [
                { Direction: 'right', Row: 0 },
                { Direction: 'right', Row: 1 },
                { Direction: 'right', Row: 2 },
                { Direction: 'right', Row: 3 },
                { Direction: 'right', Row: 4 },
            ],
        },
    },
    UnknownAction: {
        name: 'Unknown Action',
        component: UnknownAction,
    },
};
