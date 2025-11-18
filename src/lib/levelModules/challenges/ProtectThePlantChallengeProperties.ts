import type { PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import type { ChallengeManager } from './challengemanager';

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

    assign(challengeManager: ChallengeManager) {
        for (const plant of this.objdata.Plants) {
            challengeManager.endangeredPlants.push({
                row: plant.GridY,
                col: plant.GridX,
                name: plant.PlantType,
            });
        }
    }

    static from(endangeredPlants: { row: number; col: number; name: string }[]) {
        return new this({
            objclass: '',
            objdata: {
                MustProtectCount: endangeredPlants.length,
                Plants: endangeredPlants.map((plant) => {
                    return {
                        GridX: plant.col,
                        GridY: plant.row,
                        PlantType: plant.name,
                    };
                }),
            },
        });
    }
}
