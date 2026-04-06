import { StageModuleType } from '../leveldefinition';

export const defaultGrave = {
    [StageModuleType.Tutorial]: 'gravestone_tutorial',
    [StageModuleType.FrontLawn]: 'gravestone_tutorial',
    [StageModuleType.Egypt]: 'gravestone_egypt',
    [StageModuleType.Pirate]: 'gravestone_pirate',
    [StageModuleType.WildWest]: 'gravestone_cowboy',
    [StageModuleType.Frostbite]: 'gravestone_iceage',
    [StageModuleType.LostCity]: 'gravestone_lostcity',
    [StageModuleType.Future]: 'gravestone_future',
    [StageModuleType.DarkAges]: 'gravestone_dark',
    [StageModuleType.NMT]: 'gravestone_egypt',
    [StageModuleType.Jurassic]: 'gravestone_egypt',
    [StageModuleType.BWB]: 'gravestone_egypt',
    [StageModuleType.Modern]: 'gravestone_tutorial',
    [StageModuleType.BattleZ]: 'gravestone_dark',
    [StageModuleType.Rift]: 'gravestone_tutorial',
};

export type TileGrid = TileData[][];

export interface TileData {
    objects: TileObject[];
}

export interface TileObject {
    type: TileType;
    param1?: string;
    param2?: string;
}

export enum TileType {
    Plant,
    Zombie,
    GridItem,
    Grave,
    Portal,
    FloorTile,
    None,
}
