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
    UnknownAction: {
        name: 'Unknown Action',
        component: UnknownAction,
    },
};
