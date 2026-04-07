import type { InitialPlantProperties, PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import { TileType } from './types';
import { TileManager } from './tilemanager';

export class InitialPlants extends PVZBase {
    static objclass: string = 'InitialPlantProperties';
    aliases: string[] = ['InitialPlants'];
    objdata: InitialPlantProperties;

    constructor(data: PVZObject) {
        super();
        this.objdata = data.objdata as InitialPlantProperties;
    }

    assign(tileManager: TileManager) {
        for (const plant of this.objdata.InitialPlantPlacements) {
            tileManager.grid[plant.GridX][plant.GridY].objects.push({
                type: TileType.Plant,
                param1: plant.TypeName,
                param2: plant.Condition,
            });
        }
    }

    static from(plants: { col: number; row: number; type: string; condition?: string }[]) {
        let data: InitialPlantProperties = {
            InitialPlantPlacements: plants.map((x) => {
                return {
                    GridX: x.col,
                    GridY: x.row,
                    TypeName: x.type,
                    Condition: x.condition,
                };
            }),
        };

        return new this({
            objclass: '',
            objdata: data,
        });
    }

    shouldBuild(): boolean {
        return this.objdata.InitialPlantPlacements.length > 0;
    }
}
