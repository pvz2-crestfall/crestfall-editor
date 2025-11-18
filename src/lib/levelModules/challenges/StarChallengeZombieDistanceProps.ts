import type { PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import type { ChallengeManager } from './challengemanager';

export interface StarChallengeZombieDistanceProps {
    TargetDistance: number;
}

export class ZombieDistance extends PVZBase {
    static aliases: string[] = ['FlowerLineDistance'];
    static objclass: string = 'StarChallengeZombieDistanceProps';
    objdata: StarChallengeZombieDistanceProps;

    constructor(data: PVZObject) {
        super();
        this.objdata = data.objdata as StarChallengeZombieDistanceProps;
    }

    assign(challengeManager: ChallengeManager) {
        challengeManager.zombieDistance = this.objdata.TargetDistance;
    }

    static from(TargetDistance: number) {
        return new this({
            objclass: '',
            objdata: { TargetDistance },
        });
    }
}
