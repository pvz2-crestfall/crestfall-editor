import type { PowerTileProperties, PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import { TileType } from './types';
import { TileManager } from './tilemanager';

export class PowerTiles extends PVZBase {
    static objclass: string = 'PowerTileProperties';
    aliases: string[] = ['Powertiles'];
    objdata: PowerTileProperties;

    constructor(data: PVZObject) {
        super();
        this.objdata = data.objdata as PowerTileProperties;
    }

    assign(tileManager: TileManager) {
        this.objdata.LinkedTiles?.forEach((tile) => {
            const col = tile.Location.mX;
            const row = tile.Location.mY;

            tileManager.grid[col][row].objects.push({
                type: TileType.FloorTile,
                param1: 'powertile_' + tile.Group,
            });
        });
    }

    static from(tiles: { col: number; row: number; type: string; delay: number }[]) {
        let data: PowerTileProperties = {
            LinkedTiles: tiles.map((x) => {
                return {
                    Group: x.type,
                    Location: { mX: x.col, mY: x.row },
                    PropagationDelay: x.delay,
                };
            }),
        };

        return new this({
            objclass: '',
            objdata: data,
        });
    }

    shouldBuild(): boolean {
        return this.objdata.LinkedTiles.length > 0;
    }
}
