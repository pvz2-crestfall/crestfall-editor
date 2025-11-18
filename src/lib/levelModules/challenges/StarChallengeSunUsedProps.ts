import type { PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import type { ChallengeManager } from './challengemanager';

export interface StarChallengeSunUsedProps {
    MaximumSun: number;
}

export class MaxSunUsed extends PVZBase {
    static aliases: string[] = ['MaxSunSpent'];
    static objclass: string = 'StarChallengeSunUsedProps';
    objdata: StarChallengeSunUsedProps;

    constructor(data: PVZObject) {
        super();
        this.objdata = data.objdata as StarChallengeSunUsedProps;
    }

    assign(challengeManager: ChallengeManager) {
        challengeManager.maxSunUsed = this.objdata.MaximumSun;
    }

    static from(MaximumSun: number) {
        return new this({
            objclass: '',
            objdata: { MaximumSun },
        });
    }
}
