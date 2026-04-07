import type { LevelDefinitionObject, PVZObject } from '@/types/PVZTypes';
import { fromRTID, RTIDTypes, toRTID } from '@/lib/utils';
import { GravestoneProperties } from './GravestoneProperties';
import { type TileGrid, TileType, type TileObject } from './types';
import { EndangeredPlants } from './ProtectThePlantChallengeProperties';
import { LevelDefinition } from '../leveldefinition';
import { PowerTiles } from './PowerTileProperties';
import { InitialGridItems } from './InitialGridItemProperties';
import { InitialPlants } from './InitialPlantProperties';

const rows = 5;
const columns = 9;

const tileClasses = {
    GravestoneProperties: GravestoneProperties,
    ProtectThePlantChallengeProperties: EndangeredPlants,
    PowerTileProperties: PowerTiles,
    InitialGridItemProperties: InitialGridItems,
    InitialPlantProperties: InitialPlants,
};

export class TileManager {
    grid: TileGrid;

    powertilePropagationDelay: number = 1.5;

    constructor(data: PVZObject[]) {
        this.grid = Array.from({ length: columns }, () =>
            Array.from({ length: rows }, () => ({
                objects: [],
            })),
        );

        const levDef = data.find((obj) => obj.objclass == LevelDefinition.objclass);
        let modules: string[] = [];
        if (levDef) {
            const additionalModules = (levDef.objdata as LevelDefinitionObject).Modules;
            modules.push(...additionalModules);
        }

        const tileObjects = [];
        for (const module of modules) {
            const { name } = fromRTID(module);
            const obj = data.find((o) => o.aliases?.includes(name));
            if (obj != undefined) tileObjects.push(obj);
        }

        // load the tile object data into the grid
        for (let challenge of tileObjects) {
            const challengeKey = challenge.objclass as keyof typeof tileClasses;
            if (!tileClasses[challengeKey]) continue;

            const challengeClass = new tileClasses[challengeKey](challenge);
            challengeClass.assign(this);
        }
    }

    build(): [string[], PVZObject[]] {
        const modules: string[] = [];
        const objects: PVZObject[] = [];

        let powertiles: { col: number; row: number; type: string; delay: number }[] = [];
        let gravestones: { col: number; row: number; type?: string }[] = [];
        let plants: { col: number; row: number; type: string; condition?: string }[] = [];
        let protectedPlants: { col: number; row: number; type: string }[] = [];
        let gridItems: { col: number; row: number; type: string }[] = [];

        this.grid.forEach((column, columnIndex) => {
            column.forEach((tile, rowIndex) => {
                for (const object of tile.objects) {
                    if (object.type == TileType.Grave) {
                        gravestones.push({
                            col: columnIndex,
                            row: rowIndex,
                            type: object.param1 == 'default' || object.param1 == undefined ? undefined : object.param1,
                        });
                    }

                    if (object.type == TileType.Plant && object.param1) {
                        if (object.param2 == 'endangered') {
                            protectedPlants.push({
                                col: columnIndex,
                                row: rowIndex,
                                type: object.param1,
                            });
                        } else {
                            plants.push({
                                col: columnIndex,
                                row: rowIndex,
                                type: object.param1,
                                condition: object.param2,
                            });
                        }
                    }

                    if (object.type == TileType.FloorTile && object.param1) {
                        if (InitialGridItems.floorTiles.includes(object.param1)) {
                            gridItems.push({ col: columnIndex, row: rowIndex, type: object.param1 });
                        }

                        if (object.param1?.startsWith('powertile')) {
                            powertiles.push({
                                col: columnIndex,
                                row: rowIndex,
                                type: object.param1.split('_').at(1) || 'epsilon',
                                delay: this.powertilePropagationDelay,
                            });
                        }
                    }

                    if (object.type == TileType.GridItem && object.param1) {
                        gridItems.push({ col: columnIndex, row: rowIndex, type: object.param1 });
                    }
                }
            });
        });

        const modulesToBuild = [
            GravestoneProperties.from(gravestones),
            EndangeredPlants.from(protectedPlants),
            InitialPlants.from(plants),
            PowerTiles.from(powertiles),
            InitialGridItems.from(gridItems),
        ];

        for (const mod of modulesToBuild) {
            if (mod.shouldBuild()) {
                modules.push(toRTID(mod.aliases[0], RTIDTypes.current));
                objects.push(mod.buildObject());
            }
        }

        return [modules, objects];
    }

    setTile(position: { row: number; col: number }, data: TileObject) {
        let { objects } = this.grid[position.col][position.row];
        let matchIndex = objects.findIndex((obj) => obj.type == data.type);

        if (matchIndex == -1) {
            this.grid[position.col][position.row].objects.push(data);
        } else {
            this.grid[position.col][position.row].objects[matchIndex] = data;
        }
    }

    removeTile(position: { row: number; col: number }, data: TileObject) {
        const { row, col } = position;
        this.grid[col][row].objects = this.grid[col][row].objects.filter((tile) => tile.type != data.type);
    }

    getAllAt(position: { row: number; col: number }): TileObject[] {
        return this.grid[position.col][position.row].objects;
    }

    mergeWith(tileManager: TileManager) {
        tileManager.grid.forEach((column, columnIndex) => {
            column.forEach((tile, rowIndex) => {
                this.grid[columnIndex][rowIndex].objects.push(...tile.objects);
            });
        });
    }
}
