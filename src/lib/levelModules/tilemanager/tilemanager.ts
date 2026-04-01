import type { GravestonePropertiesObject, PVZObject } from '@/types/PVZTypes';
import { RTIDTypes, toRTID } from '@/lib/utils';
import { GravestoneProperties } from './gravestones';
import { type TileGrid, TileType, type TileObject } from './types';

const rows = 5;
const columns = 9;

export class TileManager {
    grid: TileGrid;

    constructor(data: PVZObject[]) {
        this.grid = Array.from({ length: columns }, () =>
            Array.from({ length: rows }, () => ({
                objects: [],
            })),
        );

        data.forEach((obj) => {
            if (obj.objclass === 'GravestoneProperties') {
                const graveData = obj.objdata as GravestonePropertiesObject;

                graveData.ForceSpawnData?.forEach((tile) => {
                    const row = tile.GridY;
                    const col = tile.GridX;

                    this.grid[col][row].objects.push({
                        type: TileType.Grave,
                        param1: tile.TypeName,
                    });
                });
            }
        });
    }

    build(): [string[], PVZObject[]] {
        const modules: string[] = [];
        const objects: PVZObject[] = [];

        const gravestones = new GravestoneProperties({});

        const modulesToBuild = [gravestones];

        this.grid.forEach((column, columnIndex) => {
            column.forEach((tile, rowIndex) => {
                // read the gravestone data
                for (const object of tile.objects) {
                    if (object.type == TileType.Grave) {
                        gravestones.push(
                            columnIndex,
                            rowIndex,
                            object.param1 == 'default' || object.param1 == undefined ? undefined : object.param1,
                        );
                    }
                }
            });
        });

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
