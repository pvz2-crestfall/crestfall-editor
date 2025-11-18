import type { PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import type { ChallengeManager } from './challengemanager';

export interface ProtectThePlantChallengeProperties {
    MustProtectCount: number;
    Plants: { GridX: number; GridY: number; PlantType: string }[];
}

export class EndangeredPlants extends PVZBase {
    aliases: string[] = ['EndangeredPlants'];
    objclass: string = 'ProtectThePlantChallengeProperties';
    objdata: ProtectThePlantChallengeProperties;

    constructor(data: PVZObject) {
        super();
        this.objdata = data.objdata as ProtectThePlantChallengeProperties;
    }

    assign(challengeManager: ChallengeManager) {
        for (const plant of this.objdata.Plants) {
            challengeManager.endangeredPlants.push({
                row: plant.GridY,
                column: plant.GridX,
                name: plant.PlantType,
            });
        }
    }

    static from(endangeredPlants: { row: number; column: number; name: string }[]) {
        return new this({
            objclass: '',
            objdata: {
                MustProtectCount: endangeredPlants.length,
                Plants: endangeredPlants.map((plant) => {
                    return {
                        GridX: plant.column,
                        GridY: plant.row,
                        PlantType: plant.name,
                    };
                }),
            },
        });
    }
}
