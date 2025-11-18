import type { PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import type { ChallengeManager } from './challengemanager';

export interface StarChallengeSimultaneousPlantsProps {
    MaximumPlants: number;
}

export class SimultaneousPlants extends PVZBase {
    static objclass: string = 'StarChallengeSimultaneousPlantsProps';
    aliases: string[] = ['MaxPlants'];
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
