import type { PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import type { ChallengeManager } from './challengemanager';

export interface StarChallengeSpendSunHoldoutProps {
    HoldoutSeconds: number;
}

export class SunHoldout extends PVZBase {
    static aliases: string[] = ['TimeWithoutSpending'];
    static objclass: string = 'StarChallengeSpendSunHoldoutProps';
    objdata: StarChallengeSpendSunHoldoutProps;

    constructor(data: PVZObject) {
        super();
        this.objdata = data.objdata as StarChallengeSpendSunHoldoutProps;
    }

    assign(challengeManager: ChallengeManager) {
        challengeManager.timeWithoutSpending = this.objdata.HoldoutSeconds;
    }

    static from(HoldoutSeconds: number) {
        return new this({
            objclass: '',
            objdata: { HoldoutSeconds },
        });
    }
}
