import type { PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import type { ChallengeManager } from './challengemanager';

export interface StarChallengeSimultaneousPlantsProps {
    MaximumPlants: number;
}

export class SimultaneousPlants extends PVZBase {
    static aliases: string[] = ['MaxPlants'];
    static objclass: string = 'StarChallengeSimultaneousPlantsProps';
    objdata: StarChallengeSimultaneousPlantsProps;

    constructor(data: PVZObject) {
        super();
        this.objdata = data.objdata as StarChallengeSimultaneousPlantsProps;
    }

    assign(challengeManager: ChallengeManager) {
        challengeManager.maxPlants = this.objdata.MaximumPlants;
    }

    static from(MaximumPlants: number) {
        return new this({
            objclass: '',
            objdata: { MaximumPlants },
        });
    }
}
