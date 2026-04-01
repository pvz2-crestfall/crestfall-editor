import type { GravestonePropertiesObject, PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import { TileType } from './types';
import type { TileManager } from './tilemanager';

export class GravestoneProperties extends PVZBase {
    static objclass: string = 'GravestoneProperties';
    aliases: string[] = ['Gravestones'];
    objdata: GravestonePropertiesObject;

    constructor(data: PVZObject) {
        super();
        this.objdata = data.objdata as GravestonePropertiesObject;
    }

    push(column: number, row: number, type?: string) {
        if (!this.objdata.ForceSpawnData) this.objdata.ForceSpawnData = [];

        this.objdata.ForceSpawnData.push({
            GridX: column,
            GridY: row,
            TypeName: type || undefined,
        });
    }

    get length(): number {
        return this.objdata.ForceSpawnData?.length || this.objdata.GravestoneCount || 0;
    }

    assign(tileManager: TileManager) {
        this.objdata.ForceSpawnData?.forEach((tile) => {
            const row = tile.GridY;
            const col = tile.GridX;

            tileManager.grid[col][row].objects.push({
                type: TileType.Grave,
                param1: tile.TypeName,
            });
        });
    }

    static from(graves: { col: number; row: number; type?: string }[]) {
        return new this({
            objclass: '',
            objdata: {
                ForceSpawnData: graves.map((x) => {
                    return {
                        GridX: x.col,
                        GridY: x.row,
                        TypeName: x.type,
                    };
                }),
            },
        });
    }

    shouldBuild(): boolean {
        return this.length > 0;
    }
}
