import type { InitialGridItemProperties, PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import { TileType } from './types';
import type { TileManager } from './tilemanager';

export class InitialGridItems extends PVZBase {
    static floorTiles = [
        'goldtile',

        'slider_up',
        'slider_down',
        'slider_up_modern',
        'slider_down_modern',

        'flame_spreader_trap',
        'boulder_trap_falling_forward',
        'zomboss_boulder_trap_falling_forward',

        'score_2x_tile',
        'score_3x_tile',
        'score_5x_tile',

        'boosttile3',
        'boosttile5',
        'boosttile10',
        'boosttile1000',
    ];

    static objclass: string = 'InitialGridItemProperties';
    aliases: string[] = ['InitialGridItems'];
    objdata: InitialGridItemProperties;

    constructor(data: PVZObject) {
        super();
        this.objdata = data.objdata as InitialGridItemProperties;
    }

    assign(tileManager: TileManager) {
        this.objdata.InitialGridItemPlacements.forEach((tile) => {
            const col = tile.GridX;
            const row = tile.GridY;
            console.log(tile);

            if (InitialGridItems.floorTiles.includes(tile.TypeName)) {
                tileManager.grid[col][row].objects.push({
                    type: TileType.FloorTile,
                    param1: tile.TypeName,
                });
            } else {
                tileManager.grid[col][row].objects.push({
                    type: TileType.GridItem,
                    param1: tile.TypeName,
                });
            }
        });
    }

    static from(tiles: { col: number; row: number; type: string }[]) {
        let data: InitialGridItemProperties = {
            InitialGridItemPlacements: tiles.map((x) => {
                return {
                    GridX: x.col,
                    GridY: x.row,
                    TypeName: x.type,
                };
            }),
        };

        return new this({
            objclass: '',
            objdata: data,
        });
    }

    shouldBuild(): boolean {
        return this.objdata.InitialGridItemPlacements.length > 0;
    }
}
