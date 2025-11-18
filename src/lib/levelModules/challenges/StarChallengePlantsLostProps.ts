import type { PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import type { ChallengeManager } from './challengemanager';

export interface StarChallengePlantsLostProps {
    MaximumPlantsLost: number;
}

export class PlantsLost extends PVZBase {
    static objclass: string = 'StarChallengePlantsLostProps';
    aliases: string[] = ['PlantsLost'];
    objdata: StarChallengePlantsLostProps;

    constructor(data: PVZObject) {
        super();
        this.objdata = data.objdata as StarChallengePlantsLostProps;
    }

    assign(challengeManager: ChallengeManager) {
        challengeManager.plantsLost = this.objdata.MaximumPlantsLost;
    }

    static from(MaximumPlantsLost: number) {
        return new this({
            objclass: '',
            objdata: { MaximumPlantsLost },
        });
    }
}
