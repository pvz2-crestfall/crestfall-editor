import type { PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import type { ChallengeManager } from './challengemanager';

export interface StarChallengeSunProducedProps {
    TargetSun: number;
}

export class SunProduced extends PVZBase {
    static aliases: string[] = ['SunProduced'];
    static objclass: string = 'StarChallengeSunProducedProps';
    objdata: StarChallengeSunProducedProps;

    constructor(data: PVZObject) {
        super();
        this.objdata = data.objdata as StarChallengeSunProducedProps;
    }

    assign(challengeManager: ChallengeManager) {
        challengeManager.sunProduced = this.objdata.TargetSun;
    }

    static from(TargetSun: number) {
        return new this({
            objclass: '',
            objdata: { TargetSun },
        });
    }
}
