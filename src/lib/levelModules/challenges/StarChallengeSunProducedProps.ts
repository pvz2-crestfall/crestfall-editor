import type { PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import type { ChallengeManager } from './challengemanager';

export interface StarChallengeSunProducedProps {
    TargetSun: number;
}

export class SunProduced extends PVZBase {
    static objclass: string = 'StarChallengeSunProducedProps';
    aliases: string[] = ['SunProduced'];
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
