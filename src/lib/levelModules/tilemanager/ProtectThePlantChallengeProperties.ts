import type { PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import type { TileManager } from './tilemanager';
import { TileType } from './types';

export interface ProtectThePlantChallengeProperties {
    MustProtectCount: number;
    Plants: { GridX: number; GridY: number; PlantType: string }[];
}

export class EndangeredPlants extends PVZBase {
    static objclass: string = 'ProtectThePlantChallengeProperties';
    aliases: string[] = ['EndangeredPlants'];
    objdata: ProtectThePlantChallengeProperties;

    constructor(data: PVZObject) {
        super();
        this.objdata = data.objdata as ProtectThePlantChallengeProperties;
    }

    assign(tileManager: TileManager) {
        for (const plant of this.objdata.Plants) {
            tileManager.grid[plant.GridX][plant.GridY].objects.push({
                type: TileType.Plant,
                param1: plant.PlantType,
                param2: 'endangered',
            });
        }
    }

    static from(endangeredPlants: { row: number; col: number; type: string }[]) {
        return new this({
            objclass: '',
            objdata: {
                MustProtectCount: endangeredPlants.length,
                Plants: endangeredPlants.map((plant) => {
                    return {
                        GridX: plant.col,
                        GridY: plant.row,
                        PlantType: plant.type,
                    };
                }),
            },
        });
    }

    shouldBuild(): boolean {
        return this.objdata.Plants.length > 0;
    }
}
